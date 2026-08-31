import { NextResponse } from 'next/server';
import { trackVisitor, supabase } from '@/lib/supabase';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const shouldIncrement = searchParams.get('inc') === '1';

  try {
    if (supabase) {
      if (shouldIncrement) {
        const count = await trackVisitor();
        return NextResponse.json({ count: count || 284 });
      } else {
        const { data } = await supabase
          .from('site_stats')
          .select('page_views')
          .eq('id', 'vipasana_portfolio')
          .single();

        return NextResponse.json({ count: data?.page_views || 284 });
      }
    }

    // Default graceful counter when Supabase not configured
    return NextResponse.json({ count: 284 });
  } catch (error) {
    return NextResponse.json({ count: 284 });
  }
}
