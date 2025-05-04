"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { InputField } from "@/components/ui/input";
import { loginUser } from "@/functions/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { LoginFormValue, loginSchema } from "../../schema";

export default function LoginForm() {
  const router = useRouter();

  const form = useForm<LoginFormValue>({
    mode: "onTouched",
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginFormValue) {
    try {
      const user = await loginUser(data);

      if (user) {
        toast.success("Welcome back " + user.user_metadata.name + "!");
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
          Sign in to your account
        </h2>

        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <InputField<LoginFormValue>
              control={form.control}
              label="Email"
              name="email"
              placeholder="Enter your email address"
              disabled={false}
            />
            <InputField<LoginFormValue>
              control={form.control}
              label="Passowrd"
              name="password"
              type="password"
              placeholder="Enter your account password"
              disabled={false}
            />

            <Button
              loading={form.formState.isSubmitting}
              disabled={!form.formState.isValid}
              className="w-full my-3"
            >
              Sign in
            </Button>
          </form>
        </Form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            {"Don't"} have an account?
            <span className="text-blue-500/90 pl-2 hover:underline">
              <Link href="/signup">Sign up</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

// function AuthScreen({
//   onLogin,
//   onSignup,
// }: {
//   onLogin: (email: string, password: string) => void;
//   onSignup: (name: string, email: string, password: string) => void;
// }) {
//   const [isLogin, setIsLogin] = useState(true);
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = (e: FormEvent) => {
//     e.preventDefault();
//     if (isLogin) {
//       onLogin(email, password);
//     } else {
//       onSignup(name, email, password);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-gray-100 p-4">
//       <div className="w-full max-w-md">
//         <div className="flex justify-center mb-8">
//           <div className="flex items-center gap-2">
//             <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center">
//               <span className="text-white font-bold text-xl">L</span>
//             </div>
//             <span className="text-2xl font-bold text-gray-800">LightWork</span>
//           </div>
//         </div>

//         <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
//           <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
//             {isLogin ? "Sign in to your account" : "Create your account"}
//           </h2>

//           <form onSubmit={handleSubmit}>
//             {!isLogin && (
//               <div className="mb-4">
//                 <label
//                   htmlFor="name"
//                   className="block text-sm font-medium text-gray-700 mb-1"
//                 >
//                   Name
//                 </label>
//                 <input
//                   id="name"
//                   type="text"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   required={!isLogin}
//                 />
//               </div>
//             )}

//             <div className="mb-4">
//               <label
//                 htmlFor="email"
//                 className="block text-sm font-medium text-gray-700 mb-1"
//               >
//                 Email
//               </label>
//               <input
//                 id="email"
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//             </div>

//             <div className="mb-6">
//               <label
//                 htmlFor="password"
//                 className="block text-sm font-medium text-gray-700 mb-1"
//               >
//                 Password
//               </label>
//               <input
//                 id="password"
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//             </div>

//             <motion.button
//               type="submit"
//               className="w-full py-2 px-4 bg-black text-white rounded-lg font-medium"
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//             >
//               {isLogin ? "Sign In" : "Sign Up"}
//             </motion.button>
//           </form>

//           <div className="mt-6 text-center">
//             <p className="text-sm text-gray-600">
//               {isLogin
//                 ? "Don't have an account? "
//                 : "Already have an account? "}
//               <button
//                 onClick={() => setIsLogin(!isLogin)}
//                 className="text-blue-600 hover:underline font-medium"
//               >
//                 {isLogin ? "Sign up" : "Sign in"}
//               </button>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
