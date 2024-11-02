import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { generateAndSendOTP } from '@/lib/auth';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const { email, name, otp } = await request.json();

  // Check if the seller already exists
  try {
    const existingseller = await prisma.seller.findUnique({
      where: { email },
    });

    console.log(email + '-' + name + '-' + otp);
    if (existingseller) {
      return NextResponse.json(
        { message: 'seller already exists' },
        { status: 400 }
      );
    }

    const seller = await prisma.seller.create({
      data: {
        email,
        name,
        otp,
      },
    });

    const res = await generateAndSendOTP(email, 'seller');

    if (res) {
      return NextResponse.json(
        {
          message: 'ACCOUNT CREATED, VERIFY EMAIL VIA OTP',
          seller,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          message: 'STORE CREATED, BUT FAILED TO SEND OTP.',
          seller,
        },
        { status: 500 }
      );
    }
  } catch (err) {
    console.error(
      'Error fetching seller in signup route',
      err instanceof Error ? err.message : err
    );
    return NextResponse.json(
      {
        message: err instanceof Error ? err.message : err,
      },
      { status: 400 }
    );
  }
}
