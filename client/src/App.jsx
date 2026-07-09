import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import ChallengesPage from './pages/ChallengesPage';
import CreateChallenge from './pages/CreateChallenge';
import EditChallenge from './pages/EditChallenge';
import SuccessToast from './components/SuccessToast';

function App() {
  const [toast, setToast] = useState({
    show: false,
    message: '',
  });

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

  return (
    <>
      <SuccessToast
        show={toast.show}
        message={toast.message}
        onClose={closeToast}
      />

      <Routes>
        <Route
          path="/"
          element={<ChallengesPage showSuccessToast={showSuccessToast} />}
        />
        <Route
          path="/create"
          element={<CreateChallenge showSuccessToast={showSuccessToast} />}
        />
        <Route
          path="/edit/:id"
          element={<EditChallenge showSuccessToast={showSuccessToast} />}
        />
      </Routes>
    </>
  );
}

export default App;