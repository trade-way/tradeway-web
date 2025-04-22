import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "@/components/ui/checkbox";
import { Link, useNavigate } from "react-router-dom";
import logo from "@/assets/logo.png"
import google from "@/assets/google.png"

// import { jwtDecode } from "jwt-decode";
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
import { GoogleLogin } from "@react-oauth/google";

function Signup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null); // State for success message

  // Form validation schema
  const formSchema = z
    .object({
      name: z.string().min(1, "Name is required"),
      email: z
        .string()
        .email("Please enter a valid email address")
        .min(1, "Email is required"),
      password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[0-9]/, "Password must contain at least one number"),
      confirmPassword: z.string().min(1, "Please confirm your password"),
      agreeToTerms: z.boolean().refine((val) => val === true, {
        message: "You must agree to the terms and conditions",
      }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

  // Configure form with zod resolver
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "", // Initialize confirmPassword
      agreeToTerms: false, // Initialize agreeToTerms
    },
  });

  // Handle form submission
  async function onSubmit(values) {
    // Log the submitted form values for debugging
    console.log("Form Values:", values);

    // Set loading state to true before making the API call
    setLoading(true);
    setError(null);
    setSuccessMessage(null); // Clear any previous success message

    try {
      // Prepare the data to send to the backend
      const signupData = {
        name: values.name,
        email: values.email,
        account_type: "BUYER", // Keep this as per your logic
        password: values.password,
      };

      console.log("Signup Request Payload:", signupData);

      const response = await authService.register(signupData);
      setSuccessMessage(response?.message || "Registration successful!");
      form.reset(); // Reset the form on successful signup
      // Optionally navigate the user after a short delay
      setTimeout(() => {
        navigate("/login"); // Or wherever you want to redirect
      }, 1500);
    } catch (err) {
      console.error("Signup failed:", err);
      setError(err.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  // Handle Google Sign-In Success
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      setLoading(true);
      setError(null);
      setSuccessMessage(null);

      // Decode the Google credential
      // const decodedToken = jwtDecode(credentialResponse.credential);
      console.log("Google Credential Response:", credentialResponse);

      const response = await authService.googleLogin({
        access_token: credentialResponse.credential,
      });

      console.log("Google Login Response:", response);
      localStorage.setItem("token", response.token); // Assuming your backend returns a token
      navigate("/");
    } catch (err) {
      console.error("Google Signup failed:", err);
      setError(
        err.response?.data?.message || "Google Signup failed. Please try again."
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
    <div className="min-h-screen flex">
      {/* Left Side - Static Image Section */}
      <div
        className="bg-[url(/src/assets/image_2.png)] hidden lg:block lg:w-2/5 bg-cover bg-center bg-no-repeat fixed left-0 top-0 h-full"
       
      >
        {/* Logo in top left corner */}
        <div className="absolute top-8 left-8 flex items-center">
          <img
            src={logo}
            alt="Company Logo"
            className="w-auto h-10"
          />
        </div>

        {/* Text in bottom left corner */}
        <div className="absolute bottom-8 left-8">
          <span className="text-lg font-medium text-white drop-shadow-md">
            Tradeway
          </span>
        </div>
      </div>

      {/* Right side - Signup Form */}
      <div className="w-full lg:w-3/5 lg:ml-auto flex items-center justify-center p-4 bg-white">
        <div className="w-full max-w-md py-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold">Create an account</h1>
            <p className="text-gray-500 font-normal">
              Sign up to get started with your shopping journey.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-center">
              {error}
            </div>
          )}

          {/* Success Message */}
          {successMessage && (
            <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md text-center">
              {successMessage}
            </div>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
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
                    <FormLabel>Confirm Password</FormLabel>
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
                name="agreeToTerms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 ">
                      <FormLabel className="">
                        I agree to the Terms & Conditions
                        {/* <Link to="/terms" className="text-blue-500 hover:underline">
                          Terms and
                        </Link>{" "}
                        and{" "}
                        <Link to="/privacy" className="text-blue-500 hover:underline">
                          Privacy Policy
                        </Link> */}
                      </FormLabel>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-[#022EB7] hover:bg-blue-600"
              >
                {loading ? "Creating account..." : "Sign Up"}
              </Button>
            </form>
          </Form>

          {/* Divider */}
          <div className="relative flex items-center justify-center my-6">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink mx-4 text-gray-500 text-sm">
              Or Register with
            </span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {/* Google Signup Button */}
          <div className="mb-6">
            <div className="text-center mb-2">
              <p className="text-sm text-gray-600">
                Sign up quickly with your Google account
              </p>
            </div>
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
            {/* <div className="w-full flex justify-center custom-overlay">
              <button
                className="flex items-center justify-center gap-3 py-2 px-30 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                type="button"
              >
                <img
                  src="/public/images/google.png"
                  alt="Custom Google icon"
                  className="w-5 h-5"
                />
                <span>Continue with Google</span>
              </button>
            </div> */}
          </div>

          {/* <div className="w-full flex justify-center">
            <button
              onClick={() => customGoogleLogin()}
              className="flex items-center justify-center gap-3 bg-white py-2 px-30 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              type="button"
            >
              <img
                src="/public/images/google.png"
                alt="Custom Google icon"
                className="w-5 h-5"
              />
              <span>Continue with Google</span>
            </button>
          </div> */}

          <div className="text-center text-sm mt-6">
            <span className="text-gray-500">Already have an account? </span>
            <Link to="/login" className="text-blue-600 hover:underline">
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;