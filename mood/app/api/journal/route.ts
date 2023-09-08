import { analyze } from '@/utils/ai'
import { getUserByClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

const arr = ['Frase 1', 'Frase 2', 'Frase 3', 'Frase 4', 'Frase 5']
const randomIndex = Math.floor(Math.random() * arr.length)
const randomFrase = arr[randomIndex]

export const POST = async () => {
  const user = await getUserByClerkId()
  const entry = await prisma.journalEntry.create({
    data: {
      userId: user.id,
      content: randomFrase,
    },
  })

  const analysis = await analyze(entry.content)
  await prisma.analysis.create({
    data: {
      entryId: entry.id,
      ...analysis,
    },
  })
  revalidatePath('/journal')

  return NextResponse.json({ data: entry })
}
