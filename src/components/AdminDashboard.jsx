import React from "react";

const AdminDashboard = () => {
	const userName = localStorage.getItem("userName");
	return (
		<div>
			<h1>Admin Dashboard</h1>
			<p>Welcome to the Admin Dashboard {userName}!</p>
		</div>
	);
};

export default AdminDashboard;
