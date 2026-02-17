import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

/*
    This page is for admin users to view and manage the gallery photos.
*/
export default function Gallery() {
	const [photos, setPhotos] = useState([]);
	const [loading, setLoading] = useState(true);
	const [activeMenuId, setActiveMenuId] = useState(null); // which photo's menu is open

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
		console.log("Delete clicked for:", public_id);
		const confirmDelete = window.confirm("Delete this photo?");
		if (!confirmDelete) return;

		try {
			const res = await fetch(
				`http://localhost:5000/api/photos/cloudinary/${encodeURIComponent(
					public_id,
				)}`,
				{
					method: "DELETE",
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				},
			);

			const data = await res.json();

			if (res.ok) {
				setPhotos((prev) => prev.filter((p) => p.public_id !== public_id));
				setActiveMenuId(null);
			} else {
				alert(data.error || "Delete failed");
			}
		} catch (err) {
			console.error("Network error:", err);
			alert("Network error");
		}
	};

	return (
		<div
			style={{ padding: "24px" }}
			onClick={() => setActiveMenuId(null)} // click on background closes any menu
		>
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
					onClick={(e) => e.stopPropagation()} // don't close menu when clicking inside grid container
				>
					{photos.map((photo) => (
						<div
							key={photo.public_id}
							style={{
								position: "relative",
								borderRadius: "10px",
								overflow: "hidden",
								boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
							}}
							onClick={(e) => e.stopPropagation()} // keep clicks local to card
						>
							<img
								src={photo.secure_url}
								alt=""
								style={{ width: "100%", height: "auto", display: "block" }}
							/>

							{/* Three-dot circular menu button */}
							<div style={{ position: "absolute", top: "8px", right: "8px" }}>
								<button
									onClick={(e) => {
										e.stopPropagation();
										setActiveMenuId((prev) =>
											prev === photo.public_id ? null : photo.public_id,
										);
									}}
									style={{
										background: "rgba(0,0,0,0.55)",
										color: "white",
										border: "none",
										borderRadius: "50%",
										width: "32px",
										height: "32px",
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										cursor: "pointer",
										fontSize: "18px",
										backdropFilter: "blur(4px)",
									}}
								>
									⋮
								</button>

								{activeMenuId === photo.public_id && (
									<div
										onClick={(e) => e.stopPropagation()}
										style={{
											position: "absolute",
											top: "36px",
											right: 0,
											background: "white",
											borderRadius: "6px",
											boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
											padding: "6px 0",
											minWidth: "140px",
											zIndex: 20,
										}}
									>
										<button
											onClick={(e) => {
												e.stopPropagation();
												handleDelete(photo.public_id);
											}}
											style={{
												width: "100%",
												padding: "10px 14px",
												display: "flex",
												alignItems: "center",
												gap: "10px",
												background: "none",
												border: "none",
												cursor: "pointer",
												fontSize: "14px",
												color: "#d9534f",
											}}
										>
											<span style={{ fontSize: "16px" }}>🗑️</span>
											<span>Delete</span>
										</button>
									</div>
								)}
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
