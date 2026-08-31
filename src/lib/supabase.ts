import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && supabaseAnonKey
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * Inserts a message into Supabase 'contact_messages' table.
 */
export async function sendContactMessage(data: {
  name: string;
  email: string;
  message: string;
}) {
  if (!supabase) {
    return {
      success: false,
      fallback: true,
      message: 'Supabase is not configured.',
    };
  }

  try {
    const { error } = await supabase
      .from('contact_messages')
      .insert([
        {
          name: data.name,
          email: data.email,
          message: data.message,
          created_at: new Date().toISOString(),
        },
      ]);

    if (error) {
      console.error('SUPABASE INSERT ERROR:', error);

      return {
        success: false,
        fallback: false,
        message: error.message || 'Failed to save message.',
      };
    }

    return {
      success: true,
      fallback: false,
      message: 'Message sent successfully!',
    };
  } catch (err: any) {
    console.error('SUPABASE CONTACT ERROR:', err);

    return {
      success: false,
      fallback: false,
      message: err?.message || 'Failed to process message.',
    };
  }
}

/**
 * Tracks and fetches live visitor count from Supabase 'site_stats' table.
 */
export async function trackVisitor() {
  if (!supabase) {
    return null;
  }

  try {
    const { data, error } = await supabase
      .from('site_stats')
      .select('page_views')
      .eq('id', 'vipasana_portfolio')
      .single();

    if (error || !data) {
      const initialCount = 142;

      await supabase
        .from('site_stats')
        .upsert([
          {
            id: 'vipasana_portfolio',
            page_views: initialCount,
            updated_at: new Date().toISOString(),
          },
        ]);

      return initialCount;
    }

    const nextCount = (data.page_views || 140) + 1;

    await supabase
      .from('site_stats')
      .update({
        page_views: nextCount,
        updated_at: new Date().toISOString(),
      })
      .eq('id', 'vipasana_portfolio');

    return nextCount;
  } catch (err) {
    console.warn('Supabase stats error:', err);
    return null;
  }
}