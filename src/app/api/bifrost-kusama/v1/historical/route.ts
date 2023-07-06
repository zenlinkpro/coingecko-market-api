import { CLIENTS } from '@/app/client';
import { gql } from '@apollo/client';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
export async function GET(request: NextRequest) {
  return NextResponse.json(
    [],
    {
      status: 200,
    },
  );
}