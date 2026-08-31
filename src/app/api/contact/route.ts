import { NextResponse } from 'next/server';
import { sendContactMessage } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    let body;
    try {
      body = await request.json();
    } catch {
      const text = await request.text();
      body = JSON.parse(text || '{}');
    }

    const { name, email, message } = body || {};

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: 'Please provide name, email, and message.' },
        { status: 400 }
      );
    }

    const result = await sendContactMessage({ name, email, message });

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { success: false, message: error?.message || 'Failed to process message' },
      { status: 500 }
    );
  }
}
