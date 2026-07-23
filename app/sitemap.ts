import type { MetadataRoute } from "next";

const BASE_URL = "https://striveweb.ca";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const routes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "", priority: 1, changeFrequency: "monthly" },
    { path: "/work", priority: 0.9, changeFrequency: "monthly" },
    { path: "/work/barbershop", priority: 0.7, changeFrequency: "monthly" },
    { path: "/work/nail-studio", priority: 0.7, changeFrequency: "monthly" },
    { path: "/work/restaurant", priority: 0.7, changeFrequency: "monthly" },
    { path: "/work/ecommerce", priority: 0.7, changeFrequency: "monthly" },
    { path: "/pricing", priority: 0.9, changeFrequency: "monthly" },
    { path: "/team", priority: 0.6, changeFrequency: "yearly" },
    { path: "/contact", priority: 0.8, changeFrequency: "yearly" },
  ];

  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${BASE_URL}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
