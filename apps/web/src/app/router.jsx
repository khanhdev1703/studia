import { createBrowserRouter } from 'react-router-dom';

import AppLayout from '../components/layout/AppLayout';
import AuthLayout from '../components/layout/AuthLayout';

import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import StudentHomePage from '../pages/student/StudentHomePage';
import TeacherHomePage from '../pages/teacher/TeacherHomePage';

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/register',
        element: <RegisterPage />,
      },
    ],
  },

  {
    element: <AppLayout />,
    children: [
      {
        path: '/student',
        element: <StudentHomePage />,
      },
      {
        path: '/teacher',
        element: <TeacherHomePage />,
      },
    ],
  },
]);