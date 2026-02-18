import React from "react";

import { useNavigate } from "react-router-dom";

export default function GalleryHeader() {
	const navigate = useNavigate();
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "space-between",
				alignItems: "center",
				marginBottom: "24px",
			}}
		>
			<div>
				<h2 style={{ margin: 0 }}>Manage Fawn Gallery</h2>
				<p style={{ margin: "4px 0 0 0", color: "#666" }}>
					View and manage uploaded photos
				</p>
			</div>

			<div style={{ display: "flex", gap: "12px" }}>
				<button
					style={{
						padding: "8px 14px",
						borderRadius: "6px",
						border: "1px solid #ddd",
						background: "#f7f7f7",
						cursor: "pointer",
					}}
					onClick={() => (window.location.href = "/admin/dashboard")}
				>
					Dashboard
				</button>
				<button
					style={{
						padding: "8px 14px",
						borderRadius: "6px",
						border: "1px solid #ddd",
						background: "#fff",
						cursor: "pointer",
					}}
					onClick={() => navigate("/upload")}
				>
					Upload
				</button>
				<button
					style={{
						padding: "8px 14px",
						borderRadius: "6px",
						border: "1px solid #ddd",
						background: "#fff",
						cursor: "pointer",
					}}
					onClick={() => window.location.reload()}
				>
					Refresh
				</button>
			</div>
		</div>
	);
}
