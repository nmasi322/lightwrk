import LoginForm from "@/features/auth/components/login/form";

export default function Login() {
  return (
    <div className="bg-[url('/assets/bg.avif')] min-h-screen w-full bg-center bg-cover flex items-center justify-center">
      <LoginForm />
    </div>
  );
}
