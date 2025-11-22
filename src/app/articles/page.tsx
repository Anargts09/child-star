import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { getCurrentAdmin } from '@/utils/admin'
import ArticlesClientPage from './ArticlesClientPage'

export default async function ArticlesPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const admin = await getCurrentAdmin()

  return <ArticlesClientPage displayName={admin?.display_name || null} />
}

