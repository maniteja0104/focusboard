import { useEffect, useState } from 'react';
// Restores saved array data if valid; otherwise falls back to `initial`.
export default function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw !== null) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch { /* invalid JSON or storage blocked: use initial */ }
    return initial;
  });
  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* ignore quota errors */ }
  }, [key, value]);
  return [value, setValue];
}
