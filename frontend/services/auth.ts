import {
  AuthProvider,
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  fetchSignInMethodsForEmail,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  onIdTokenChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as signOutFirebase,
} from 'firebase/auth'
import { firebaseApp } from '../config/firebase'
import { User } from '../utils/types'
import { setAuthorizationHeader } from './api/axios-client'
import { queryClient } from './api/queries'

const auth = getAuth(firebaseApp)
const googleProvider = new GoogleAuthProvider()
const facebookProvider = new FacebookAuthProvider()

export type SignUpWithEmail = (
  email: string,
  password: string,
  confirmPassword: string,
  onSuccess: () => void,
  onFailure: (msg: string) => void
) => Promise<void>

export type SignInWithEmail = (
  email: string,
  password: string,
  onSuccess: () => void,
  onFailure: (msg: string) => void
) => Promise<void>

export type SignInWithProvider = (
  onSuccess: () => void,
  onFailure: (msg: string) => void
) => Promise<void>

export const setupUserListener = (listener: (user: User | null) => void) => {
  const unsubscribeTokenListener = onIdTokenChanged(auth, async (user) => {
    const idToken = await auth.currentUser?.getIdToken(true)
    setAuthorizationHeader(idToken)
  })

  const unsubscribeUserListener = onAuthStateChanged(auth, async (user) => {
    queryClient.resetQueries()
    if (user) {
      listener({
        id: user.uid,
        name: user.displayName || '(no name)',
      })
    } else {
      listener(null)
    }
  })

  return () => {
    unsubscribeTokenListener()
    unsubscribeUserListener()
  }
}

export const signUpWithEmail: SignUpWithEmail = async (
  email,
  password,
  confirmPassword,
  onSuccess,
  onFailure
) => {
  try {
    if (password !== confirmPassword) {
      throw new Error('Passwords do not match')
    }
    await createUserWithEmailAndPassword(auth, email, password)
    onSuccess()
  } catch (error: any) {
    onFailure(makeFirebaseErrorMessage(error.code))
  }
}

export const signInWithEmail: SignInWithEmail = async (
  email,
  password,
  onSuccess,
  onFailure
) => {
  try {
    await signInWithEmailAndPassword(auth, email, password)
    onSuccess()
  } catch (error: any) {
    if (error.code === 'auth/wrong-password') {
      const methods = await fetchSignInMethodsForEmail(auth, email)
      if (methods.includes('google.com')) {
        await signInWithGoogle(onSuccess, onFailure)
        return
      } else if (methods.includes('facebook.com')) {
        await signInWithFacebook(onSuccess, onFailure)
        return
      }
    }
    onFailure(makeFirebaseErrorMessage(error.code))
  }
}

export const signOut = async () => {
  await signOutFirebase(auth)
}

export const signInWithGoogle: SignInWithProvider = async (
  onSuccess,
  onFailure
) => {
  try {
    await signInWithProvider(googleProvider)
    onSuccess()
  } catch (error: any) {
    onFailure(makeFirebaseErrorMessage(error.code))
  }
}

export const signInWithFacebook: SignInWithProvider = async (
  onSuccess,
  onFailure
) => {
  try {
    await signInWithProvider(facebookProvider)
    onSuccess()
  } catch (error: any) {
    onFailure(makeFirebaseErrorMessage(error.code))
  }
}

const signInWithProvider = async (provider: AuthProvider) => {
  await signInWithPopup(auth, provider)
}

const makeFirebaseErrorMessage = (code: string) => {
  switch (code) {
    case 'auth/wrong-password':
      return 'Wrong password'
    case 'auth/user-not-found':
      return 'Email does not exist'
    case 'auth/email-already-in-use':
      return 'Email is already used'
    case 'auth/popup-closed-by-user':
      return 'Authentication window was closed by the user'
    default:
      // log le type d'erreur pour qu'on sache comment la traiter
      console.error(`No custom error messages for this Firebase code: ${code}`)
      return `An error occurred: ${code}`
  }
}
