import {
  collection,
  getDocs,
  limit as fbLimit,
  orderBy,
  query,
} from "firebase/firestore";
import { getDb } from "@/lib/firebase";
import { SAMPLE_NEWS } from "@/lib/data/news";
import type { NewsItem } from "@/lib/types";

export interface TrendingNewsResult {
  items: NewsItem[];
  /** Where the data came from, so the UI can be transparent about it. */
  origin: "firestore" | "local";
}

function localTrending(max: number): NewsItem[] {
  return [...SAMPLE_NEWS]
    .sort((a, b) => b.trendingScore - a.trendingScore)
    .slice(0, max);
}

/**
 * Returns trending news, ordered by `trendingScore` descending.
 * Reads live from the Firestore `news` collection when Firebase is configured,
 * and transparently falls back to the bundled sample data otherwise (or on error).
 */
export async function getTrendingNews(max = 20): Promise<TrendingNewsResult> {
  const db = getDb();
  if (db) {
    try {
      const snap = await getDocs(
        query(collection(db, "news"), orderBy("trendingScore", "desc"), fbLimit(max)),
      );
      if (!snap.empty) {
        const items = snap.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<NewsItem, "id">),
        }));
        return { items, origin: "firestore" };
      }
    } catch (err) {
      console.warn("Falling back to local news; Firestore read failed:", err);
    }
  }
  return { items: localTrending(max), origin: "local" };
}
