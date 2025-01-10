"use client";

import { createContext, useContext, useState } from "react";
import { userService } from "@/services/user.service";
import { UserProfile, UserProfileResponse } from "@/types/user";

interface UserContextType {
    profile: UserProfile | null;
    updateProfile: (id: string, data: FormData) => Promise<UserProfileResponse>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [profile, setProfile] = useState<UserProfile | null>(null);

    const updateProfile = async (id: string, data: FormData) => {
        const response = await userService.updateProfile(id, data);
        setProfile(response.data);
        return response;
    };

    return (
        <UserContext.Provider value={{ profile, updateProfile }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};
