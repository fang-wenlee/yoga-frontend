/* 

- Shows the image
- Shows the circular three‑dot button
- Shows the popup menu
- Calls onDelete(photo.public_id)
- Calls onOpenMenu(photo.public_id)
- Calls onCloseMenu()

*/

import React from "react";

export default function ImageCard({
	photo,
	isMenuOpen,
	onOpenMenu,
	onCloseMenu,
	onDelete,
}) {
	return (
		<div
			style={{
				position: "relative",
				borderRadius: "10px",
				overflow: "hidden",
				boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
			}}
			onClick={(e) => e.stopPropagation()}
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
						isMenuOpen ? onCloseMenu() : onOpenMenu(photo.public_id);
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

				{isMenuOpen && (
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
								onDelete(photo.public_id);
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
	);
}
