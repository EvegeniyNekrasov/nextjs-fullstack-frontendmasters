import { getUserByClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'

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

  return entries
}

const JournalPage = async () => {
  const entries = await getEntries()
  console.log(entries)
  return <div>journal</div>
}

export default JournalPage
