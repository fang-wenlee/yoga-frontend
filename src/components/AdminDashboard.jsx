import React from "react";

const styles = {
	wrapper: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		padding: "20px",
	},
	logoutButton: {
		padding: "10px 16px",
		background: "#444",
		color: "white",
		border: "none",
		borderRadius: "6px",
		cursor: "pointer",
	},
};

const AdminDashboard = () => {
	// retrieve user name from local storage
	const userName = localStorage.getItem("userName");

	const handleLogout = () => {
		// Clear token and user name from local storage and redirect to login page
		localStorage.removeItem("token");
		localStorage.removeItem("userName");
		window.location.href = "/admin/login";
	};
	return (
		<div style={styles.wrapper}>
			<h2>Admin Dashboard</h2>
			<p>
				Welcome to the Admin Dashboard <b>{userName}</b> !
			</p>

			<button onClick={handleLogout} style={styles.logoutButton}>
				Logout
			</button>
		</div>
	);
};

export default AdminDashboard;
