import { NextResponse } from 'next/server';
import { addSubscriber } from '@/lib/subscribers';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    const success = await addSubscriber(email);

    if (success) {
      return NextResponse.json({ message: 'Successfully subscribed' }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'Email already subscribed or failed to add' }, { status: 409 });
    }
  } catch (error) {
    console.error('Error in subscriber API:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 