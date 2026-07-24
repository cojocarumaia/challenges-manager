
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
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Navbar from 'react-bootstrap/Navbar';

import ChallengesPage from './pages/ChallengesPage';
import CreateChallenge from './pages/CreateChallenge';
import EditChallenge from './pages/EditChallenge';
import ChallengeDetailsPage from './pages/ChallengeDetailsPage';
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

  const isLocal =
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1';

  const versionLabel = `v${__APP_VERSION__}${isLocal ? ' · local' : ''
    }`;

  const { currentUser, loading } = useAuth();

  const [showLogoutModal, setShowLogoutModal] =
    useState(false);

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

  function openLogoutModal() {
    setShowLogoutModal(true);
  }

  function closeLogoutModal() {
    setShowLogoutModal(false);
  }

  async function handleLogout() {
    try {
      await signOut(auth);
      closeLogoutModal();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }

  return (
    <>
      <Navbar
        expand="md"
        bg={theme}
        data-bs-theme={theme}
        className="shadow-sm"
      >
        <Container>
          <Navbar.Brand
            as={Link}
            to="/"
            className="d-flex align-items-center gap-2"
          >
            <span>Challenges Manager</span>

            <span className="small text-body-secondary ms-2">
              {versionLabel}
            </span>
          </Navbar.Brand>

          <div className="d-flex align-items-center gap-2 ms-auto">
            <Button
              type="button"
              variant={
                theme === 'light'
                  ? 'outline-dark'
                  : 'outline-light'
              }
              onClick={toggleTheme}
              className="text-nowrap"
            >
              {theme === 'light'
                ? `🌙 ${t('theme.dark')}`
                : `☀️ ${t('theme.light')}`}
            </Button>

            {!loading && currentUser && (
              <>
                <span
                  className="d-none d-sm-inline text-truncate"
                  title={currentUser.email}
                  style={{
                    maxWidth: '220px',
                  }}
                >
                  {currentUser.email}
                </span>

                <Button
                  type="button"
                  variant="outline-danger"
                  onClick={openLogoutModal}
                  className="text-nowrap"
                >
                  {t('navigation.logout')}
                </Button>
              </>
            )}
          </div>
        </Container>
      </Navbar>

      <Modal
        show={showLogoutModal}
        onHide={closeLogoutModal}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {t('logoutModal.title')}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {t('logoutModal.message')}
        </Modal.Body>

        <Modal.Footer>
          <Button
            type="button"
            variant="secondary"
            onClick={closeLogoutModal}
          >
            {t('logoutModal.cancel')}
          </Button>

          <Button
            type="button"
            variant="danger"
            onClick={handleLogout}
          >
            {t('logoutModal.confirm')}
          </Button>
        </Modal.Footer>
      </Modal>

      <SuccessToast
        show={toast.show}
        message={toast.message}
        onClose={closeToast}
      />

      <Routes>
        <Route
          path="/challenges/:id"
          element={
            <ProtectedRoute>
              <ChallengeDetailsPage />
            </ProtectedRoute>
          }
        />

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