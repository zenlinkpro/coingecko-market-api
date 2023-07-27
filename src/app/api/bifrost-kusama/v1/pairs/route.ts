import { CLIENTS } from '@/app/client';
import { gql } from '@apollo/client';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// export const dynamic = 'force-dynamic'
// export const revalidate = 10
export const fetchCache = 'force-no-store'


const ALL_PAIRS = gql`
  query MyQuery {
    pairs {
      id
      token0 {
        symbol
        id
      }
      token1 {
        symbol
        id
      }
    }
  }
`
export async function GET(request: NextRequest) {
  const result = await CLIENTS.BifrostKusama.query({
    query: ALL_PAIRS,
    fetchPolicy: 'no-cache',
  })
  const pairs = result.data?.pairs?.map((pair: any) => {
    return {
      pool_id: `${pair.id}`,
      base: pair.token0.id,
      target: pair.token1.id,
      ticker_id: `${pair.token0.id}_${pair.token1.id}`
    }
  }) ?? []
  return NextResponse.json(
    pairs,
    {
      status: 200,
    },
  );
}