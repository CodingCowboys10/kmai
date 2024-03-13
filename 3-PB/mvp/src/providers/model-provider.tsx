"use client"

import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction, useEffect } from 'react';

interface ModelContextProps {
  model?: string;
  setModel?: Dispatch<SetStateAction<string>>;
}

export const ModelContext = createContext<ModelContextProps>({});

interface ModelProviderProps {
  children: ReactNode;
}

export function ModelProvider({ children }: ModelProviderProps) {
  const isServer = typeof window === 'undefined'; // Verifica se il codice viene eseguito sul server
  const [model, setModel] = useState<string>(() => {
    try {
      if (!isServer) {
        const storedModel = localStorage.getItem('model');
        return storedModel || 'Ollama';
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error);
    }
    return 'Ollama'; // fallback value
  });

  useEffect(() => {
    try {
      if (!isServer) {
        localStorage.setItem('model', model);
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error);
    }
  }, [model, isServer]);

  return (
    <ModelContext.Provider value={{ model, setModel }}>
      {children}
    </ModelContext.Provider>
  );
}

export function useModel(): ModelContextProps {
  const context = useContext(ModelContext);

  if (!context) {
    throw new Error("useModel must be used within a ModelProvider");
  }

  return context;
}
