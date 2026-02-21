import { NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';

export async function POST() {
  const supabase = await createServerSupabase();
  await supabase.auth.signOut();

  // Cookies are cleared automatically by @supabase/ssr
  return NextResponse.json({ success: true });
}
