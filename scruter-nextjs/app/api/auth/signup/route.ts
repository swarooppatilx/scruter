// pages/api/auth/signup.js
import { PrismaClient } from "@prisma/client";
import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export  async function POST(req : NextRequest, res : NextResponse) {

  const { name, email } = await req.json();

  // Check if the user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return NextResponse.json({ message: "User already exists." });
  }

  // Generate OTP
  const otp = crypto.randomInt(100000, 999999).toString();

  // Create a new user
  const user = await prisma.user.create({
    data: {
      name,
      email,
      otp,
    },
  });

  // In a real app, send OTP via email here
  console.log(`OTP for ${email}: ${otp}`);

  return NextResponse.json({ message: "User registered. OTP sent to email." });
}
