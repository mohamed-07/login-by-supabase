import { create } from 'zustand';
import { supabase } from '../../../lib/supabaseClient';
import type { User, Session } from '@supabase/supabase-js';
import { toast } from '@/components/ui/toast';  

interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
  initialized: boolean;
  signIn: (
    email: string,
    password: string
  ) => Promise<{ error: string | null }>;
  signUp: (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: string | null }>;
  updatePassword: (password: string) => Promise<{ error: string | null }>;
  initAuth: () => void;
  signInWithGoogle: () => Promise<{ error: string | null }>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  loading: true,
  initialized: false,

  signIn: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) return { error: error.message };
    set({ user: data.user, session: data.session });
    return { error: null };
  },
  // SignIn with google
  signInWithGoogle: async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin + '/dashboard', // Redirect to dashboard after successful login
      },
    });
    if (error) return { error: error.message };
    return { error: null };
  },

  signUp: async (email, password, firstName, lastName) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { first_name: firstName, last_name: lastName } },
    });
    if (error) return { error: error.message };
    set({ user: data.user, session: data.session });
    return { error: null };
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.add({ type: 'error', description: 'Error signing out: ' + error.message });
      return;
    }
    set({ user: null, session: null });
    toast.add({
      type: 'success',
      title: 'Success',
      description: 'Logged out successfully',
      timeout: 800000,
    });
  },

  resetPassword: async (email) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + '/update-password', // Redirect to reset password page after successful request
    });
    return { error: error ? error.message : null };
  },

  updatePassword: async (password) => {
    const { error } = await supabase.auth.updateUser({
      password,
    });
    return { error: error ? error.message : null };
  },

  initAuth: () => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      set({
        session,
        user: session?.user ?? null,
        loading: false,
        initialized: true,
      });
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      set({ session, user: session?.user ?? null, loading: false });
    });
  },
}));
