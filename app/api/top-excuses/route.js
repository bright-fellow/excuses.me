import { getServerSupabase, missingDb } from '@/app/lib/supabase';

export async function GET() {
  const supabase = getServerSupabase();
  if (!supabase) return Response.json({ excuses: [] });

  try {
    const { data, error } = await supabase
      .from('excuses')
      .select('id, text, region, tone, length, likes')
      .eq('status', 'approved')
      .order('likes', { ascending: false })
      .limit(4);

    if (error) {
      console.error('Supabase error:', error);
      return Response.json({ error: 'Failed to fetch excuses' }, { status: 500 });
    }

    return Response.json({ excuses: data });
  } catch (err) {
    console.error('API error:', err);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
