import { useState } from "react";

export default function AdminLogin() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	async function handleSubmit(e) {
		e.preventDefault();
		setError("");
		setLoading(true);

		try {
			const res = await fetch(
				"https://yoga-backend-50i3.onrender.com/auth/login",
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ email, password }),
				}
			);

			const data = await res.json();

			if (!res.ok) {
				setError(data.error || "Login failed");
				setLoading(false);
				return;
			}

			console.log("DATA RECEIVED:", data);

			// Save token
			localStorage.setItem("token", data.token);
			// Save user name, create a name field in backend
			localStorage.setItem("userName", data.user.name);

			// Redirect to admin dashboard (you can change this later)
			// alos need to create admin dashboard page and route
			window.location.href = "/admin/dashboard";
		} catch (err) {
			setError("Network error", err.message);
		} finally {
			setLoading(false);
		}
	}

	return (
		<div style={styles.wrapper}>
			<div style={styles.container}>
				<h2 style={styles.title}>Admin Login</h2>

				<form onSubmit={handleSubmit} style={styles.form}>
					<input
						type="email"
						placeholder="Admin Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						style={styles.input}
						required
					/>

					<input
						type="password"
						placeholder="Admin Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						style={styles.input}
						required
					/>

					{error && <p style={styles.error}>{error}</p>}

					<button type="submit" style={styles.button} disabled={loading}>
						{loading ? "Logging in..." : "Login"}
					</button>
				</form>
			</div>
		</div>
	);
}

const styles = {
	wrapper: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
		height: "100vh",
	},
	container: {
		maxWidth: "400px",
		margin: "60px auto",
		padding: "20px",
		borderRadius: "8px",
		border: "1px solid #ddd",
		background: "#fafafa",
	},
	title: {
		textAlign: "center",
		marginBottom: "20px",
	},
	form: {
		display: "flex",
		flexDirection: "column",
		gap: "12px",
	},
	input: {
		padding: "12px",
		fontSize: "16px",
		borderRadius: "6px",
		border: "1px solid #ccc",
	},
	button: {
		padding: "12px",
		fontSize: "16px",
		background: "#333",
		color: "white",
		border: "none",
		borderRadius: "6px",
		cursor: "pointer",
	},
	error: {
		color: "red",
		textAlign: "center",
	},
};
