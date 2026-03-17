import { cookies } from "next/headers";

const ADMIN_SESSION_COOKIE_NAME = "dekk_admin_session";

type CookieSameSite = "lax" | "strict" | "none";

interface ParsedSetCookie {
  name: string;
  value: string;
  path?: string;
  domain?: string;
  maxAge?: number;
  expires?: Date;
  sameSite?: CookieSameSite;
  secure?: boolean;
  httpOnly?: boolean;
}

const parseSetCookieHeader = (
  setCookieHeader: string,
): ParsedSetCookie | null => {
  const [nameValue, ...attributeTokens] = setCookieHeader.split(";");

  if (!nameValue) {
    return null;
  }

  const separatorIndex = nameValue.indexOf("=");

  if (separatorIndex < 0) {
    return null;
  }

  const name = nameValue.slice(0, separatorIndex).trim();
  const value = nameValue.slice(separatorIndex + 1).trim();

  if (!name) {
    return null;
  }

  const parsedCookie: ParsedSetCookie = {
    name,
    value,
  };

  for (const rawAttribute of attributeTokens) {
    const attribute = rawAttribute.trim();

    if (!attribute) {
      continue;
    }

    const [rawKey, ...rawValueParts] = attribute.split("=");
    const key = rawKey.toLowerCase();
    const attributeValue = rawValueParts.join("=").trim();

    switch (key) {
      case "path": {
        parsedCookie.path = attributeValue || "/";
        break;
      }
      case "domain": {
        parsedCookie.domain = attributeValue;
        break;
      }
      case "max-age": {
        const maxAge = Number.parseInt(attributeValue, 10);

        if (Number.isFinite(maxAge)) {
          parsedCookie.maxAge = maxAge;
        }

        break;
      }
      case "expires": {
        const expiresAt = new Date(attributeValue);

        if (!Number.isNaN(expiresAt.getTime())) {
          parsedCookie.expires = expiresAt;
        }

        break;
      }
      case "samesite": {
        const normalized = attributeValue.toLowerCase();

        if (
          normalized === "lax" ||
          normalized === "strict" ||
          normalized === "none"
        ) {
          parsedCookie.sameSite = normalized;
        }

        break;
      }
      case "secure": {
        parsedCookie.secure = true;
        break;
      }
      case "httponly": {
        parsedCookie.httpOnly = true;
        break;
      }
      default: {
        if (key === "secure") {
          parsedCookie.secure = true;
        }

        if (key === "httponly") {
          parsedCookie.httpOnly = true;
        }

        break;
      }
    }
  }

  return parsedCookie;
};

const applySetCookieHeaders = async (setCookieHeaders: string[]) => {
  if (!setCookieHeaders.length) {
    return;
  }

  const cookieStore = await cookies();

  for (const setCookieHeader of setCookieHeaders) {
    const parsedCookie = parseSetCookieHeader(setCookieHeader);

    if (!parsedCookie) {
      continue;
    }

    cookieStore.set({
      name: parsedCookie.name,
      value: parsedCookie.value,
      path: parsedCookie.path ?? "/",
      domain: parsedCookie.domain,
      maxAge: parsedCookie.maxAge,
      expires: parsedCookie.expires,
      sameSite: parsedCookie.sameSite,
      secure: parsedCookie.secure,
      httpOnly: parsedCookie.httpOnly,
    });
  }
};

const getIsAdminAuthenticated = async () => {
  const cookieStore = await cookies();
  return cookieStore.get(ADMIN_SESSION_COOKIE_NAME)?.value === "1";
};

const markAdminAuthenticated = async () => {
  const cookieStore = await cookies();

  cookieStore.set({
    name: ADMIN_SESSION_COOKIE_NAME,
    value: "1",
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
  });
};

const clearAdminAuthenticated = async () => {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_SESSION_COOKIE_NAME);
};

export {
  ADMIN_SESSION_COOKIE_NAME,
  applySetCookieHeaders,
  clearAdminAuthenticated,
  getIsAdminAuthenticated,
  markAdminAuthenticated,
};
