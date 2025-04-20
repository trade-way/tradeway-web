// pages/Login.jsx
import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "@/components/ui/checkbox";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import authService from "@/services/api/authService";
import { AuthContext } from "../context/AuthContext"; // Import AuthContext

// Uncomment this import if you plan to use Google authentication
// import { GoogleLogin } from "@react-oauth/google";

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { updateAuthTokens } = useContext(AuthContext); // Get updateAuthTokens from context

  const formSchema = z.object({
    email: z
      .string()
      .email("Please enter a valid email address")
      .min(1, "Email is required"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    rememberMe: z.boolean().default(false),
  });

  // Configure form with zod resolver
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  // Handle form submission
  async function onSubmit(values) {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.login(values);
      console.log("Login successful:", response);

      if (response?.tokens?.access_token && response?.tokens?.refresh_token) {
        // Update auth tokens in context and localStorage
        updateAuthTokens(response.tokens.access_token, response.tokens.refresh_token);
        console.log(
          "Access and Refresh Tokens stored and context updated in Login"
        );
        navigate("/");
      } else {
        setError("Login successful, but tokens not received.");
      }
    } catch (err) {
      console.error("Login failed:", err);
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  // Handle Google Sign-In Success
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      setLoading(true);
      // Decode the Google credential
      const decodedToken = jwtDecode(credentialResponse.credential);

      // Prepare Google login data
      const googleLoginData = {
        email: decodedToken.email,
        name: decodedToken.name,
        googleId: decodedToken.sub,
      };

      // Call backend Google authentication
      // Uncomment the line below when your backend service is ready
      // const response = await authService.googleLogin(googleLoginData);
      console.log("Google Login successful:", googleLoginData);

      // If your Google login returns tokens, update context and navigate
      // Example (adjust based on your backend response):
      // if (response?.tokens?.access_token && response?.tokens?.refresh_token) {
      //   updateAuthTokens(response.tokens.access_token, response.tokens.refresh_token);
      //   navigate("/");
      // } else {
      //   setError("Google Login successful, but tokens not received.");
      // }
      navigate("/"); // For now, just navigate after successful Google sign-in
    } catch (err) {
      console.error("Google Login failed:", err);
      setError(
        err.response?.data?.message || "Google Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle Google Sign-In Failure
  const handleGoogleFailure = (error) => {
    console.error("Google Sign-In Failed:", error);
    setError("Google Sign-In failed. Please try again.");
  };

  return (
    <div className="min-h-screen relative bg-gray-100 ">
      {/* Background for visible border radius */}
      <div className="min-h-screen w-full bg-gray-100"></div>

      <div className="min-h-screen absolute inset-0 lg:grid lg:grid-cols-5">
        {/* Left Side - Image Section */}
        <div className="h-screen lg:col-span-2 relative">
          {/* Use import.meta.url for Vite or process.env.PUBLIC_URL for Create React App */}
          <div className="bg-[url(/src/assets/image_2.png)] h-full w-full bg-center bg-no-repeat bg-cover object-contain relative">
            {/* Logo in top right corner */}
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 lg:top-8 lg:right-8 z-10 flex items-center">
              <img
                src="/src/assets/logo.png"
                alt="Company Logo"
                className="w-auto h-8 sm:h-10 lg:h-10"
              />
              <span className="m-1 md:text-base font-bold text-white lg:text-lg font-poppins">
                Logo
              </span>
            </div>

            {/* New text in bottom left corner */}
            <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 lg:bottom-8 lg:left-8 z-10">
              <span className="text-sm md:text-base lg:text-lg font-medium text-white drop-shadow-md">
                Tradeway
              </span>
            </div>
          </div>
        </div>

        {/* Right side - Login Form */}
        <div className="absolute bottom-0 lg:static lg:ml-[-0.5rem] w-full lg:col-span-3 flex lg:items-center justify-center p-4 z-10 bg-white rounded-t-2xl lg:rounded-none lg:rounded-l-2xl">
          <div className="w-full max-w-md">
            <div className="text-center mt-6 mb-6">
              <h1 className="text-2xl font-bold">Welcome back!</h1>
              <p className="text-gray-500 font-normal">
                Log in to continue your shopping experience.
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-center">
                {error}
              </div>
            )}

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="your.email@example.com"
                          type="email"
                          className="placeholder:leading-[1.15] placeholder:text-base"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="••••••••"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-between items-center">
                  <FormField
                    control={form.control}
                    name="rememberMe"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="cursor-pointer">
                            Remember me for 30 days
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  <div>
                    <Link
                      to="/forgot-password"
                      className="text-blue-500 hover:underline text-sm"
                    >
                      Forgot password?
                    </Link>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#022EB7] hover:bg-blue-600"
                >
                  {loading ? "Logging in..." : "Login"}
                </Button>

                {/* Google Login Button - Uncomment when ready to use */}
                {/*
                <div className="w-full flex justify-center mt-4">
                  <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={handleGoogleFailure}
                    type="standard"
                    theme="filled_blue"
                    size="large"
                    text="signin_with"
                  />
                </div>
                */}
              </form>
            </Form>

            <div className="text-center text-sm mt-6 mb-4">
              <span className="text-gray-500">Don't have an account? </span>
              <Link to="/signup" className="text-blue-600 hover:underline">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;