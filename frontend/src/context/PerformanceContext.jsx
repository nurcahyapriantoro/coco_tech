import { createContext, useContext } from 'react';

export const PerformanceContext = createContext('high');

export function usePerformance() {
  return useContext(PerformanceContext);
}
