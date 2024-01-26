import { PrismaClient } from '@prisma/client'

function createPrismaClient(): PrismaClient {
  if (!globalThis.prismaClient) {
    globalThis.prismaClient = new PrismaClient({
      // log: [{ emit: 'stdout', level: 'query' }],
    })
  }
  return globalThis.prismaClient
}

export const db = createPrismaClient()
