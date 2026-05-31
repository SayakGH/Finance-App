import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { CheckCircle, XCircle, Eye, EyeOff, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { loginUser, registerUser } from "@/api/auth";
import type { IAuthResponse } from "@/types";

export default function AuthPage() {
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) navigate("/dashboard");
  }, [navigate]);

  // --- Login State ---
  const [loginEmail, setLoginEmail] = useState<string>("");
  const [loginPassword, setLoginPassword] = useState<string>("");
  const [showLoginPassword, setShowLoginPassword] = useState<boolean>(false);
  const [loginLoading, setLoginLoading] = useState<boolean>(false);

  // --- Sign Up State ---
  const [signupName, setSignupName] = useState<string>("");
  const [signupEmail, setSignupEmail] = useState<string>("");
  const [signupPassword, setSignupPassword] = useState<string>("");
  const [showSignupPassword, setShowSignupPassword] = useState<boolean>(false);
  const [signupLoading, setSignupLoading] = useState<boolean>(false);

  // --- Handlers ---
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);

    try {
      const data: IAuthResponse = await loginUser(loginEmail, loginPassword);

      localStorage.setItem("authToken", data.token);
      localStorage.setItem("name", data.user.name);
      localStorage.setItem("skipValidateOnce", "true");

      toast.custom((t: any) => (
        <div
          className={`${
            t.visible
              ? "animate-in fade-in slide-in-from-top-5"
              : "animate-out fade-out"
          } w-full max-w-sm bg-green-50 border border-green-300 text-green-800 rounded-xl shadow-md p-4 flex gap-3`}
        >
          <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
          <div className="flex-1">
            <p className="font-semibold text-green-700">Login Successful 🎉</p>
            <p className="text-sm text-green-600">Welcome back!</p>
          </div>
        </div>
      ));

      navigate("/dashboard");
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.message ||
        "Login failed. Please check your credentials.";

      toast.custom((t: any) => (
        <div
          className={`${
            t.visible
              ? "animate-in fade-in slide-in-from-top-5"
              : "animate-out fade-out"
          } w-full max-w-sm bg-red-50 border border-red-300 text-red-800 rounded-xl shadow-md p-4 flex gap-3`}
        >
          <XCircle className="w-6 h-6 text-red-600 mt-1" />
          <div className="flex-1">
            <p className="font-semibold text-red-700">Login Failed</p>
            <p className="text-sm text-red-600">{errorMessage}</p>
          </div>
        </div>
      ));
    } finally {
      setLoginLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignupLoading(true);

    try {
      const data: IAuthResponse = await registerUser(
        signupName,
        signupEmail,
        signupPassword,
      );

      localStorage.setItem("authToken", data.token);
      localStorage.setItem("name", data.user.name);
      localStorage.setItem("skipValidateOnce", "true");

      toast.custom((t: any) => (
        <div
          className={`${
            t.visible
              ? "animate-in fade-in slide-in-from-top-5"
              : "animate-out fade-out"
          } w-full max-w-sm bg-green-50 border border-green-300 text-green-800 rounded-xl shadow-md p-4 flex gap-3`}
        >
          <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
          <div className="flex-1">
            <p className="font-semibold text-green-700">Account Created 🎉</p>
            <p className="text-sm text-green-600">Welcome to the platform!</p>
          </div>
        </div>
      ));

      navigate("/dashboard");
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.message ||
        "Registration failed. Please try again.";

      toast.custom((t: any) => (
        <div
          className={`${
            t.visible
              ? "animate-in fade-in slide-in-from-top-5"
              : "animate-out fade-out"
          } w-full max-w-sm bg-red-50 border border-red-300 text-red-800 rounded-xl shadow-md p-4 flex gap-3`}
        >
          <XCircle className="w-6 h-6 text-red-600 mt-1" />
          <div className="flex-1">
            <p className="font-semibold text-red-700">Registration Failed</p>
            <p className="text-sm text-red-600">{errorMessage}</p>
          </div>
        </div>
      ));
    } finally {
      setSignupLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Tabs defaultValue="login" className="w-full max-w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>

        {/* --- LOGIN TAB --- */}
        <TabsContent value="login">
          <Card>
            <form onSubmit={handleLogin}>
              <CardHeader>
                <CardTitle>Welcome back</CardTitle>
                <CardDescription>
                  Enter your email and password to access your account.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showLoginPassword ? "text" : "password"}
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="Enter your password"
                      required
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowLoginPassword((prev) => !prev)}
                      className="absolute inset-y-0 right-3 flex items-center text-muted-foreground hover:text-foreground"
                    >
                      {showLoginPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full mt-4"
                  type="submit"
                  disabled={loginLoading}
                >
                  {loginLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Logging
                      in...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        {/* --- SIGN UP TAB --- */}
        <TabsContent value="signup">
          <Card>
            <form onSubmit={handleSignup}>
              <CardHeader>
                <CardTitle>Create an account</CardTitle>
                <CardDescription>
                  Enter your details below to create your account.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="new-name">Full Name</Label>
                  <Input
                    id="new-name"
                    type="text"
                    placeholder="John Doe"
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-email">Email</Label>
                  <Input
                    id="new-email"
                    type="email"
                    placeholder="m@example.com"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">Password</Label>
                  <div className="relative">
                    <Input
                      id="new-password"
                      type={showSignupPassword ? "text" : "password"}
                      placeholder="Create a password"
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      required
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowSignupPassword((prev) => !prev)}
                      className="absolute inset-y-0 right-3 flex items-center text-muted-foreground hover:text-foreground"
                    >
                      {showSignupPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full mt-4"
                  type="submit"
                  disabled={signupLoading}
                >
                  {signupLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating
                      Account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
