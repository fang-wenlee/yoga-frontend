import { useState } from "react";

const styles = {
	formStyle: {
		display: "flex",
		flexDirection: "column",
		gap: "1rem",
	},
};
export default function UploadForm({ onUpload }) {
	const [image, setImage] = useState(null);
	const [caption, setCaption] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!image) return;
		onUpload(image, caption);
	};

	return (
		<form onSubmit={handleSubmit} style={styles.formStyle}>
			<input
				type="file"
				accept="image/*"
				onChange={(e) => setImage(e.target.files[0])}
			/>

			<input
				type="text"
				placeholder="Optional caption"
				value={caption}
				onChange={(e) => setCaption(e.target.value)}
			/>

			<button type="submit">Upload Photo</button>
		</form>
	);
}
