import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import {
  Form,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import authService from "@/services/api/authService";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"

function ResetPassword() {
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
  setLoading(true);
  setError(null);

  try {
    // Assuming you have a method in authService for OTP verification
    const response = await authService.verifyResetPasswordOTP({
      otp: values.otp
    });

    console.log("OTP Verification successful:", response);

    // Navigate to password reset page or directly reset password
    navigate("/new-password");
  } catch (err) {
    console.error("OTP Verification failed:", err);
    
    // More detailed error handling
    if (err.response) {
      setError(
        err.response.data.message || 
        "OTP Verification failed. Please try again."
      );
    } else if (err.request) {
      setError("No response from server. Please check your connection.");
    } else {
      setError("An unexpected error occurred. Please try again.");
    }
  } finally {
    setLoading(false);
  }
}


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

        {/* Right side - Login Form */}
        <div className="absolute bottom-0 lg:static lg:ml-[-0.5rem] w-full lg:col-span-3 flex lg:items-center justify-center p-4 z-10 bg-white rounded-t-2xl lg:rounded-none lg:rounded-l-2xl">
          <div className="w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="text-center mt-6 mb-6">
              <h1 className="text-2xl font-bold">Reset Password</h1>
              <p className="text-black font-light">
                Insert the security code sent to your email in order 
              </p>
              <p className="text-black font-light">
                to proceed with the password reset.
              </p>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 mt-7"
              >
                <div className="flex justify-center items-center space-x-2 px-4 sm:px-10 md:px-0">
                  <InputOTP maxLength={6} className="w-full">
                    <div className="flex justify-center space-x-2">
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                      </InputOTPGroup>
                      <InputOTPGroup>
                        <InputOTPSlot index={1} />
                      </InputOTPGroup>
                      <InputOTPGroup>
                        <InputOTPSlot index={2} />
                      </InputOTPGroup>
                      <InputOTPGroup>
                        <InputOTPSlot index={3} />
                      </InputOTPGroup>
                      <InputOTPGroup>
                        <InputOTPSlot index={4} />
                      </InputOTPGroup>
                      <InputOTPGroup>
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </div>
                  </InputOTP>
                </div>

                <div className="flex justify-center mt-6">
                  <Button
                    type="submit"
                    className="w-full max-w-xs px-4 py-2 bg-blue-800 hover:bg-blue-600"
                  >
                    Submit
                  </Button>
                </div>

                <div className="text-center text-sm mt-5 px-4">
                  <a href="#" className="text-xs text-gray-500">
                    Didn't receive the verification code? It could take a bit of time, 
                    request a new code in <span className="text-blue-400">60 sec</span>
                  </a>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;