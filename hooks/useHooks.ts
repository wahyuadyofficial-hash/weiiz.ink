import { useState, useEffect, useCallback, useRef } from "react";

// ═══════════════════════════════════════════════════════════
// useAnalytics — fetch data analitik dashboard
// ═══════════════════════════════════════════════════════════
export type AnalyticsRange = "7d" | "30d" | "90d";

export interface AnalyticsSummary {
  totalViews: number;
  totalRevenue: number;
  totalSales: number;
  viewsChange: number;
  revenueChange: number;
  salesChange: number;
  daily: { date: string; views: number; revenue: number; sales: number }[];
  topProducts: { id: string; name: string; sales: number; revenue: number }[];
}

export function useAnalytics(range: AnalyticsRange = "30d") {
  const [data, setData] = useState<AnalyticsSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch_ = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/analytics?range=${range}`);
      if (!res.ok) throw new Error("Gagal memuat analitik");
      const json = await res.json();
      setData(json);
    } catch (e: unknown) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }, [range]);

  useEffect(() => { fetch_(); }, [fetch_]);

  return { data, loading, error, refetch: fetch_ };
}

// ═══════════════════════════════════════════════════════════
// useDebounce — delay value changes (search, input, dll)
// ═══════════════════════════════════════════════════════════
export function useDebounce<T>(value: T, delay = 400): T {
  const [debounced, setDebounced] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}

// ═══════════════════════════════════════════════════════════
// useLocalStorage — persistent state di localStorage
// ═══════════════════════════════════════════════════════════
export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((prev: T) => T)) => void] {
  const [stored, setStored] = useState<T>(() => {
    if (typeof window === "undefined") return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = useCallback((value: T | ((prev: T) => T)) => {
    try {
      const toStore = value instanceof Function ? value(stored) : value;
      setStored(toStore);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(toStore));
      }
    } catch {
      console.warn(`useLocalStorage: gagal menyimpan key "${key}"`);
    }
  }, [key, stored]);

  return [stored, setValue];
}

// ═══════════════════════════════════════════════════════════
// useToast — global toast notification manager
// ═══════════════════════════════════════════════════════════
export interface ToastItem {
  id: string;
  message: string;
  type: "success" | "error" | "info" | "warning";
  duration?: number;
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const show = useCallback((message: string, type: ToastItem["type"] = "info", duration = 3500) => {
    const id = crypto.randomUUID();
    setToasts((prev) => [...prev, { id, message, type, duration }]);
    setTimeout(() => remove(id), duration);
    return id;
  }, []);

  const remove = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const success = useCallback((msg: string) => show(msg, "success"), [show]);
  const error = useCallback((msg: string) => show(msg, "error"), [show]);
  const info = useCallback((msg: string) => show(msg, "info"), [show]);
  const warning = useCallback((msg: string) => show(msg, "warning"), [show]);

  return { toasts, show, remove, success, error, info, warning };
}

// ═══════════════════════════════════════════════════════════
// useClipboard — copy to clipboard dengan status feedback
// ═══════════════════════════════════════════════════════════
export function useClipboard(timeout = 2000) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async (text: string): Promise<boolean> => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), timeout);
      return true;
    } catch {
      return false;
    }
  }, [timeout]);

  return { copied, copy };
}

// ═══════════════════════════════════════════════════════════
// useMediaQuery — responsive breakpoint helper
// ═══════════════════════════════════════════════════════════
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia(query);
    setMatches(mq.matches);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [query]);

  return matches;
}

// Convenience: tailwind breakpoints
export const useIsMobile = () => !useMediaQuery("(min-width: 768px)");
export const useIsTablet = () => useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
export const useIsDesktop = () => useMediaQuery("(min-width: 1024px)");

// ═══════════════════════════════════════════════════════════
// useOutsideClick — deteksi klik di luar element
// ═══════════════════════════════════════════════════════════
export function useOutsideClick<T extends HTMLElement = HTMLElement>(
  callback: () => void
): React.RefObject<T> {
  const ref = useRef<T>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        callback();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [callback]);

  return ref;
}

// ═══════════════════════════════════════════════════════════
// useFileUpload — upload file ke API dengan progress
// ═══════════════════════════════════════════════════════════
export interface UploadResult {
  url: string;
  fileName: string;
  fileSize: number;
}

export function useFileUpload(endpoint: string) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const upload = useCallback(async (file: File, fieldName = "file"): Promise<UploadResult | null> => {
    setUploading(true);
    setProgress(0);
    setError(null);

    const fd = new FormData();
    fd.append(fieldName, file);

    return new Promise((resolve) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", endpoint);

      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          setProgress(Math.round((e.loaded / e.total) * 100));
        }
      };

      xhr.onload = () => {
        setUploading(false);
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const data = JSON.parse(xhr.responseText);
            resolve(data);
          } catch {
            setError("Response tidak valid");
            resolve(null);
          }
        } else {
          setError("Upload gagal. Coba lagi.");
          resolve(null);
        }
      };

      xhr.onerror = () => {
        setUploading(false);
        setError("Koneksi gagal saat upload.");
        resolve(null);
      };

      xhr.send(fd);
    });
  }, [endpoint]);

  return { upload, uploading, progress, error };
}

// ═══════════════════════════════════════════════════════════
// useIntersectionObserver — lazy load / infinite scroll
// ═══════════════════════════════════════════════════════════
export function useIntersectionObserver(
  options?: IntersectionObserverInit
): [React.RefObject<HTMLDivElement>, boolean] {
  const ref = useRef<HTMLDivElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    observer.observe(el);
    return () => observer.disconnect();
  }, [options]);

  return [ref, isIntersecting];
}

// ═══════════════════════════════════════════════════════════
// useProfile — fetch & update profil user saat ini
// ═══════════════════════════════════════════════════════════
export interface ProfileData {
  username: string;
  name?: string;
  email: string;
  bio?: string;
  avatarUrl?: string;
  instagram?: string;
  twitter?: string;
  youtube?: string;
  website?: string;
  balance: number;
  bankName?: string;
  bankAccount?: string;
  bankHolder?: string;
}

export function useProfile() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/profile");
      if (!res.ok) throw new Error();
      const data = await res.json();
      setProfile(data.user || data);
    } catch {
      setError("Gagal memuat profil");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchProfile(); }, [fetchProfile]);

  const updateProfile = useCallback(async (updates: Partial<ProfileData>, avatarFile?: File): Promise<boolean> => {
    setSaving(true);
    try {
      const fd = new FormData();
      Object.entries(updates).forEach(([k, v]) => {
        if (v !== undefined) fd.append(k, String(v));
      });
      if (avatarFile) fd.append("avatar", avatarFile);

      const res = await fetch("/api/profile", { method: "PUT", body: fd });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setProfile((p) => ({ ...p!, ...(data.user || data) }));
      return true;
    } catch {
      setError("Gagal menyimpan profil");
      return false;
    } finally {
      setSaving(false);
    }
  }, []);

  return { profile, loading, saving, error, updateProfile, refetch: fetchProfile };
}
