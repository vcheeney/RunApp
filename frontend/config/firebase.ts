import { connectAuthEmulator, getAuth } from 'firebase/auth'
import { initializeApp } from 'firebase/app'
import { connectStorageEmulator, getStorage } from '@firebase/storage'

const firebaseConfig = {
  apiKey: 'firebaseprojectapikey',
  authDomain: 'firebaseauthdomain',
  projectId: 'firebaseprojectid',
  storageBucket: 'firebasestoragebucket',
  messagingSenderId: 'firebasemessagingsenderid',
  appId: 'firebaseappid',
  measurementId: 'firebasemeasurementid',
}

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig)

export const shouldUseEmulators =
  process.env.NEXT_PUBLIC_USE_EMULATORS === 'true'

const auth = getAuth()
const storage = getStorage()

if (shouldUseEmulators) {
  connectAuthEmulator(auth, 'http://localhost:9099')
  connectStorageEmulator(storage, 'localhost', 9199)
}
