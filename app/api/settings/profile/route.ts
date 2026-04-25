import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

function redirectToSettings(request: Request, key: "error" | "success", message: string) {
  const params = new URLSearchParams({ [key]: message });
  return NextResponse.redirect(new URL(`/settings?${params.toString()}`, request.url));
}

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get("UserId");
  const userId = Number(userCookie?.value);

  if (!userId) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const form = await request.formData();
  const username = String(form.get("username") || "").trim();

  if (!username) {
    return redirectToSettings(request, "error", "Username is required");
  }

  if (username.length < 3) {
    return redirectToSettings(request, "error", "Username must be at least 3 characters");
  }

  const me = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!me) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const existingUser = await prisma.user.findFirst({
    where: {
      username,
      id: {
        not: userId,
      },
    },
  });

  if (existingUser) {
    return redirectToSettings(request, "error", "That username is already taken");
  }

  if (me.username === username) {
    return redirectToSettings(request, "success", "Your username is already up to date");
  }

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      username,
    },
  });

  return redirectToSettings(request, "success", "Username updated successfully");
}
