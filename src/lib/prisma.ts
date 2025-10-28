import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import path from 'path'

// Aiven's SSL CA certificate
const caCert = process.env.DB_SSL_CA

// Write the CA cert to a temporary file
const certPath = path.join(process.cwd(), 'ca.crt')
fs.writeFileSync(certPath, caCert)

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  datasources: {
    db: {
      url: `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?sslmode=require&sslcert=${certPath}`,
    },
  },
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
