"use client";

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { set } from "date-fns";

export default function Home() {
  const router = useRouter()
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white p-4">
      <div className="w-full max-w-md space-y-8 text-center">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Welcome to&nbsp;
            <span className="bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
             Yeng
            </span>
          </h1>
          <p className="text-gray-500">Your modern authentication solution</p>
        </div>

        <div className="flex flex-col space-y-4 pt-8">
          <Button
            asChild
            className="group bg-gradient-to-r from-purple-600 to-purple-400 hover:from-purple-700 hover:to-purple-500"
          
          >
            <Link href="/login">
              Sign in to your account
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>

          <Button variant="outline" className="border-purple-300 text-purple-600 hover:bg-purple-50"
            onClick={() => router.push("/signup")}>
            {/* <Link href="/signup">Create an account</Link> */}
            Create new account
          </Button>
        </div>
      </div>
    </div>
  )
}
