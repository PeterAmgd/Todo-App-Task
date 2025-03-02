'use client'

import Button from '@/components/Button'
import Input from '@/components/Input'
import InputError from '@/components/InputError'
import Label from '@/components/Label'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import AuthSessionStatus from '@/app/(auth)/AuthSessionStatus'

const Login = () => {
    const router = useRouter()

    const { login } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/dashboard',
    })

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [shouldRemember, setShouldRemember] = useState(false)
    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)

    useEffect(() => {
        if (router.reset?.length > 0 && errors.length === 0) {
            setStatus(atob(router.reset))
        } else {
            setStatus(null)
        }
    })

    const submitForm = async event => {
        event.preventDefault()

        login({
            email,
            password,
            remember: shouldRemember,
            setErrors,
            setStatus,
        })
    }

    return (
        <>
        <AuthSessionStatus className="mb-6 text-center" status={status} />

        <form onSubmit={submitForm} className="mt-[10%] bg-gray-100 p-8 rounded-lg shadow-lg max-w-sm mx-auto">
          {/* Email Address */}
          <div>
            <Label htmlFor="email" className="block text-lg font-medium text-gray-700">
              Email
            </Label>

            <Input
              id="email"
              type="email"
              value={email}
              className="block mt-1 w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
              onChange={event => setEmail(event.target.value)}
              required
              autoFocus
            />

            <InputError messages={errors.email} className="mt-2 text-sm text-red-600" />
          </div>

          {/* Password */}
          <div className="mt-6">
            <Label htmlFor="password" className="block text-lg font-medium text-gray-700">
              Password
            </Label>

            <Input
              id="password"
              type="password"
              value={password}
              className="block mt-1 w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
              onChange={event => setPassword(event.target.value)}
              required
              autoComplete="current-password"
            />

            <InputError messages={errors.password} className="mt-2 text-sm text-red-600" />
          </div>

          {/* Remember Me */}
          <div className="mt-6 flex items-center">
            <input
              id="remember_me"
              type="checkbox"
              name="remember"
              className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
              onChange={event => setShouldRemember(event.target.checked)}
            />
            <label htmlFor="remember_me" className="ml-2 text-sm text-gray-600">
              Remember me
            </label>
          </div>

          {/* Forgot Password & Submit Button */}
          <div className="flex items-center justify-between mt-6">
            <Link
              href="/forgot-password"
              className="underline text-sm text-indigo-600 hover:text-indigo-800 transition duration-200"
            >
              Forgot your password?
            </Link>

            <Button className="ml-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200">
              Login
            </Button>

          </div>
          <Link
              href="/register"
              className="underline text-sm text-indigo-600 hover:text-indigo-800 transition duration-200"
            >
              Register
            </Link>
        </form>
      </>

    )
}

export default Login
