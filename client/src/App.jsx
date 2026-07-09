import { Routes, Route } from 'react-router-dom';

import ChallengesPage from './pages/ChallengesPage';
import CreateChallenge from './pages/CreateChallenge';
import EditChallenge from './pages/EditChallenge';

function App() {
  return (
    <Routes>
      <Route path="/" element={<ChallengesPage />} />
      <Route path="/create" element={<CreateChallenge />} />
      <Route path="/edit/:id" element={<EditChallenge />} />
    </Routes>
  );
}
export default App;