import { spawn } from 'node:child_process'
import electronPath from 'electron'

const { ELECTRON_RUN_AS_NODE: _electronRunAsNode, ...environment } = process.env
environment.ELECTRON_START_URL = 'http://127.0.0.1:5173'

const child = spawn(electronPath, ['.'], { stdio: 'inherit', env: environment })

child.on('error', error => {
  console.error('Could not launch Electron:', error.message)
  process.exitCode = 1
})

child.on('close', (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal)
    return
  }
  process.exitCode = code ?? 1
})
