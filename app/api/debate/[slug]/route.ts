import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Debate from '@/models/Debate';
import Option from '@/models/Option';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  await dbConnect();
  
  const slug = params.slug;

  try {
    const debate = await Debate.findOne({ slug });

    if (!debate) {
      // Attempt to look for by ID if slug not found? No, strictly slug for now.
      return NextResponse.json({ error: 'Debate not found' }, { status: 404 });
    }

    const options = await Option.find({ debateId: debate._id }).sort({ votes: -1 });

    return NextResponse.json({ ...debate.toObject(), options }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
