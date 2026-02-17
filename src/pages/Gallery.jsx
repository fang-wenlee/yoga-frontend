import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
/*
    This page is for admin users to view and manage the gallery photos.
*/
export default function Gallery() {
	const [photos, setPhotos] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchPhotos() {
			try {
				const res = await fetch("http://localhost:5000/api/photos/cloudinary");
				const data = await res.json();
				setPhotos(data);
			} catch (err) {
				console.error("Error fetching photos:", err);
			} finally {
				setLoading(false);
			}
		}

		fetchPhotos();
	}, []);

	const handleDelete = async (public_id) => {
		console.log("Attempting to delete:", public_id);
		const confirmDelete = window.confirm("Delete this photo?");
		if (!confirmDelete) return;

		try {
			const res = await fetch(
				`http://localhost:5000/api/photos/cloudinary/${public_id}`,
				{
					method: "DELETE",
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				},
			);

			const data = await res.json();

			if (res.ok) {
				// Remove from UI instantly
				setPhotos((prev) => prev.filter((p) => p.public_id !== public_id));
			} else {
				alert(data.error || "Delete failed");
			}
		} catch (err) {
			alert("Network error", err);
		}
	};

	return (
		<div style={{ padding: "24px" }}>
			{/* Header Bar */}
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					marginBottom: "24px",
				}}
			>
				<div>
					<h2 style={{ margin: 0 }}>Manage Gallery</h2>
					<p style={{ margin: "4px 0 0 0", color: "#666" }}>
						View and manage uploaded yoga photos
					</p>
				</div>

				{/* Future toolbar buttons */}
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
						Back to Dashboard
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

			{/* Loading State */}
			{loading && <div>Loading gallery...</div>}

			{/* Empty State */}
			{!loading && photos.length === 0 && <div>No photos found.</div>}

			{/* Photo Grid */}
			{!loading && photos.length > 0 && (
				<div
					style={{
						display: "grid",
						gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
						gap: "20px",
					}}
				>
					{photos.map((photo) => (
						<div
							key={photo.public_id}
							style={{
								borderRadius: "10px",
								overflow: "hidden",
								boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
							}}
						>
							<img
								src={photo.secure_url}
								alt=""
								style={{ width: "100%", height: "auto", display: "block" }}
							/>
							<button
								style={{
									// position: "absolute",
									top: "8px",
									right: "8px",
									background: "rgba(255,255,255,0.8)",
									border: "none",
									borderRadius: "50%",
									padding: "6px",
									cursor: "pointer",
								}}
								onClick={() => handleDelete(photo.public_id)}
							>
								🗑️
							</button>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
