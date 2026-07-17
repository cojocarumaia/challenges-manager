import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Routes, Route } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

import ChallengesPage from './pages/ChallengesPage';
import CreateChallenge from './pages/CreateChallenge';
import EditChallenge from './pages/EditChallenge';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import SuccessToast from './components/SuccessToast';

function App() {
  const { t } = useTranslation();

  const [toast, setToast] = useState({
    show: false,
    message: '',
  });

  const [theme, setTheme] = useState(
    localStorage.getItem('theme') || 'light'
  );

  useEffect(() => {
    document.documentElement.setAttribute(
      'data-bs-theme',
      theme
    );

    localStorage.setItem('theme', theme);
  }, [theme]);

  function showSuccessToast(message) {
    setToast({
      show: true,
      message,
    });
  }

  function closeToast() {
    setToast({
      show: false,
      message: '',
    });
  }

  function toggleTheme() {
    setTheme((currentTheme) =>
      currentTheme === 'light'
        ? 'dark'
        : 'light'
    );
  }

  return (
    <>
      <Button
        type="button"
        variant={
          theme === 'light'
            ? 'outline-dark'
            : 'outline-light'
        }
        onClick={toggleTheme}
        className="position-fixed top-0 start-0 m-3"
        style={{ zIndex: 1050 }}
      >
        {theme === 'light'
          ? `🌙 ${t('theme.dark')}`
          : `☀️ ${t('theme.light')}`}
      </Button>

      <SuccessToast
        show={toast.show}
        message={toast.message}
        onClose={closeToast}
      />

      <Routes>
        <Route
          path="/"
          element={
            <ChallengesPage
              showSuccessToast={
                showSuccessToast
              }
            />
          }
        />

        <Route
          path="/create"
          element={
            <CreateChallenge
              showSuccessToast={
                showSuccessToast
              }
            />
          }
        />

        <Route
          path="/edit/:id"
          element={
            <EditChallenge
              showSuccessToast={
                showSuccessToast
              }
            />
          }
        />

        <Route
          path="/register"
          element={<RegisterPage />}
        />

        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/forgot-password"
          element={
            <ForgotPasswordPage />
          }
        />
      </Routes>
    </>
  );
}

export default App;