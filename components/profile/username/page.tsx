import { notFound } from "next/navigation";
import { Metadata } from "next";
import prisma from "@/lib/prisma";
import PublicProfileClient from "./PublicProfileClient";

// ─── Types ───────────────────────────────────────────────
interface PageProps {
  params: { username: string };
}

// ─── Metadata (SEO) ──────────────────────────────────────
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const user = await getUser(params.username);
  if (!user) {
    return { title: "User tidak ditemukan – weiiz.ink" };
  }

  const title = `${user.name || user.username} | weiiz.ink`;
  const description = user.bio || `Kunjungi halaman ${user.username} di weiiz.ink`;
  const url = `https://weiiz.ink/${user.username}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type: "profile",
      images: user.avatar
        ? [{ url: user.avatar, width: 400, height: 400, alt: user.name || user.username }]
        : [],
    },
    twitter: {
      card: "summary",
      title,
      description,
      images: user.avatar ? [user.avatar] : [],
    },
    alternates: { canonical: url },
  };
}

// ─── Data Fetcher ─────────────────────────────────────────
async function getUser(username: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { username: username.toLowerCase() },
      select: {
        id: true,
        username: true,
        name: true,
        bio: true,
        avatar: true,
        instagram: true,
        twitter: true,
        youtube: true,
        website: true,
        links: {
          where: { isActive: true },
          orderBy: { order: "asc" },
          select: {
            id: true,
            title: true,
            url: true,
            icon: true,
            type: true,
            isActive: true,
          },
        },
        products: {
          where: { isActive: true },
          orderBy: { createdAt: "desc" },
          select: {
            id: true,
            name: true,
            description: true,
            price: true,
            originalPrice: true,
            coverImage: true,
            category: true,
            salesCount: true,
          },
        },
      },
    });
    return user;
  } catch {
    return null;
  }
}

// ─── Track page view ─────────────────────────────────────
async function trackPageView(userId: string, req?: Request) {
  try {
    await prisma.pageView.create({
      data: {
        userId,
        source: "direct",
      },
    });
  } catch {
    // Silent fail — tracking tidak boleh break page
  }
}

// ─── Page Component ───────────────────────────────────────
export default async function UserProfilePage({ params }: PageProps) {
  const username = params.username.toLowerCase();

  // Validate username format
  if (!/^[a-z0-9_-]{3,30}$/.test(username)) {
    notFound();
  }

  const user = await getUser(username);

  if (!user) {
    notFound();
  }

  // Track view (non-blocking)
  trackPageView(user.id);

  return <PublicProfileClient user={user} />;
}
