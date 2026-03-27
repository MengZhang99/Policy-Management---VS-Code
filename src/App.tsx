import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import UploadPolicy from "./pages/UploadPolicy";
import ReviewSuggestions from "./pages/ReviewSuggestions";
import ChangeTracking from "./pages/ChangeTracking";
import StakeholderReview from "./pages/StakeholderReview";
import PublishPolicy from "./pages/PublishPolicy";

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="upload" element={<UploadPolicy />} />
          <Route path="review" element={<ReviewSuggestions />} />
          <Route path="changes" element={<ChangeTracking />} />
          <Route path="stakeholders" element={<StakeholderReview />} />
          <Route path="publish" element={<PublishPolicy />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
