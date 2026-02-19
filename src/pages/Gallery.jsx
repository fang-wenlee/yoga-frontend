import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ImageCard from "../components/ImageCard";
import ImageModal from "../components/ImageModal";
import GalleryHeader from "../components/GalleryHeader";

/*
    This page is for admin users to view and manage the gallery photos.
*/
export default function Gallery() {
	const [selectedImage, setSelectedImage] = useState(null);
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

	useEffect(() => {
		function handleEsc(e) {
			if (e.key === "Escape") {
				setActiveMenuId(null);
				setSelectedImage(null); // ⭐ close image modal
			}
		}

		window.addEventListener("keydown", handleEsc);
		return () => window.removeEventListener("keydown", handleEsc);
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
			<GalleryHeader />

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
						<ImageCard
							key={photo.public_id}
							photo={photo}
							isMenuOpen={activeMenuId === photo.public_id}
							onOpenMenu={(id) => setActiveMenuId(id)}
							onCloseMenu={() => setActiveMenuId(null)}
							onDelete={handleDelete}
							onSelect={() => setSelectedImage(photo)}
						/>
					))}
				</div>
			)}

			{/* ⭐ Image Modal goes here — OUTSIDE the grid, but INSIDE the page */}
			<ImageModal
				image={selectedImage}
				onClose={() => setSelectedImage(null)}
			/>
		</div>
	);
}
