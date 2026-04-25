import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request:Request){

    const cookieStore = await cookies()
    const userCookie = await cookieStore.get("UserId")
    const userId = Number(userCookie?.value)

    if(!userId){
        return NextResponse.redirect(new URL("/login?error=not%20logged%20in.",request.url))
    }

    const form = await request.formData()
    const content = String(form.get("content")||"").trim()
    const receiverId = Number(form.get("receiverId"))

    if(!content || !receiverId){
        return NextResponse.redirect(new URL("/message?error=Message%20or%20receiver%20missing",request.url))
    }

    await prisma.message.create({
        data :{
            content,
            senderId:userId,
            receiverId
        }
    })

    return NextResponse.redirect(new URL(`/message?to=${receiverId}`,request.url))
}
