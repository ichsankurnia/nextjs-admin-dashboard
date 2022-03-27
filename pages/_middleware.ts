// pages/_middleware.ts

import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  const { token } = req.cookies

  const { pathname } = req.nextUrl

  if(token && pathname === '/auth/login'){
      return NextResponse.redirect('/dashboard')
  }
}