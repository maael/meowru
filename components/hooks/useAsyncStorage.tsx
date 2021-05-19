import React, { createContext, SetStateAction, useEffect, useState, Dispatch } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export enum Keys {
  'Store' = 'store',
}

export interface StoreItem {id: string, causes: string, createdAt: string, groupings: string[], notes: string, rating: number, symptom: string};
export type Store = StoreItem[];

export const StoreContext = createContext<undefined | {store: Store, setStore: Dispatch<SetStateAction<Store>>}>(undefined);

export const StoreProvider: React.FC = ({children}) => {
  const [store, setStore] = useAsyncStorage<Store>(Keys.Store, []);
  return (
    <StoreContext.Provider value={{store, setStore}}>
      {children}
    </StoreContext.Provider>
  )
}

export default function useAsyncStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState(initialValue);

  useEffect(() => {
    (async () => {
      const item = await AsyncStorage.getItem(key);
      if (item !== null) {
        setStoredValue(JSON.parse(item));
      }
    })();
  }, []);

  const setValue = (value: SetStateAction<T>) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      void AsyncStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue] as const;
}
