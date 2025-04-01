import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp";
import authService from "@/services/api/authService";
import Cookies from "js-cookie";
import { api } from "@/services/api/axios";

function VerifyOTP() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const formSchema = z.object({
    otp: z.string().min(4, "Please enter all 4 digits").max(6),
  });

  // Configure form with zod resolver
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
    },
  });

  // Handle form submission
  async function onSubmit(values) {
    setLoading(true);
    try {
      console.log("Verifying OTP:", values);
      // Replace with your actual API service call
      const response = await authService.verifyOTP(values.otp);
      console.log("OTP verification successful:", response);

      // Redirect to appropriate page after successful verification
      navigate("/login");
    } catch (err) {
      console.error("OTP verification failed:", err);
      setError(
        err.response?.data?.message || "Verification failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  async function resendOTP() {
    setResending(true);
    const email = Cookies.get("email");
    console.log(email);

    // TODO: validate if email exists in cookie
    try {
      const message = await authService.resendOTP(email);
      setMessage(message);
    } catch (err) {
      console.error(err);
      setError("An error occurred when resending your otp. Please try again");
    } finally {
      setLoading(false);
      setResending(false);
    }
  }

  return (
    <div className="min-h-screen relative bg-gray-100">
      {/* Background for visible border radius */}
      <div className="min-h-screen w-full bg-gray-100"></div>

      <div className="min-h-screen absolute inset-0 lg:grid lg:grid-cols-5">
        {/* Left Side - Image Section */}
        <div className="h-screen lg:col-span-2 relative">
          <div className="bg-[url(./src/assets/image_5.png)] h-full w-full bg-center bg-no-repeat bg-cover object-contain relative">
            {/* Logo in top right corner - now inside the background div with relative positioning */}
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

            {/* New text in bottom left corner */}
            <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 lg:bottom-8 lg:left-8 z-10">
              <span className="text-sm md:text-base lg:text-lg font-medium text-white drop-shadow-md">
                Tradeway
              </span>
            </div>
          </div>
        </div>

        {/* Right side - OTP Verification Form */}
        <div className="absolute bottom-0 lg:static lg:ml-[-0.5rem] w-full lg:col-span-3 flex lg:items-center justify-center p-4 z-10 bg-white rounded-t-2xl lg:rounded-none lg:rounded-l-2xl">
          <div className="w-full max-w-md">
            <div className="text-center mt-6 mb-6">
              <h1 className="text-2xl font-bold">Verify OTP</h1>
              <p className="text-black font-light">
                Enter the verification code sent to your email
              </p>
              <p className="text-black font-light">
                to complete the verification process.
              </p>
            </div>

            {message && (
              <div className="bg-green p-3 rounded-md">{message}</div>
            )}

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 mt-7"
              >
                <FormField
                  control={form.control}
                  name="otp"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="space-y-4 flex justify-center">
                          <InputOTP
                            maxLength={4}
                            value={field.value}
                            onChange={field.onChange}
                          >
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
                          </InputOTP>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {error && (
                  <div className="text-red-500 text-sm text-center">
                    {error}
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-1/2 ml-28 px-4 py-2 bg-blue-800 hover:bg-blue-600"
                  disabled={loading}
                >
                  {loading ? "Verifying..." : "Verify"}
                </Button>

                <div className="text-center text-sm mt-5 pr-1">
                  <span className="text-gray-500">Didn't receive code? </span>
                  <button
                    type="button"
                    className="text-xs text-blue-400"
                    onClick={() => resendOTP()}
                  >
                    {resending ? "Resending OTP" : "Resend verification otp"}
                  </button>

                  {/*<button 
                    type="button" 
                    className="text-xs text-blue-400"
                    onClick={handleResend}
                    disabled={resending}
                  >
                    {resending ? "Sending..." : "Resend verification code"}
                    </button> */}
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerifyOTP;
