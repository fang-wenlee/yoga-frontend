import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import InactivityLayer from "../components/InactivityLayer";

const styles = {
	container: {
		padding: "40px",
		minHeight: "100vh",
		backgroundColor: "#f7f7f7",
		fontFamily: "sans-serif",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	topBar: {
		width: "100%",
		marginBottom: "20px",
	},
	backButton: {
		textDecoration: "none",
		color: "#444",
		fontSize: "16px",
	},
	card: {
		backgroundColor: "white",
		padding: "30px",
		borderRadius: "12px",
		boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
		width: "100%",
		maxWidth: "450px",
	},
	title: {
		marginBottom: "20px",
		textAlign: "center",
		color: "#333",
		fontSize: "24px",
	},
	form: {
		display: "flex",
		flexDirection: "column",
		gap: "15px",
	},
	label: {
		fontSize: "14px",
		color: "#555",
	},
	input: {
		padding: "10px",
		borderRadius: "6px",
		border: "1px solid #ccc",
	},
	textInput: {
		padding: "10px",
		borderRadius: "6px",
		border: "1px solid #ccc",
	},

	// 🔥 This is the button that now matches the dashboard style
	primaryButton: {
		padding: "12px",
		backgroundColor: "#4CAF50", // same green family as dashboard cards
		color: "white",
		border: "none",
		borderRadius: "6px",
		cursor: "pointer",
		fontSize: "16px",
		fontWeight: "bold",
		transition: "background-color 0.2s ease",
	},
};
export default function UploadForm({ onUpload }) {
	const [image, setImage] = useState(null);
	const [caption, setCaption] = useState("");

	// Check for token on component mount; Protect admin routes if no token found;
	useEffect(() => {
		//
		if (!localStorage.getItem("token")) {
			window.location.href = "/admin/login";
		}
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!image) return;

		onUpload(image, caption);
	};

	return (
		<InactivityLayer>
			<div style={styles.container}>
				{/* Back to Dashboard */}
				<div style={styles.topBar}>
					<Link to="/admin/dashboard" style={styles.backButton}>
						← Back to Dashboard
					</Link>
				</div>

				{/* Upload Card */}
				<div style={styles.card}>
					<h2 style={styles.title}>Upload a New Yoga Photo</h2>

					<form onSubmit={handleSubmit} style={styles.form}>
						<label style={styles.label}>Select Image</label>
						<input
							type="file"
							accept="image/*"
							onChange={(e) => setImage(e.target.files[0])}
							style={styles.input}
						/>

						<label style={styles.label}>Caption (optional)</label>
						<input
							type="text"
							placeholder="Write a short caption..."
							value={caption}
							onChange={(e) => setCaption(e.target.value)}
							style={styles.textInput}
						/>

						<button type="submit" style={styles.primaryButton}>
							Upload Photo
						</button>
					</form>
				</div>
			</div>
		</InactivityLayer>
	);
}
