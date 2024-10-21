import { NextRequest, NextResponse } from 'next/server';
import { auth } from '../../../lib/firebase';
import { updateProfile } from 'firebase/auth';

export async function POST(req: NextRequest) {
  try {
    const { displayName } = await req.json();
    const authHeader = req.headers.get('Authorization');
    
    if (!authHeader) {
      return NextResponse.json({ error: 'No authorization header' }, { status: 401 });
    }

    const currentUser = auth.currentUser;

    if (!currentUser) {
      return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }

    await updateProfile(currentUser, { displayName });

    return NextResponse.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
  }
}
