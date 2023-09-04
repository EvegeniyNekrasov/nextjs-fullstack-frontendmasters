import { auth } from '@clerk/nextjs'
import { prisma } from './db'

export async function getUserByClerkId({ includes, select }) {
  const { userId } = await auth()

  const user = await prisma.user.findUniqueOrThrow({
    where: {
      clerkId: userId,
    },
    select,
    includes,
  })

  return user
}
