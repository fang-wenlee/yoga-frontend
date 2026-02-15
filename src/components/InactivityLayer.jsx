import { useEffect } from "react";

/* This component is a wrapper that can be used to automatically log out the user after a period of inactivity (e.g., 3 minutes). It listens for user interactions like mouse movements, key presses, and clicks to reset the timer. If the timer expires without any activity, it clears the authentication token and redirects the user to the login page.

• 	Watches for user activity
• 	Resets a 3‑minute timer every time the user interacts
• 	Logs out the user if they stop interacting
• 	Cleans up properly when unmounted

*/
export default function InactivityLayer({ children }) {
	useEffect(() => {
		let timeout;

		const resetTimer = () => {
			clearTimeout(timeout);
			timeout = setTimeout(
				() => {
					// Remove token
					localStorage.removeItem("token");
					// Redirect to login
					window.location.href = "/admin/login";
				},
				3 * 60 * 1000,
			); // 3 minutes inactivity
		};

		// Activity events
		window.addEventListener("mousemove", resetTimer);
		window.addEventListener("keydown", resetTimer);
		window.addEventListener("click", resetTimer);

		// Start timer on mount, As soon as the component loads, the inactivity countdown begins.
		resetTimer();

		// Cleanup on unmount
		return () => {
			window.removeEventListener("mousemove", resetTimer);
			window.removeEventListener("keydown", resetTimer);
			window.removeEventListener("click", resetTimer);
			clearTimeout(timeout);
		};
	}, []);
	//This effect runs once when the component loads because the dependency array is empty ().
	// It sets up event listeners for mouse movements, key presses, and clicks to reset the inactivity timer.
	// If the user is inactive for 3 minutes, it removes the token from local storage and redirects to the login page.
	// The cleanup function ensures that event listeners are removed when the component unmounts to prevent memory leaks.
	return <>{children}</>;
}
