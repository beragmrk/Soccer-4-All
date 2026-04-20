import { NextRequest, NextResponse } from "next/server";

const legacyRedirects = new Map<string, string>([
  ["/Home", "/"],
  ["/Mission", "/mission"],
  ["/Impact", "/impact"],
  ["/Stories", "/stories"],
  ["/GetInvolved", "/get-involved"],
  ["/Donate", "/donate"],
  ["/Contact", "/contact"],
  ["/about-us", "/mission"],
  ["/our-vision", "/mission"]
]);

export function middleware(request: NextRequest) {
  const destination = legacyRedirects.get(request.nextUrl.pathname);

  if (!destination) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = destination;
  return NextResponse.redirect(url, 308);
}

export const config = {
  matcher: [
    "/Home",
    "/Mission",
    "/Impact",
    "/Stories",
    "/GetInvolved",
    "/Donate",
    "/Contact",
    "/about-us",
    "/our-vision"
  ]
};
