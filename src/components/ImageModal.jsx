/*

• 	dims the background
• 	centers the modal
• 	shows a large image
• 	shows metadata like Cloudinary
• 	closes when clicking outside


*/

function ImageModal({ image, onClose }) {
	if (!image) return null;

	return (
		<div
			style={{
				position: "fixed",
				top: 0,
				left: 0,
				width: "100vw",
				height: "100vh",
				background: "rgba(0,0,0,0.7)",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				zIndex: 9999,
				cursor: "pointer",
			}}
			onClick={onClose}
		>
			<div
				style={{
					position: "relative",
					background: "white",
					padding: "20px",
					borderRadius: "8px",
					maxWidth: "90%",
					maxHeight: "90%",
					display: "flex",
					gap: "20px",
					cursor: "default",
				}}
				onClick={(e) => e.stopPropagation()}
			>
				{/* ⭐ Close Button */}
				<button
					onClick={onClose}
					style={{
						position: "absolute",
						top: "10px",
						right: "10px",
						background: "rgba(0,0,0,0.6)",
						color: "white",
						border: "none",
						borderRadius: "50%",
						width: "36px",
						height: "36px",
						cursor: "pointer",

						display: "flex",
						justifyContent: "center",
						alignItems: "center",

						fontSize: "20px",
						padding: 0,
						lineHeight: 1,
					}}
				>
					×
				</button>

				<img
					src={image.secure_url}
					alt=""
					style={{
						maxWidth: "910px",
						maxHeight: "80vh",
						borderRadius: "6px",
						objectFit: "contain",
					}}
				/>

				<div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
					<h3>Image Details</h3>
					<p>
						<strong>ID:</strong> {image.public_id}
					</p>
					<p>
						<strong>Format:</strong> {image.format}
					</p>
					<p>
						<strong>Size:</strong> {(image.bytes / 1024).toFixed(1)} KB
					</p>
					<p>
						<strong>Created:</strong>{" "}
						{new Date(image.created_at).toLocaleString()}
					</p>
				</div>
			</div>
		</div>
	);
}

export default ImageModal;
