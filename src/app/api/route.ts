import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const year = searchParams.get('year')
  const month = searchParams.get('month')
  try{
    const res = await fetch(`https://api.nytimes.com/svc/archive/v1/${year}/${month}.json?api-key=${process.env.API_KEY}`)
    const Body = await res.json()
    return NextResponse.json({ Body: Body })
  } catch (e) {
    return NextResponse.json({ message: `error fetching: ${e}` })
  }
}