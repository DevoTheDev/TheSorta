"use client";
import React, { createContext, useContext, ReactNode } from 'react';

export type Methods = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface HandleProps {
    url: string;
    body?: BodyInit | { [key: string]: any }
    headers?: HeadersInit;
    method?: Methods;
}

interface APIContextProps {
    baseUrl: string;
    handleGet: (props: Partial<HandleProps>) => Promise<any>;
    handlePost: (props: Partial<HandleProps>) => Promise<any>;
    handlePut: (props: Partial<HandleProps>) => Promise<any>;
    handleDelete: (props: Partial<HandleProps>) => Promise<any>;
}

const APIContext = createContext<APIContextProps | undefined>(undefined);

const APIProvider = ({ children }: { children: ReactNode }) => {
    
    const baseUrl = 'http://127.0.0.1:4000';

    const _callAPI = async (props: HandleProps) => {
        const { method, body, url, headers } = props;

        const options: RequestInit = {
            method,
            headers: headers ? headers : { 'Content-Type': 'application/json' },
            body: body ? JSON.stringify(body) : null,
        };

        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const res = await response.json();
        console.log(
        `${method} request response to\n${response.url}\n\nResponse :`, res);
        return res;
    };

    const handleGet = (props: Partial<HandleProps>) => _callAPI({ url: props.url || '', headers: props.headers, method: 'GET' });
    const handlePost = (props: Partial<HandleProps>) => _callAPI({ url: props.url || '', headers: props.headers, body: props.body, method: 'POST' });
    const handlePut = (props: Partial<HandleProps>) => _callAPI({ url: props.url || '', headers: props.headers, body: props.body, method: 'PUT' });
    const handleDelete = (props: Partial<HandleProps>) => _callAPI({ url: props.url || '', headers: props.headers, method: 'DELETE' });

    return (
        <APIContext.Provider value={{ baseUrl, handleGet, handlePost, handlePut, handleDelete }}>
            {children}
        </APIContext.Provider>
    );
};

const useAPI = () => {
    const context = useContext(APIContext);
    if (!context) {
        throw new Error('useAPI must be used within an APIProvider');
    }
    return context;
};

export { APIProvider, useAPI };
