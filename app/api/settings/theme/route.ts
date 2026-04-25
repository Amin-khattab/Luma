import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const form = await request.formData();
  const theme = String(form.get("theme") || "");

  if (theme !== "light" && theme !== "dark") {
    return NextResponse.redirect(new URL("/settings?error=Invalid%20theme%20selection", request.url));
  }

  const response = NextResponse.redirect(
    new URL(`/settings?success=${encodeURIComponent(`Theme changed to ${theme}`)}`, request.url)
  );

  response.cookies.set("theme", theme, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });

  return response;
}
