import { CLIENTS } from '@/app/client';
import { gql } from '@apollo/client';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// export const runtime = "nodejs"

export const dynamic = 'force-dynamic'
export const revalidate = 0

const ALL_PAIRS_TIKERS = gql`
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
    reserveUSD
    pairHourData(limit: 24, orderBy: hourStartUnix_DESC) {
      hourlyVolumeToken0
      hourlyVolumeToken1
      hourStartUnix
    }
    token0Price
    token1Price
  }
}
`
export async function GET(request: NextRequest) {
  const result = await CLIENTS.BifrostKusama.query({
    query: ALL_PAIRS_TIKERS
  })
  const pairs = result.data?.pairs?.map((pair: any) => {
    const pairHourData = pair.pairHourData;
    const currentHourIndex = Number.parseInt((new Date().getTime() / 3600000).toString(), 10)
    const hourStartUnix = Number(currentHourIndex - 24) * 3600000
    const pairDayData = pairHourData
    .filter((hourData: any) => Number(hourData.hourStartUnix) >= hourStartUnix)
    .reduce((total: any, hour: any) => {
      total.dailyVolumeToken0 += Number(hour.hourlyVolumeToken0)
      total.dailyVolumeToken1 += Number(hour.hourlyVolumeToken1)
      return total
    }, {
      dailyVolumeToken0: 0,
      dailyVolumeToken1: 0,
    })
    return {
      pool_id: `${pair.id}`,
      base_currency: pair.token0.id,
      target_currency: pair.token1.id,
      ticker_id: `${pair.token0.id}_${pair.token1.id}`,
      last_price: Number(pair.token1Price),
      liquidity_in_usd: Number(pair.reserveUSD),
      base_volume: pairDayData.dailyVolumeToken0,
      target_volume: pairDayData.dailyVolumeToken1,
    }
  }) ?? []
  return NextResponse.json(
    pairs,
    {
      status: 200,
    },
  );
}