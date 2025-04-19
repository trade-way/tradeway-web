import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate, Link } from "react-router-dom";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import authService from "@/services/api/authService";
import Cookies from "js-cookie";

function Signup() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

  const formSchema = z
    .object({
      name: z.string().min(2, "name must be at least 2 characters"),
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
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

  // Important: Ensure all default values are set explicitly to avoid controlled/uncontrolled input errors
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rememberMe: false,
    },
    mode: "onChange", // Add this to validate on change
  });

  // Async function to handle signup form submission
  async function onSubmit(values) {
    // Log the submitted form values for debugging
    console.log("Form Values:", values);

    // Set loading state to true before making the API call
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    // Prepare the data to send to the backend
    const signupData = {
      name: values.name,
      email: values.email,
      account_type: "BUYER", // Keep this as per your logic
      password: values.password,
    };

    console.log("Signup Request Payload:", signupData);

    try {
      const response = await authService.register(signupData);
      setSuccessMessage(response.message || "Registration successful!");
      setLoading(false);

      // store email the user signed up with in the cookie for resending purposes
      Cookies.set("email", values.email);

      // Short delay before navigation to allow the user to see the success message
      setTimeout(() => {
        navigate("/verify-otp");
      }, 1500);
    } catch (e) {
      setLoading(false);
      console.error(e);
      if (e.response?.data?.details?.[0]?.password) {
        setError(e.response.data.details[0].password);
      } else {
        setError(e.response?.data?.message || "Registration failed. Please try again.");
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <div className="flex flex-col md:flex-row w-full">
        {/* Left Side - Image Section */}
        <div className="w-full md:w-1/2 lg:w-2/5 xl:w-1/2 relative">
          <div className="bg-[url('/src/assets/image_2.png')] h-64 md:h-screen w-full bg-center bg-no-repeat bg-cover object-contain relative">
            {/* Logo in top left corner */}
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10 flex items-center">
              <img
                src="/src/assets/logo.png"
                alt="Company Logo"
                className="w-auto h-8 sm:h-10"
              />
              
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
        <div className="w-full md:w-1/2 lg:w-3/5 xl:w-1/2 ">
          <div className="w-full md:h-screen overflow-y-auto flex items-center justify-center">
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

              {successMessage && (
                <div className="bg-green-100 text-green-700 p-3 rounded-md mb-4">
                  {successMessage}
                </div>
              )}

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your name"
                            type="text"
                            className="placeholder:leading-[1.15] placeholder:text-base"
                            {...field}
                            value={field.value || ""}
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
                            value={field.value || ""}
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
                            value={field.value || ""}
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
                            value={field.value || ""}
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
                              checked={field.value || false}
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
                    <span className="mx-4 text-black-500">
                      or Register with
                    </span>
                    <div className="flex-grow border-t border-black"></div>
                  </div>

                  <Button
                    type="button"
                    className="w-full h-10 bg-white text-black hover:bg-gray-100 border border-gray-300 flex items-center justify-center px-0.2"
                  >
                    <img
                      src="/src/assets/login_btn.png"
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