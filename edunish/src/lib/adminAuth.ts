import { cookies } from "next/headers";

export const ADMIN_COOKIE_NAME = "edunish_admin_token";
const DEFAULT_PASSWORD = "admin";

/**
 * Returns configured admin password or default
 */
export function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD || DEFAULT_PASSWORD;
}

/**
 * Generates simple token based on admin password
 */
function getExpectedToken(): string {
  const pwd = getAdminPassword();
  // Simple deterministic token for cookie
  return Buffer.from(`edunish_session_${pwd}_auth_valid`).toString("base64");
}

/**
 * Check if the current request has a valid admin session cookie
 */
export async function isAuthenticatedAdmin(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  if (!token) return false;
  return token === getExpectedToken();
}

/**
 * Validates password input and returns whether it matches
 */
export function verifyAdminPassword(password: string): boolean {
  if (!password) return false;
  return password.trim() === getAdminPassword().trim();
}

/**
 * Sets admin authentication cookie
 */
export async function setAdminSession() {
  const cookieStore = await cookies();
  const token = getExpectedToken();

  cookieStore.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

/**
 * Clears admin session cookie
 */
export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
}
