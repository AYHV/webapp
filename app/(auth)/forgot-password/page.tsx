"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Mail, Loader2, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"

export default function ForgotPassword() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [email, setEmail] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("http://localhost:5009/api/auth/forgotpassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        router.replace("/reset-password")
        setSubmitted(true)
        console.log("Success:", data)
      } else {
        // alert("Error: " + (data?.message || "Something went wrong."))
        console.error("Error:", data?.message || "Something went wrong.")
      }
    } catch (error) {
      console.error("Network error:", error)
      // alert("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Link
            href="/login"
            className="inline-flex items-center text-sm font-medium text-purple-600 hover:text-purple-800"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to login
          </Link>
          <h1 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">Forgot password?</h1>
          <p className="mt-2 text-sm text-gray-500">No worries, we'll send you reset instructions</p>
        </div>

        {submitted ? (
          <div className="mt-8 rounded-lg bg-purple-50 p-6 text-center">
            <CheckCircle className="mx-auto h-12 w-12 text-purple-500" />
            <h2 className="mt-4 text-xl font-semibold text-gray-900">Check your email</h2>
            <p className="mt-2 text-gray-600">
              We've sent a password reset link to <span className="font-medium">{email}</span>
            </p>
            <div className="mt-6 space-y-4">
              <Button
                onClick={() => setSubmitted(false)}
                variant="outline"
                className="w-full border-purple-200 text-purple-600 hover:bg-purple-50"
              >
                Didn't receive the email? Try again
              </Button>
              <Link href="/login" className="block text-sm font-medium text-purple-600 hover:text-purple-500">
                Back to login
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Mail className="h-5 w-5 text-purple-400" />
                </div>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 border-purple-200 focus:border-purple-500 focus:ring-purple-500"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-purple-400 hover:from-purple-700 hover:to-purple-500"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending reset link...
                </>
              ) : (
                "Send reset link"
              )}
            </Button>

            <div className="text-center text-sm">
              <span className="text-gray-500">Remember your password?</span>{" "}
              <Link href="/login" className="font-medium text-purple-600 hover:text-purple-500">
                Back to login
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
