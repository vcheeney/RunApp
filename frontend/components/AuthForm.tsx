import { Formik } from 'formik'
import React, { FC, useState } from 'react'
import { FaFacebookF, FaGoogle } from 'react-icons/fa'
import * as Yup from 'yup'
import {
  signInWithEmail,
  signInWithFacebook,
  signInWithGoogle,
  signUpWithEmail,
} from '../services/auth'
import Button from './Button'
import Input from './Input'

type Props = {
  onSignIn: () => void
}

const AuthForm: FC<Props> = ({ onSignIn }) => {
  const [signingUp, setSigningUp] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const authSchema = Yup.object().shape({
    email: Yup.string().email('Email is invalid').required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password is too short (should be at least 6 characters long)'),
    ...(signingUp
      ? {
          confirmPassword: Yup.string().oneOf(
            [Yup.ref('password'), null],
            'Passwords must match'
          ),
        }
      : {}),
  })

  const onSuccess = () => {
    onSignIn()
  }

  const onFailure = (msg: string) => {
    setErrorMsg(msg)
  }

  return (
    <div className="space-y-4">
      <Formik
        initialValues={{
          email: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={authSchema}
        onSubmit={async (values, helpers) => {
          if (signingUp) {
            await signUpWithEmail(
              values.email,
              values.password,
              values.confirmPassword,
              onSuccess,
              onFailure
            )
          } else {
            await signInWithEmail(
              values.email,
              values.password,
              onSuccess,
              onFailure
            )
          }
        }}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit} className="space-y-2">
            <Input id="email" name="email" type="email" label="Email" />
            <Input
              id="password"
              name="password"
              type="password"
              label="Password"
            />
            {signingUp && (
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                label="Confirm password"
              />
            )}
            <div className="pt-2">
              <Button
                type="submit"
                disabled={!formik.isValid}
                text={signingUp ? 'Sign up' : 'Sign in'}
              />
            </div>
          </form>
        )}
      </Formik>
      {errorMsg && (
        <p className="w-full px-4 py-2 text-white bg-red-400 rounded-lg">
          {errorMsg}
        </p>
      )}
      {signingUp ? (
        <p className="font-medium">
          Already signed up?{' '}
          <button
            onClick={() => setSigningUp(false)}
            className="font-medium cursor-pointer hover:underline text-primary-500"
          >
            Sign in
          </button>
        </p>
      ) : (
        <p className="font-medium">
          Have not signed up yet?{' '}
          <button
            onClick={() => setSigningUp(true)}
            className="font-medium cursor-pointer hover:underline text-primary-500"
          >
            Sign up
          </button>
        </p>
      )}
      <hr className="my-4" />
      <div className="space-y-2">
        <p>Sign in with</p>
        <div className="flex space-x-2">
          <Button
            text="Google"
            onClick={() => signInWithGoogle(onSuccess, onFailure)}
            Icon={FaGoogle}
          />
          <Button
            text="Facebook"
            onClick={() => signInWithFacebook(onSuccess, onFailure)}
            Icon={FaFacebookF}
          />
        </div>
      </div>
    </div>
  )
}

export default AuthForm
