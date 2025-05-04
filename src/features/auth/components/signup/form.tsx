"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { InputField } from "@/components/ui/input";
import { signupUser } from "@/functions/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { SignupFormValue, signupSchema } from "../../schema";

export default function SignupForm() {
  const router = useRouter();

  const form = useForm<SignupFormValue>({
    mode: "onTouched",
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: SignupFormValue) {
    try {
      const user = await signupUser(data);
      console.log({ user });
      if (user) {
        // toast.success("Welcome! " + user.user_metadata.name + " 🥳");
        router.push("/");
      }
    } catch (error) {
      toast.error(error as string);
    }
  }
  return (
    <div className="w-full max-w-md">
      <div className="flex justify-center mb-8">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-gray-800">LightWork</span>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create an account
        </h2>

        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <InputField<SignupFormValue>
              control={form.control}
              label="Name"
              name="name"
              placeholder="Enter your name"
              disabled={false}
            />
            <InputField<SignupFormValue>
              control={form.control}
              label="Email"
              name="email"
              placeholder="Enter your email address"
              disabled={false}
            />
            <InputField<SignupFormValue>
              control={form.control}
              label="Passowrd"
              name="password"
              type="password"
              placeholder="Enter your account password"
              disabled={false}
            />

            <Button
              loading={form.formState.isSubmitting}
              className="w-full my-3"
              disabled={!form.formState.isValid}
            >
              Sign in
            </Button>
          </form>
        </Form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?
            <span className="text-blue-500/90 pl-2 hover:underline">
              <Link href="/login">Sign in</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
