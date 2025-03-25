import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";
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
import { useNavigate } from "react-router-dom";

function Signup() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const formSchema = z.object({
    username: z.string().min(2, "Username must be at least 2 characters"),
    email: z
      .string()
      .email("Please enter a valid email address")
      .min(1, "Email is required"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z.string(),
    rememberMe: z.boolean().default(false),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      rememberMe: false,
    },
  });

   // Async function to handle signup form submission
async function onSubmit(values) {
  // Log the submitted form values for debugging
  console.log(values);

  // Set loading state to true before making the API call
  setLoading(true);

  try {
    // Call the authentication service signup method with form values
    const response = await authService.register(values);
    
    // Log successful signup response
    console.log("Signup successful:", response);
    
    // Optionally, you can automatically log in the user after signup
    // or redirect to login page or dashboard
    navigate("/login");
  } catch (err) {
    // Handle signup errors
    console.error("Signup failed:", err);
    
    // Set error message, using the server response message or a default error
    setError(
      err.response?.data?.message || "Signup failed. Please try again."
    );
  } finally {
    // Ensure loading state is set to false regardless of success or failure
    setLoading(false);
  }
}

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <div className="flex flex-col md:flex-row w-full">
        {/* Left Side - Image Section (Visible on All Screens) */}
        <div className="w-full md:w-1/2 lg:w-2/5 xl:w-1/2 relative">
          <div className="bg-[url(./src/assets/image_2.png)] h-64 md:h-screen w-full bg-center bg-no-repeat bg-cover object-contain relative">
            {/* Logo in top left corner */}
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10 flex items-center">
              <img
                src="./src/assets/logo.png"
                alt="Company Logo"
                className="w-auto h-8 sm:h-10"
              />
              <span className="ml-1 text-base font-bold text-white">
                Logo
              </span>
            </div>

            {/* Text in bottom left corner */}
            <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-10">
              <span className="text-sm md:text-base font-medium text-white drop-shadow-md">
                Tradeway
              </span>
            </div>
          </div>
        </div>

        {/* Right side - Signup Form */}
        <div className="w-full md:w-1/2 lg:w-3/5 xl:w-1/2">
          {/* Scrollable container with fixed content */}
          <div className="w-full   md:h-screen overflow-y-auto flex items-center justify-center">
            <div className="w-full max-w-md px-4 py-8">
              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold">Create an account</h1>
                <p className="text-gray-500 font-normal">
                  Already have an account?{" "}
                  <Link to="/login" className="text-blue-400 hover:underline">
                    Log in
                  </Link>
                </p>
              </div>

              {error && (
                <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4">
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
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your username"
                            type="text"
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

                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Re-enter Password</FormLabel>
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
                              I agree to the terms &amp; conditions
                            </FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-[#022EB7] hover:bg-blue-600"
                    disabled={loading}
                  >
                    {loading ? "Creating account..." : "Create an account"}
                  </Button>

                  <div className="flex items-center">
                    <div className="flex-grow border-t border-black"></div>
                    <span className="mx-4 text-black-500">or Register with</span>
                    <div className="flex-grow border-t border-black"></div>
                  </div>

                  <Button
                    type="button"
                    className="w-full h-10 bg-white text-black hover:bg-gray-100 border border-gray-300 flex items-center justify-center px-0.2"
                  >
                    <img
                      src="./src/assets/login_btn.png"
                      alt="Google logo"
                      className="h-10 w-160 m-0"
                    />
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;  