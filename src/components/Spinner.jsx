export default function Spinner({ size = 16, color = "white", border = 3 }) {
	return (
		<>
			<style>
				{`
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                `}
			</style>

			<span
				style={{
					width: `${size}px`,
					height: `${size}px`,
					border: `${border}px solid ${color}`,
					borderTop: `${border}px solid transparent`,
					borderRadius: "50%",
					animation: "spin 0.8s linear infinite",
					display: "inline-block",
				}}
			></span>
		</>
	);
}
