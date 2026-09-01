import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router';
import {
  updatePasswordSchema,
  type UpdatePasswordFormValues,
} from '../schemas/auth.schema';
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

export default function UpadatePasswordForm() {
  const updatepassword = useAuthStore((state) => state.updatePassword);
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UpdatePasswordFormValues>({
    resolver: zodResolver(updatePasswordSchema),
  });
  const onSubmit = async (data: UpdatePasswordFormValues) => {
    setServerError(null);
    setSuccessMessage(null);
    const { error } = await updatepassword(data.password);
    if (error) {
      setServerError(error);
    } else {
      setSuccessMessage('Password updated successfully!');
    }

    setTimeout(() => {
      navigate('/login');
    }, 2000);
  };

  return (
    <Card className="w-full max-w-sm mx-auto mt-20">
      <CardHeader>
        <CardTitle className="text-center">Update Password</CardTitle>

        <CardDescription className="text-center">
          Enter your new password below.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {/* New Password */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="password">New Password</Label>

            <Input
              id="password"
              type="password"
              placeholder="New password"
              {...register('password')}
            />

            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>

            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm password"
              {...register('confirmPassword')}
            />

            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Server Error */}
          {serverError && <p className="text-red-500 text-sm">{serverError}</p>}

          {/* Success */}
          {successMessage && (
            <p className="text-green-600 text-sm">{successMessage}</p>
          )}

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Updating...' : 'Update Password'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
