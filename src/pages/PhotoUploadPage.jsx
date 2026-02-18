import { useState, useEffect } from "react";
import UploadForm from "../components/PhotoUploadForm";
import { apiFetch } from "../utils/apiFetch";
import GalleryHeader from "../components/GalleryHeader";
import { Link } from "react-router-dom";

export default function UploadPhoto() {
	const [status, setStatus] = useState("");

	useEffect(() => {
		// Check for token on component mount; Protect admin routes if no token found;
		if (!localStorage.getItem("token")) {
			window.location.href = "/admin/login";
		}
	}, []);

	const handleUpload = async (image, caption) => {
		setStatus("Uploading...");

		const formData = new FormData();
		formData.append("image", image);
		formData.append("caption", caption);

		try {
			// is calling from the rendered backend
			const res = await apiFetch(
				"https://yoga-backend-50i3.onrender.com/api/photos",
				{
					method: "POST",
					// headers: {
					// 	Authorization: `Bearer ${localStorage.getItem("token")}`,
					// },
					body: formData,
				},
			);

			if (!res) return; // already redirected on 401

			const data = await res.json();

			if (res.ok) {
				setStatus("Upload successful!redirecting to gallery...");

				// redirect to the gallery or clear the form
				window.location.href = "/admin/dashboard";
			} else {
				setStatus(data.error || "Upload failed");
			}
		} catch (err) {
			setStatus("Network error", err.message);
		}
	};

	return (
		<div>
			<GalleryHeader />
			<div style={{ maxWidth: "400px", margin: "auto", padding: "2rem" }}>
				<UploadForm onUpload={handleUpload} />
				<p>{status}</p>
			</div>
		</div>
	);
}
