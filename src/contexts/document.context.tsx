"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { Document, PaginationResponse } from "@/types/document";
import { documentService } from "@/services/document.service";

interface DocumentContextType {
  recentIncoming: Document[];
  recentOutgoing: Document[];
  loading: boolean;
  error: string | null;
  fetchRecentDocuments: () => Promise<void>;
  documents: Document[];
  pagination: PaginationResponse | null;
  fetchDocuments: (
    page?: number,
    size?: number,
    type?: string
  ) => Promise<void>;
}

const DocumentContext = createContext<DocumentContextType | undefined>(
  undefined
);

export function DocumentProvider({ children }: { children: React.ReactNode }) {
  const [recentIncoming, setRecentIncoming] = useState<Document[]>([]);
  const [recentOutgoing, setRecentOutgoing] = useState<Document[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [pagination, setPagination] =
    useState<PaginationResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
          console.log("Content:", response.data.content);
          setPagination(response.data);
          console.log("Pagination:", response.data);
        } else if (type === "OUTGOING") {
          const response = await documentService.getOutgoingDocuments(
            page,
            size
          );
          setDocuments(response.data.content);
          console.log("Content:", response.data.content);
          setPagination(response.data);
          console.log("Pagination:", response.data);
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

  return (
    <DocumentContext.Provider
      value={{
        recentIncoming,
        recentOutgoing,
        loading,
        error,
        fetchRecentDocuments,
        documents,
        pagination,
        fetchDocuments,
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
