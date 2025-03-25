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

function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
    console.log(values);
    try {
      const response = await authService.login(values);
      console.log("Login successful:", response);

      // Redirect to dashboard or home page after successful login
      navigate("/dashboard");
    } catch (err) {
      console.error("Login failed:", err);
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen relative bg-gray-100 ">
      {/* Background for visible border radius */}
      <div className="min-h-screen w-full bg-gray-100"></div>

      <div className="min-h-screen absolute inset-0 lg:grid lg:grid-cols-5">
        {/* Left Side - Image Section */}
        <div className="h-screen lg:col-span-2 relative">
          {/* <div className="bg-[url(./src/assets/Group_img.png)] h-full w-full bg-center bg-no-repeat bg-cover bg-black object-contain"></div> */}
          <div className="bg-[url(./src/assets/image_2.png)] h-full w-full bg-center bg-no-repeat bg-cover object-contain relative">
            {/* Logo in top right corner - now inside the background div with relative positioning */}
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 lg:top-8 lg:right-8 z-10 flex items-center">
              <img 
                src="./src/assets/logo.png" 
                alt="Company Logo" 
                className="w-auto h-8 sm:h-10 lg:h-10"
              /> 
              <span class=" m-1 md:text-base font-bold text-white lg:text-lg   font-poppins">
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
                  className="w-full bg-[#022EB7] hover:bg-blue-600"
                >
                  Login
                </Button>

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

            <div className="text-center text-sm mt-6 mb-4">
              <span className="text-gray-500">Don't have an account? </span>
              <a href="/Signup" className="text-blue-600 hover:underline">
                Sign up
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
