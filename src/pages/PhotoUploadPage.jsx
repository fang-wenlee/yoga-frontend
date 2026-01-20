import { useState, useEffect } from "react";
import UploadForm from "../components/PhotoUploadForm";
import { apiFetch } from "../utils/apiFetch";

export default function UploadPhoto() {
	const [status, setStatus] = useState("");

	useEffect(() => {
		//
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
			const res = await apiFetch(
				"https://yoga-backend-50i3.onrender.com/api/photos",
				{
					method: "POST",
					body: formData,
				},
			);

			if (!res) return; // already redirected on 401

			const data = await res.json();

			if (res.ok) {
				setStatus("Upload successful!");
			} else {
				setStatus(data.error || "Upload failed");
			}
		} catch (err) {
			setStatus("Network error");
		}
	};

	return (
		<div style={{ maxWidth: "400px", margin: "auto", padding: "2rem" }}>
			<h2>Upload a New Photo</h2>
			<UploadForm onUpload={handleUpload} />
			<p>{status}</p>
		</div>
	);
}
