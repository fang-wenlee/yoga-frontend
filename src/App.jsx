import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
import PhotoUpload from "./pages/PhotoUploadPage";
import Gallery from "./pages/Gallery";
import InactivityLayer from "./components/InactivityLayer";

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/admin/login" element={<AdminLogin />} />

				<Route
					path="/admin/dashboard"
					element={
						<InactivityLayer>
							<AdminDashboard />
						</InactivityLayer>
					}
				/>

				<Route
					path="/upload"
					element={
						<InactivityLayer>
							<PhotoUpload />
						</InactivityLayer>
					}
				/>

				<Route
					path="/gallery"
					element={
						<InactivityLayer>
							<Gallery />
						</InactivityLayer>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
}
