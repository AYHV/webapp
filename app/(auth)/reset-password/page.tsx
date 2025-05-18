"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Eye, EyeOff, Lock, Loader2, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simulate API call
    console.log("Password reset request sent:", { password, confirmPassword })
   
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
          <h1 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">Reset password</h1>
          <p className="mt-2 text-sm text-gray-500">Create a new strong password for your account</p>
        </div>

        {submitted ? (
          <div className="mt-8 rounded-lg bg-purple-50 p-6 text-center">
            <CheckCircle className="mx-auto h-12 w-12 text-purple-500" />
            <h2 className="mt-4 text-xl font-semibold text-gray-900">Password reset successful</h2>
            <p className="mt-2 text-gray-600">
              Your password has been reset successfully. You can now log in with your new password.
            </p>
            <div className="mt-6">
              <Button
                asChild
                className="w-full bg-gradient-to-r from-purple-600 to-purple-400 hover:from-purple-700 hover:to-purple-500"
              >
                <Link href="/login">Back to login</Link>
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">New password</Label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Lock className="h-5 w-5 text-purple-400" />
                  </div>
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                    className="pl-10 border-purple-200 focus:border-purple-500 focus:ring-purple-500"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                <p className="text-xs text-gray-500">Must be at least 8 characters long</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm new password</Label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Lock className="h-5 w-5 text-purple-400" />
                  </div>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    className="pl-10 border-purple-200 focus:border-purple-500 focus:ring-purple-500"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              // onClick={}
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-purple-400 hover:from-purple-700 hover:to-purple-500"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Resetting password...
                </>
              ) : (
                "Reset password"
              )}
            </Button>
          </form>
        )}
      </div>
    </div>
  )
}
