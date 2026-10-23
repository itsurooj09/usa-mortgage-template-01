import { MetadataRoute } from "next";
import { loanProducts } from "@/content/loans";
import { blogPosts } from "@/content/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://northstarmortgage.example.com";

  const coreRoutes = [
    "",
    "/about",
    "/team",
    "/buy-a-home",
    "/refinance",
    "/loan-options",
    "/mortgage-rates",
    "/reviews",
    "/faqs",
    "/resources",
    "/contact",
    "/locations",
    "/calculators",
    "/calculators/mortgage-payment",
    "/calculators/home-affordability",
    "/calculators/refinance",
    "/calculators/fha",
    "/calculators/va",
    "/calculators/closing-costs",
    "/calculators/debt-to-income",
    "/get-started",
    "/get-pre-approved",
    "/apply-now",
    "/licensing",
    "/privacy-policy",
    "/terms-of-use",
    "/accessibility",
    "/cookie-preferences",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : route.startsWith("/calculators") || route === "/get-started" ? 0.9 : 0.8,
  }));

  const loanRoutes = loanProducts.map((l) => ({
    url: `${baseUrl}/loan-options/${l.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  const blogRoutes = blogPosts.map((b) => ({
    url: `${baseUrl}/resources/${b.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const lpRoutes = [
    "first-time-homebuyer",
    "fha-low-down",
    "va-zero-down",
    "refinance-cash-out",
  ].map((campaign) => ({
    url: `${baseUrl}/lp/${campaign}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...coreRoutes, ...loanRoutes, ...blogRoutes, ...lpRoutes];
}
