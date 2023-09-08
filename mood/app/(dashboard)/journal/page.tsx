import EntryCard from '@/components/EntryCards'
import NewEntryCard from '@/components/NewEntryCard'
import { analyze } from '@/utils/ai'
import { getUserByClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'
import Link from 'next/link'

async function getEntries() {
  const user = await getUserByClerkId()
  const entries = await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
  // just to try if it works
  await analyze(
    `I'm going to give you a journal entry, i want you to analyze for a few things. 
    I need the mood, the summary, what the subject is, and a color representing teh mood.
    You need to respond back with formatted JSON like so: {"mood": "", "subject": "", color:"", "negative": "" }
    entry:
    Today was a good day. I finaly was  able to grab that pair of shoes i have been dying to get.
  `)

  return entries
}

const JournalPage = async () => {
  const entries = await getEntries()
  return (
    <div className="p-10 bg-zinc-400/10 h-full">
      <h2 className="text-3xl mb-8">Journal</h2>
      <div className="grid grid-cols-3 gap-4">
        <NewEntryCard />
        {entries.map((entry) => (
          <Link href={`/journal/${entry.id}`} key={entry.id}>
            <EntryCard entry={entry} />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default JournalPage
