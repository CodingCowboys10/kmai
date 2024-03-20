"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { IModel } from "@/lib/config/interfaces";

interface ModelContextProps {
  model: IModel;
  setModel: Dispatch<SetStateAction<IModel>>;
}

export const ModelContext = createContext<ModelContextProps>({
  setModel: () => {},
  model: "OpenAi",
});

interface ModelProviderProps {
  children: ReactNode;
}

export function ModelProvider({ children }: ModelProviderProps) {
  const [model, setModel] = useState<IModel>("OpenAi");

  return (
    <ModelContext.Provider value={{ model, setModel }}>
      {children}
    </ModelContext.Provider>
  );
}

export function useModel(): ModelContextProps {
  return useContext(ModelContext);
}
