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
// import ForgotPassword from "./ForgotPassword";

function ForgotPassword() {
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
              <h1 className="text-2xl font-bold">Forgot Password? </h1>
              <p className="text- font-light">
               Enter your Email-addres, and we'll send 
              </p>
              <p className="text- font-light">
                you a link to reset your 
               password
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

                <a href="/reset-password">
                                <Button
                                  type="submit" 
                                  className="w-full bg-blue-800 hover:bg-blue-600  mt-5"
                                >
                                  Request Password reset
                                </Button>
                                </a>

                
              </form>
            </Form>

           
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
