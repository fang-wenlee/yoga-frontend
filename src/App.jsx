import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
import PhotoUpload from "./pages/PhotoUploadPage";
import Gallery from "./pages/Gallery";

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/admin/login" element={<AdminLogin />} />
				<Route path="/admin/dashboard" element={<AdminDashboard />} />
				<Route path="/upload" element={<PhotoUpload />} />
				<Route path="/gallery" element={<Gallery />} />
			</Routes>
		</BrowserRouter>
	);
}
