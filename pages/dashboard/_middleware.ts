// pages/dashboard/_middleware.ts

import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  const { token } = req.cookies

  // Redirect them to login if they dont have token AND requesting a protected route
  if(!token){
      return NextResponse.redirect('/auth')
  }
}