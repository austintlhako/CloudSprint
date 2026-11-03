import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import DashboardPage from './pages/DashboardPage';
import QuizPage from './pages/QuizPage';
import FlashcardsPage from './pages/FlashcardsPage';
import PlannerPage from './pages/PlannerPage';
import CommunityPage from './pages/CommunityPage';
import ProfilePage from './pages/ProfilePage';
import FriendsPage from './pages/FriendsPage';
import SupportPage from './pages/SupportPage';
import ReviewsPage from './pages/ReviewsPage';
import DeveloperTestimonialsPage from './pages/DeveloperTestimonialsPage';
import LabsPage from './pages/LabsPage';
import InfoPage from './pages/InfoPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/labs" element={<LabsPage />} />
          <Route path="/flashcards" element={<FlashcardsPage />} />
          <Route path="/planner" element={<PlannerPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/developer/testimonials" element={<DeveloperTestimonialsPage />} />
          <Route path="/friends" element={<FriendsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/features" element={<InfoPage type="features" />} />
          <Route path="/about" element={<InfoPage type="about" />} />
          <Route path="/why-cloudsprint" element={<InfoPage type="why" />} />
          <Route path="/partner" element={<InfoPage type="partner" />} />
          <Route path="/resources" element={<InfoPage type="resources" />} />
          <Route path="/help" element={<InfoPage type="help" />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
