import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import UploadPolicy from "./pages/UploadPolicy";
import ReviewSuggestions from "./pages/ReviewSuggestions";
import ChangeTracking from "./pages/ChangeTracking";
import StakeholderReview from "./pages/StakeholderReview";
import PublishPolicy from "./pages/PublishPolicy";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="upload" element={<UploadPolicy />} />
          <Route path="review" element={<ReviewSuggestions />} />
          <Route path="changes" element={<ChangeTracking />} />
          <Route path="stakeholders" element={<StakeholderReview />} />
          <Route path="publish" element={<PublishPolicy />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
