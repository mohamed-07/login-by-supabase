import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { forgotPasswordSchema, type ForgotPasswordFormValues } from '../schemas/auth.schema';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function ForgotPasswordForm() {
    const resetPassword = useAuthStore((state) => state.resetPassword);
    const [serverError, setServerError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ForgotPasswordFormValues>({
        resolver: zodResolver(forgotPasswordSchema),
    });

    const onSubmit = async (data: ForgotPasswordFormValues) => {
        setServerError(null);
        setSuccessMessage(null);
        const { error } = await resetPassword(data.email);
        if (error) {
            setServerError(error);
        } else {
            setSuccessMessage('Password reset link sent to your email.');
        }
    }

  return (
    <Card className="w-full max-w-sm mx-auto mt-20">
      <CardHeader>
        <CardTitle className="text-center">Update Password</CardTitle>
        <CardDescription>
          Enter your email address and we'll send you a link to reset your
          password.
        </CardDescription>
      </CardHeader> 
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="email@example.com"
              {...register('email')}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>
          {serverError && (
            <p className="text-sm text-destructive">{serverError}</p>
          )}
          {successMessage && (
            <p className="text-sm text-green-500">{successMessage}</p>
          )}
          <Button type="submit" disabled={isSubmitting} className="cursor-pointer">
            {isSubmitting ? 'Sending...' : 'Send Reset Link'}
          </Button>
        </form>
        <div className="mt-4 text-center">
          <Link to="/login" className="text-sm text-blue-500 hover:underline">
            Back to Login
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

