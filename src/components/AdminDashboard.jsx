import React from "react";

const styles = {
	wrapper: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		padding: "20px",
	},
};

const AdminDashboard = () => {
	// retrieve user name from local storage
	const userName = localStorage.getItem("userName");
	return (
		<div style={styles.wrapper}>
			<h2>Admin Dashboard</h2>
			<p>
				Welcome to the Admin Dashboard <b>{userName}</b> !
			</p>
		</div>
	);
};

export default AdminDashboard;
