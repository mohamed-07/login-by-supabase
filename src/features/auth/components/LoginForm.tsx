import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginFormValues } from '../schemas/auth.schema';
import { useAuthStore } from '../store/authStore';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { FcGoogle } from 'react-icons/fc';
import { Separator } from '@/components/ui/separator';
// import { Eye, EyeOff } from 'lucide-react';

export default function LoginForm() {
  const signIn = useAuthStore((state) => state.signIn);
  const signInWithGoogle = useAuthStore((state) => state.signInWithGoogle);
  const navigate = useNavigate();
  // const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setServerError(null);
    const { error } = await signIn(data.email, data.password);
    if (error) {
      setServerError(error);
      return;
    }
    navigate('/dashboard');
  };
  return (
    <Card className="w-full max-w-sm mx-auto mt-20">
      <CardHeader>
        <CardTitle className="text-center">Sign In</CardTitle>
        <CardDescription className="text-center">
          Enter your email and password to login to your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Email"
              {...register('email')}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              className="cursor-pointer"//Stop here last time
              id="password"
              type="password"
              placeholder="Password"
              {...register('password')}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
          {/* Forgot Password link */}
          <div className="text-right">
            <Link to="/forgot-password" className="text-sm text-blue-500 hover:underline">
              Forgot Password?
            </Link>
          </div>
          {/* submission section */}
          {serverError && <p className="text-red-500 text-sm">{serverError}</p>}
          <Button
            className="cursor-pointer"
            type="submit"
            disabled={isSubmitting}
          >
            Sign In
          </Button>
        </form>
        {/* or sign in with */}
        <div className="flex items-center gap-2 mt-4">
          <Separator className="flex-1" />
          <span className="text-sm text-gray-500 whitespace-nowrap">
            Or sign in with
          </span>
          <Separator className="flex-1" />
        </div>

        <div className="flex justify-center mb-2">
          <FcGoogle
            size={30}
            className="bg-white rounded-full p-1 cursor-pointer mt-2"
            onClick={signInWithGoogle}
          />
        </div>
        <Separator className="flex-1" />
        <p className="mt-4 text-sm text-gray-600 text-center">
          Don't have an account?
          <Link to="/register" className="text-blue-500 ml-1">
            Register
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
