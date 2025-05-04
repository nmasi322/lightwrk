import SignupForm from "@/features/auth/components/signup/form";

export default function Signup() {
  return (
    <div className="bg-[url('/assets/bg.avif')] min-h-screen w-full bg-center bg-cover flex items-center justify-center">
      <SignupForm />
    </div>
  );
}
