import EmailTemplate from '../../../components/emailTemplate';
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
// must added
import { ReactElement } from "react";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request:NextRequest) {
    try {
        const body = await request.json();
        const { email, verifyCode } = body;
        const data = await resend.emails.send({
            from: "TutorTrackr <onboarding@resend.dev>",
            to: email,
            subject: 'TutorTrackr: Reset your password',
            react: EmailTemplate({ verifyCode }) as ReactElement
        });
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error });
    }
}
