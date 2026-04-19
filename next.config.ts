import type { NextConfig } from "next";

interface ImageRemotePattern {
  protocol: "http" | "https";
  hostname: string;
  port: string;
  pathname: string;
}

const createRemotePatternFromUrl = (
  value?: string,
): ImageRemotePattern | null => {
  if (!value) {
    return null;
  }

  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return null;
  }

  try {
    const parsedUrl = new URL(trimmedValue);
    const protocol: ImageRemotePattern["protocol"] | null =
      parsedUrl.protocol === "https:"
        ? "https"
        : parsedUrl.protocol === "http:"
          ? "http"
          : null;

    if (!protocol) {
      return null;
    }

    return {
      protocol,
      hostname: parsedUrl.hostname,
      port: parsedUrl.port,
      pathname: "/**",
    };
  } catch {
    return null;
  }
};

const bucketRemotePattern = createRemotePatternFromUrl(
  process.env.NEXT_PUBLIC_BUCKET_URL,
);

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/**",
      },
      ...(bucketRemotePattern ? [bucketRemotePattern] : []),
    ],
  },
};

export default nextConfig;
