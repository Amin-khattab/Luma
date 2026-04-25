import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

function redirectToSignUp(
  request: Request,
  error: string,
  data: {
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    phone_number: string;
  }
) {
  const params = new URLSearchParams({ error, ...data });
  return NextResponse.redirect(new URL(`/?${params.toString()}`, request.url));
}

export async function POST(request: Request) {
  const form = await request.formData();

  const data = {
    first_name: String(form.get("first_name") || "").trim(),
    last_name: String(form.get("last_name") || "").trim(),
    username: String(form.get("username") || "").trim(),
    email: String(form.get("email") || "").trim().toLowerCase(),
    phone_number: String(form.get("phone_number") || "").trim(),
    password: String(form.get("password") || "").trim(),
    confirm_password: String(form.get("confirm_password") || "").trim(),
    agree_terms: form.get("agree_terms") === "on",
  };

  const preservedData = {
    first_name: data.first_name,
    last_name: data.last_name,
    username: data.username,
    email: data.email,
    phone_number: data.phone_number,
  };

  if (
    !data.first_name ||
    !data.last_name ||
    !data.username ||
    !data.email ||
    !data.phone_number ||
    !data.password ||
    !data.confirm_password
  ) {
    return redirectToSignUp(request, "All fields must be filled", preservedData);
  }

  if (!data.agree_terms) {
    return redirectToSignUp(request, "You must agree to the terms to continue", preservedData);
  }

  if (data.password !== data.confirm_password) {
    return redirectToSignUp(request, "Passwords do not match", preservedData);
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(data.email)) {
    return redirectToSignUp(request, "Please enter a valid email address", preservedData);
  }

  if (data.username.length < 3) {
    return redirectToSignUp(request, "Username must be at least 3 characters", preservedData);
  }

  const phoneDigits = data.phone_number.replace(/\D/g, "");

  if (phoneDigits.length < 7 || phoneDigits.length > 15) {
    return redirectToSignUp(request, "Please enter a valid phone number", preservedData);
  }

  if (data.password.length < 8) {
    return redirectToSignUp(request, "Password must be at least 8 characters", preservedData);
  }

  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [
        { email: data.email },
        { username: data.username },
        { phoneNumber: data.phone_number },
      ],
    },
  });

  if (existingUser) {
    if (existingUser.email === data.email) {
      return redirectToSignUp(request, "That email address is already in use", preservedData);
    }

    if (existingUser.username === data.username) {
      return redirectToSignUp(request, "That username is already taken", preservedData);
    }

    return redirectToSignUp(request, "That phone number is already in use", preservedData);
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const newUser = await prisma.user.create({
    data: {
      firstName: data.first_name,
      lastName: data.last_name,
      email: data.email,
      username: data.username,
      phoneNumber: data.phone_number,
      passwordHash: hashedPassword,
    },
  });

  const response = NextResponse.redirect(new URL("/message", request.url));

  response.cookies.set("UserId",String(newUser.id),{
    httpOnly:true,
    secure:process.env.NODE_ENV ==="production",
    sameSite:"lax",
    path:"/",
    maxAge:60*60*24*7
  })

  return response
}
