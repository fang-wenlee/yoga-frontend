export async function apiFetch(url, options = {}) {
	const token = localStorage.getItem("token");

	const res = await fetch(url, {
		...options,
		headers: {
			...options.headers,
			Authorization: `Bearer ${token}`,
		},
	});

	// Auto‑logout on expired or invalid token
	if (res.status === 401) {
		localStorage.removeItem("token");
		window.location.href = "/admin/login";
		return;
	}

	return res;
}
