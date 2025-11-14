import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import path from 'path'

const caCert = process.env.DB_SSL_CA
let sslCertPath = ''

if (caCert) {
  sslCertPath = path.join('/tmp', 'ca.crt')
  fs.writeFileSync(sslCertPath, caCert)
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const datasourceUrl = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?sslmode=require`

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  datasources: {
    db: {
      url: caCert ? `${datasourceUrl}&sslcert=${sslCertPath}` : datasourceUrl,
    },
  },
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
