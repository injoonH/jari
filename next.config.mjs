import createJITI from 'jiti'
import { fileURLToPath } from 'url'

const jiti = createJITI(fileURLToPath(import.meta.url))
jiti('./src/env')

/** @type {import('next').NextConfig} */
const nextConfig = {}

export default nextConfig
