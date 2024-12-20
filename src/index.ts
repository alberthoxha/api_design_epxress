import * as dotenv from 'dotenv'
import os from 'os'
dotenv.config()

import app, { setupSwagger } from './server'

setupSwagger(app)

// app.listen(3000, '0.0.0.0', () => {
//   console.log('Server running on http://192.168.100.83:3000')
// })

const getLocalIPAddress = (): string | null => {
  const networkInterfaces = os.networkInterfaces()
  for (const interfaceKey in networkInterfaces) {
    for (const network of networkInterfaces[interfaceKey]!) {
      if (network.family === 'IPv4' && !network.internal) {
        return network.address
      }
    }
  }
  return null
}

const PORT = 3000
const HOST = '0.0.0.0'
const localIP = getLocalIPAddress()

app.listen(PORT, HOST, () => {
  console.log('Server is running and accessible at:')
  console.log(`- Local:    http://localhost:${PORT}`)
  if (localIP) {
    console.log(`- Network:  http://${localIP}:${PORT}`)
  } else {
    console.log('- Unable to determine local network IP.')
  }
})
