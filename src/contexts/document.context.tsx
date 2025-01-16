"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import {
  Document,
  PaginationResponse,
  SearchRequest,
  CreateDocumentRequest,
} from "@/types/document";
import { documentService } from "@/services/document.service";

interface DocumentContextType {
  recentIncoming: Document[];
  recentOutgoing: Document[];
  loading: boolean;
  error: string | null;
  fetchRecentDocuments: () => Promise<void>;
  documents: Document[];
  documentById: Document | null;
  pagination: PaginationResponse | null;
  fetchDocuments: (
    page?: number,
    size?: number,
    type?: string
  ) => Promise<void>;
  fetchDocumentById: (id: string) => Promise<void>;
  searchDocuments: (request: SearchRequest) => Promise<void>;
  searchParams: SearchRequest;
  setSearchParams: React.Dispatch<React.SetStateAction<SearchRequest>>;
  createDocument: (request: CreateDocumentRequest) => Promise<Document>;
}

const DocumentContext = createContext<DocumentContextType | undefined>(
  undefined
);

export function DocumentProvider({ children }: { children: React.ReactNode }) {
  const [recentIncoming, setRecentIncoming] = useState<Document[]>([]);
  const [recentOutgoing, setRecentOutgoing] = useState<Document[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [documentById, setDocumentById] = useState<Document | null>(null);
  const [pagination, setPagination] = useState<PaginationResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useState<SearchRequest>({
    keyword: "",
    startDate: null,
    endDate: null,
    page: 0,
    size: 7,
    sortBy: "createdAt",
    sortDirection: "DESC",
    type: "INCOMING",
  });

  const fetchRecentDocuments = useCallback(async () => {
    try {
      setLoading(true);
      const [incomingRes, outgoingRes] = await Promise.all([
        documentService.getRecentDocuments("INCOMING"),
        documentService.getRecentDocuments("OUTGOING"),
      ]);

      setRecentIncoming(incomingRes || []);
      setRecentOutgoing(outgoingRes || []);
      setError(null);
    } catch (err) {
      console.error("Error fetching documents:", err);
      setError("Failed to fetch documents");
      setRecentIncoming([]);
      setRecentOutgoing([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchDocuments = useCallback(
    async (page: number = 0, size: number = 7, type: string = "INCOMING") => {
      try {
        setLoading(true);
        if (type === "INCOMING") {
          const response = await documentService.getIncomingDocuments(
            page,
            size
          );
          setDocuments(response.data.content);
          setPagination(response.data);
        } else if (type === "OUTGOING") {
          const response = await documentService.getOutgoingDocuments(
            page,
            size
          );
          setDocuments(response.data.content);
          setPagination(response.data);
        }
        setError(null);
      } catch (err) {
        console.error("Error fetching documents:", err);
        setError("Failed to fetch documents");
        setDocuments([]);
        setPagination(null);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchRecentDocuments();
    }
  }, [fetchRecentDocuments]);

  const fetchDocumentById = useCallback(async (id: string) => {
    const response = await documentService.getDocumentById(id);
    setDocumentById(response.data);
  }, []);

  const searchDocuments = useCallback(
    async (request: SearchRequest) => {
      try {
        setLoading(true);
        console.log("Searching with request:", request);
        const response = await documentService.searchDocuments(request);
        console.log("Search response:", response);
        setDocuments(response.content);

        const savedStatusCounts = pagination?.statusCounts;
        setPagination({
          ...response,
          statusCounts: savedStatusCounts || response.statusCounts,
        });
      } catch (error) {
        console.error("Error searching documents:", error);
      } finally {
        setLoading(false);
      }
    },
    [pagination?.statusCounts]
  );

  const createDocument = useCallback(
    async (request: CreateDocumentRequest) => {
      try {
        setLoading(true);
        const response = await documentService.createDocument(request);
        // Refresh documents list after creation
        await fetchDocuments(0, 7, request.type);
        return response;
      } catch (error) {
        console.error("Error creating document:", error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [fetchDocuments]
  );

  return (
    <DocumentContext.Provider
      value={{
        recentIncoming,
        recentOutgoing,
        loading,
        error,
        fetchRecentDocuments,
        documents,
        documentById,
        pagination,
        fetchDocuments,
        fetchDocumentById,
        searchDocuments,
        searchParams,
        setSearchParams,
        createDocument,
      }}
    >
      {children}
    </DocumentContext.Provider>
  );
}

export function useDocuments() {
  const context = useContext(DocumentContext);
  if (context === undefined) {
    throw new Error("useDocuments must be used within a DocumentProvider");
  }
  return context;
}
