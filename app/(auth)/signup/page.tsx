"use client"

import type React from "react"
import axios, { AxiosResponse } from "axios"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Eye, EyeOff, User, Mail, Lock, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type RegisterResponse = {
  success: boolean;
  token: string;
};


export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true);
    if (password.length < 6) {
      alert("Youir password must be 6 characters");
      return;
    }
    const data = JSON.stringify({
      name: name,
      email: email,
      password: password
    });
    const config = {
      method: 'post',
      url: 'http://localhost:5009/api/auth/register',
      headers: {
        'Content-Type': 'application/json'
      },
      data
    };
    axios<RegisterResponse>(config)
      .then((response: AxiosResponse<RegisterResponse>) => {
        console.log("Success");
        console.log(JSON.stringify(response.data));
        if (response.data.success) {
          alert("Register success!")
        } else {
          alert("Register failed! try again!")
        }
      })
      .catch((error: Error) => {
        console.log("Error:", error);
        alert("Something went wrong!");
      });

    setLoading(false);
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center text-sm font-medium text-purple-600 hover:text-purple-800">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to home
          </Link>
          <h1 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">Create your account</h1>
          <p className="mt-2 text-sm text-gray-500">Join us today and get access to all features</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <User className="h-5 w-5 text-purple-400" />
                </div>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="pl-10 border-purple-200 focus:border-purple-500 focus:ring-purple-500"
                  placeholder="John Doe"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

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
                  className="pl-10 border-purple-200 focus:border-purple-500 focus:ring-purple-500"
                  placeholder="you@example.com"
                  onChange={(e) => setEmail(e.target.value)}

                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Lock className="h-5 w-5 text-purple-400" />
                </div>
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="pl-10 border-purple-200 focus:border-purple-500 focus:ring-purple-500"
                  placeholder="••••••••"
                  onChange={(e) => setPassword(e.target.value)}

                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
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
                Creating account...
              </>
            ) : (
              "Sign up"
            )}
          </Button>

          <div className="text-center text-sm">
            <span className="text-gray-500">Already have an account?</span>{" "}
            <Link href="/login" className="font-medium text-purple-600 hover:text-purple-500">
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
