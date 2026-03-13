import { useState, useEffect, useCallback } from "react";

// ─── Types ────────────────────────────────────────────────
export interface Link {
  id: string;
  title: string;
  url: string;
  icon?: string;
  type: "link" | "social" | "product" | "custom";
  isActive: boolean;
  order: number;
  clickCount: number;
}

export type CreateLinkInput = Omit<Link, "id" | "clickCount" | "order">;
export type UpdateLinkInput = Partial<CreateLinkInput>;

// ─── Hook ─────────────────────────────────────────────────
export function useLinks() {
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLinks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/links");
      if (!res.ok) throw new Error("Gagal memuat links");
      const data = await res.json();
      setLinks(data.links || []);
    } catch (e: unknown) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchLinks(); }, [fetchLinks]);

  const createLink = useCallback(async (input: CreateLinkInput): Promise<Link | null> => {
    try {
      const res = await fetch("/api/links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      const newLink: Link = data.link;
      setLinks((prev) => [...prev, newLink]);
      return newLink;
    } catch {
      setError("Gagal membuat link");
      return null;
    }
  }, []);

  const updateLink = useCallback(async (id: string, input: UpdateLinkInput): Promise<boolean> => {
    try {
      const res = await fetch(`/api/links/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setLinks((prev) => prev.map((l) => (l.id === id ? { ...l, ...data.link } : l)));
      return true;
    } catch {
      setError("Gagal memperbarui link");
      return false;
    }
  }, []);

  const deleteLink = useCallback(async (id: string): Promise<boolean> => {
    try {
      const res = await fetch(`/api/links/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setLinks((prev) => prev.filter((l) => l.id !== id));
      return true;
    } catch {
      setError("Gagal menghapus link");
      return false;
    }
  }, []);

  // Optimistic reorder — kirim ke server setelah drag-drop
  const reorderLinks = useCallback(async (reordered: Link[]): Promise<void> => {
    setLinks(reordered); // optimistic
    try {
      await fetch("/api/links/reorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order: reordered.map((l, i) => ({ id: l.id, order: i })) }),
      });
    } catch {
      // Revert on failure
      fetchLinks();
    }
  }, [fetchLinks]);

  const toggleLink = useCallback(async (id: string): Promise<void> => {
    const link = links.find((l) => l.id === id);
    if (!link) return;
    setLinks((prev) => prev.map((l) => (l.id === id ? { ...l, isActive: !l.isActive } : l)));
    try {
      await fetch(`/api/links/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !link.isActive }),
      });
    } catch {
      // Revert
      setLinks((prev) => prev.map((l) => (l.id === id ? { ...l, isActive: link.isActive } : l)));
    }
  }, [links]);

  return {
    links,
    loading,
    error,
    createLink,
    updateLink,
    deleteLink,
    reorderLinks,
    toggleLink,
    refetch: fetchLinks,
  };
}
