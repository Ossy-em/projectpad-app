"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-muted px-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8 space-y-6">
                <div className="text-center">
                    <h1 className="text-3xl font-bold">Welcome Back</h1>
                    <p className="text-muted-foreground text-sm">
                        Login to continue your research journey
                    </p>
                </div>

                <form className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="you@example.com" />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" placeholder="••••••••" />
                    </div>

                    <Button className="w-full mt-4">Login</Button>
                </form>

                <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="bg-white px-2 text-muted-foreground">or</span>
                    </div>
                </div>

                <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                    <svg
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M21.805 10.023H21V10H12v4h5.62c-.8 2.28-2.94 4-5.62 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.53 0 2.93.58 4 1.53l2.83-2.83C17.07 2.62 14.66 1.5 12 1.5 6.75 1.5 2.5 5.75 2.5 11s4.25 9.5 9.5 9.5c5.18 0 9.42-4.02 9.5-9.18.01-.11.01-.22.01-.33 0-.66-.06-1.3-.17-1.92z"
                            fill="currentColor"
                        />
                    </svg>
                    Continue with Google
                </Button>


                <div className="text-sm text-center text-muted-foreground">
                    Don't have an account? <a href="#" className="underline">Sign up</a>
                </div>
            </div>
        </div>
    );
}
