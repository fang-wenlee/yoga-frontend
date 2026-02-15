import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InactivityLayer from "../components/InactivityLayer";

const styles = {
	container: {
		padding: "40px",
		minHeight: "100vh",
		backgroundColor: "#f7f7f7",
		fontFamily: "sans-serif",
	},
	header: {
		marginBottom: "30px",
		textAlign: "center",
	},
	title: {
		margin: 0,
		fontSize: "28px",
		color: "#333",
	},
	subtitle: {
		marginTop: "10px",
		fontSize: "16px",
		color: "#555",
	},
	grid: {
		display: "grid",
		gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
		gap: "20px",
		marginTop: "20px",
	},
	card: {
		backgroundColor: "white",
		padding: "25px",
		borderRadius: "12px",
		boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
		cursor: "pointer",
		transition: "transform 0.2s ease, boxShadow 0.2s ease",
	},
	cardTitle: {
		margin: "0 0 10px 0",
		fontSize: "20px",
		color: "#444",
	},
	cardText: {
		margin: 0,
		fontSize: "14px",
		color: "#666",
	},
	logoutButton: {
		marginTop: "40px",
		padding: "12px 20px",
		backgroundColor: "#d9534f",
		color: "white",
		border: "none",
		borderRadius: "6px",
		cursor: "pointer",
		display: "block",
		marginLeft: "auto",
		marginRight: "auto",
		fontSize: "16px",
	},
};
const AdminDashboard = () => {
	// Check for token on component mount; Protect admin routes if no token found;
	useEffect(() => {
		//
		if (!localStorage.getItem("token")) {
			window.location.href = "/admin/login";
		}
	}, []);
	// retrieve user name from local storage
	const userName = localStorage.getItem("userName");
	const navigate = useNavigate();

	const handleLogout = () => {
		// Clear token and user name from local storage and redirect to login page
		localStorage.removeItem("token");
		localStorage.removeItem("userName");
		window.location.href = "/admin/login";
	};
	return (
		<InactivityLayer>
			<div style={styles.container}>
				<div style={styles.header}>
					<h2 style={styles.title}>Admin Dashboard</h2>
					<p style={styles.subtitle}>
						Welcome back, <b>{userName}</b>
					</p>
				</div>

				<div style={styles.grid}>
					{/* Upload Card */}
					<div style={styles.card} onClick={() => navigate("/upload")}>
						<h3 style={styles.cardTitle}>📸 Upload New Image</h3>
						<p style={styles.cardText}>Add a new yoga photo to your gallery</p>
					</div>

					{/* Future card example */}
					<div style={styles.card} onClick={() => navigate("/gallery-admin")}>
						<h3 style={styles.cardTitle}>🖼️ Manage Gallery</h3>
						<p style={styles.cardText}>Edit or delete existing photos</p>
					</div>
				</div>

				<button onClick={handleLogout} style={styles.logoutButton}>
					Logout
				</button>
			</div>
		</InactivityLayer>
	);
};

export default AdminDashboard;
