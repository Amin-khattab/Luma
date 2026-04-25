import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

function redirectToLogin(request: Request, error: string, email = "") {
  const params = new URLSearchParams({ error });

  if (email) {
    params.set("email", email);
  }

  return NextResponse.redirect(new URL(`/login?${params.toString()}`, request.url));
}

export async function POST(request: Request) {
  const form = await request.formData();

  const data = {
    email: String(form.get("email") || "").trim().toLowerCase(),
    password: String(form.get("password") || ""),
    rememberMe:form.get("remember_me") === "on"
  };

  if (!data.email || !data.password) {
    return redirectToLogin(request, "Email and password are required", data.email);
  }

  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (!user) {
    return redirectToLogin(request, "Invalid email or password", data.email);
  }

  const passwordMatches = await bcrypt.compare(data.password, user.passwordHash);

  if (!passwordMatches) {
    return redirectToLogin(request, "Invalid email or password", data.email);
  }

  const response = NextResponse.redirect(new URL("/message", request.url));

  response.cookies.set("UserId", String(user.id), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    ...(data.rememberMe ? {maxAge:60*60*24*7}:{})
  });

  return response;
}
