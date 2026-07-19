import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Link,
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom';
import { signOut } from 'firebase/auth';
import Button from 'react-bootstrap/Button';

import ChallengesPage from './pages/ChallengesPage';
import CreateChallenge from './pages/CreateChallenge';
import EditChallenge from './pages/EditChallenge';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ProtectedRoute from './components/ProtectedRoute';
import SuccessToast from './components/SuccessToast';
import { useAuth } from './context/AuthContext';
import { auth } from './firebase';

function App() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { currentUser, loading } = useAuth();

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

  async function handleLogout() {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
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
        style={{
          zIndex: 1050,
        }}
      >
        {theme === 'light'
          ? `🌙 ${t('theme.dark')}`
          : `☀️ ${t('theme.light')}`}
      </Button>

      {!loading && (
        <div
          className="position-fixed top-0 end-0 m-3 d-flex align-items-center justify-content-end"
          style={{
            zIndex: 1050,
            maxWidth: '70%',
          }}
        >
          {currentUser ? (
            <div className="d-flex align-items-center gap-3">
              <span
                className="text-truncate"
                title={currentUser.email}
                style={{
                  maxWidth: '240px',
                  minWidth: 0,
                }}
              >
                {currentUser.email}
              </span>

              <Button
                type="button"
                variant="outline-danger"
                onClick={handleLogout}
                className="flex-shrink-0 text-nowrap"
              >
                {t('navigation.logout')}
              </Button>
            </div>
          ) : (
            <div className="d-flex align-items-center gap-2">
              <Button
                as={Link}
                to="/login"
                variant="outline-primary"
                className="text-nowrap"
              >
                {t('navigation.login')}
              </Button>

              <Button
                as={Link}
                to="/register"
                variant="primary"
                className="text-nowrap"
              >
                {t('navigation.register')}
              </Button>
            </div>
          )}
        </div>
      )}

      <SuccessToast
        show={toast.show}
        message={toast.message}
        onClose={closeToast}
      />

      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <ChallengesPage
                showSuccessToast={
                  showSuccessToast
                }
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <CreateChallenge
                showSuccessToast={
                  showSuccessToast
                }
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit/:id"
          element={
            <ProtectedRoute>
              <EditChallenge
                showSuccessToast={
                  showSuccessToast
                }
              />
            </ProtectedRoute>
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
          element={<ForgotPasswordPage />}
        />
      </Routes>
    </>
  );
}

export default App;