import RegisterForm from '../components/RegisterForm';
import { Link } from 'react-router-dom';
export default function RegisterPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <RegisterForm />
      <p className="mt-4 text-sm text-gray-600">
        Already have an account?
        <Link to="/login" className="text-blue-500 ml-1">
          Login
        </Link>
      </p>
    </div>
  );
}
