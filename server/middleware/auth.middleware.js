import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function middleware(req) {
    const token = req.headers.get("authorization")?.split(" ")[1];
    const protectedRoutes = ["/dashboard", "/profile"];
    const pathname = req.nextUrl.pathname;

    if (protectedRoutes.includes(pathname)) {
        if (!token) {
            return NextResponse.redirect(new URL("/login", req.url));
        }

        try {
            jwt.verify(token, process.env.JWT_SECRET);
            return NextResponse.next();
        } catch (error) {
            return NextResponse.redirect(new URL("/login", req.url));
        }
    }

    return NextResponse.next();
}
