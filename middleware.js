import { NextResponse } from 'next/server'
 
export function middleware(request) {

    console.log(request.url)
    if (request.nextUrl.pathname === "/") {
        console.log(request.url)
        return NextResponse.redirect(new URL("/requirementform",request.url))
    }

  return NextResponse.redirect(new URL('/home', request.url))
}
 
export const config = {
  matcher: ['/'],
}