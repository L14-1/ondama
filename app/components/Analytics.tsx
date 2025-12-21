"use client";

import { useEffect } from "react";

export default function Analytics() {
	useEffect(() => {
		// Only run on client side
		if (typeof window !== "undefined") {
			import("@plausible-analytics/tracker").then(({ init }) => {
				init({
					domain: "ondama.fr",
					endpoint: "https://analytics.nicolasmaitre.dev/api/event",
				});
			});
		}
	}, []);

	return null;
}
