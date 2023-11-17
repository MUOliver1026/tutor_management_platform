"use client"
/**
 * Example Usage:
 *   import { useContextValue } from  "@/components/context"
 *   const { getters, setters } = useContextValue();
 * @Guide This is a context hook for accessing global states,
 *        getters is used to retrieve values, setters is used to set values
 */
import React, { createContext, useContext, useState } from "react";
interface ContextValue {
    isDarkTheme: boolean;
    userStatus: boolean;
    userIdentity:string;
    userEmail:string;
    userName:string;
    userID: string;
}

const initialValue: ContextValue = {
    isDarkTheme: false,
    userStatus: false,
    userIdentity:'',
    userEmail:'',
    userName:'',
    userID:""
}

export const context = createContext<{
    getters: ContextValue;
    setters: {
        setUserStatus: React.Dispatch<React.SetStateAction<boolean>>;
        setDarkTheme: React.Dispatch<React.SetStateAction<boolean>>;
        setIdentity: React.Dispatch<React.SetStateAction<string>>;
        setEmail: React.Dispatch<React.SetStateAction<string>>;
        setName: React.Dispatch<React.SetStateAction<string>>;
        setUserID: React.Dispatch<React.SetStateAction<string>>;
    };
}>({
    getters: initialValue,
    setters: {
        setUserStatus: () => {},
        setDarkTheme: () => {},
        setIdentity: () => {},
        setEmail: () => {},
        setName: () => {},
        setUserID: () => {}
    },
});

const ContextProvider = ({ children }: { children: React.ReactNode; }) => {
    const [userStatus, setUserStatus] = useState(initialValue.userStatus)
    const [isDarkTheme, setDarkTheme] = useState(initialValue.isDarkTheme)
    const [userIdentity, setIdentity] = useState(initialValue.userIdentity)
    const [userEmail, setEmail] = useState(initialValue.userEmail)
    const [userName, setName] = useState(initialValue.userName)
    const [userID, setUserID] = useState(initialValue.userID)
    const getters = {
        userStatus,
        isDarkTheme,
        userIdentity,
        userEmail,
        userName,
        userID
    };
    const setters = {
        setUserStatus,
        setDarkTheme,
        setIdentity,
        setEmail,
        setName,
        setUserID
    };
    return (
        <context.Provider value={{ getters, setters }}>
            {children}
        </context.Provider>
    )
}

export const useContextValue = () => {
    return useContext(context);
};

export default ContextProvider