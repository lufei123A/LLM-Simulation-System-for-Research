import { type NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { client, getInfo, setSession } from '@/app/api/utils/common'
import { APP_ID, API_KEY, API_URL } from '@/config'

export async function GET(request: NextRequest) {
  console.log('APP_ID:', APP_ID)
  console.log('API_KEY:', API_KEY)
  console.log('API_URL:', API_URL)
  console.log('Client:', client)
  const { sessionId, user } = getInfo(request)
  try {
    const { data }: any = await client.getConversations(user)
    return NextResponse.json(data, {
      headers: setSession(sessionId),
    })
  }
  catch (error: any) {
    return NextResponse.json({
      data: [],
      error: error.message,
    })
  }
}
