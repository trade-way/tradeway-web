import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import axios from 'axios';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} 
from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";

function ForgotPassword() {
  // Form schema definition
  const formSchema = z.object({
    email: z
      .string()
      .email("Please enter a valid email address")
      .min(1, "Email is required"),
  });

  // Form hook configuration
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  // State for loading and response
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  // Handle form submission
  const onSubmit = async (data) => {
    // Reset previous responses
    setResponse(null);
    setLoading(true);

    try {
      // Make API call
      const apiResponse = await axios.post('/auth/forgot-password', {
        email: data.email
      });

      // Handle successful response
      setResponse({
        success: true,
        message: 'Password reset instructions have been sent to your email'
      });
    } catch (error) {
      // Handle API errors
      const errorMessage = error.response?.data?.message || 
                           'An error occurred. Please try again.';
      
      setResponse({
        success: false,
        message: errorMessage
      });
    } finally {
      // Always reset loading state
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative bg-gray-100">
      <div className="min-h-screen absolute inset-0 lg:grid lg:grid-cols-5">
        {/* Left Side - Image Section */}
        <div className="h-screen lg:col-span-2 relative">
          <div className="bg-[url(./src/assets/image_2.png)] h-full w-full bg-center bg-no-repeat bg-cover object-contain relative">
            {/* Logo in top right corner */}
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 lg:top-8 lg:right-8 z-10 flex items-center">
              <img 
                src="./src/assets/logo.png" 
                alt="Company Logo" 
                className="w-auto h-8 sm:h-10 lg:h-10"
              /> 
              <span className="m-1 md:text-base font-bold text-white lg:text-lg font-poppins">
                Logo
              </span>
            </div>

            {/* Text in bottom left corner */}
            <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 lg:bottom-8 lg:left-8 z-10">
              <span className="text-sm md:text-base lg:text-lg font-medium text-white drop-shadow-md">
                Tradeway
              </span>
            </div>
          </div>    
        </div>

        {/* Right side - Forgot Password Form */}
        <div className="absolute bottom-0 lg:static lg:ml-[-0.5rem] w-full lg:col-span-3 flex lg:items-center justify-center p-4 z-10 bg-white rounded-t-2xl lg:rounded-none lg:rounded-l-2xl">
          <div className="w-full max-w-md">
            <div className="text-center mt-6 mb-6">
              <h1 className="text-2xl font-bold">Forgot Password?</h1>
              <p className="text-sm font-light">
                Enter your Email-address, and we'll send
              </p>
              <p className="text-sm font-light">
                you a link to reset your password
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

                <Button
                  type="submit" 
                  className="w-full bg-blue-800 hover:bg-blue-600 mt-5"
                  disabled={loading}
                >
                  {loading ? 'Sending...' : 'Request Password Reset'}
                </Button>

                {response && (
                  <div 
                    className={`mt-4 p-3 rounded ${
                      response.success 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {response.message}
                  </div>
                )}
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;