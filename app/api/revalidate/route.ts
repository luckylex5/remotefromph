import { revalidatePath } from 'next/cache'
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { secret, slug } = await req.json()

    if (!process.env.REVALIDATE_SECRET || secret !== process.env.REVALIDATE_SECRET) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (slug) {
      revalidatePath(`/${slug}`)
    }

    revalidatePath('/')
    revalidatePath('/cities')

    return Response.json({ revalidated: true, slug })
  } catch {
    return Response.json({ error: 'Invalid request.' }, { status: 400 })
  }
}
