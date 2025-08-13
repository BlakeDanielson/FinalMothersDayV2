"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

export default function GlobalError({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		Sentry.captureException(error);
	}, [error]);

	return (
		<html>
			<body>
				<div className="min-h-screen flex items-center justify-center p-6">
					<div className="max-w-md text-center">
						<h2 className="text-xl font-semibold mb-2">Something went wrong</h2>
						<p className="text-sm text-gray-600 mb-4">
							{process.env.NODE_ENV === "development" ? error.message : "An unexpected error occurred."}
						</p>
						<button
							onClick={() => reset()}
							className="inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium hover:bg-gray-100"
						>
							Try again
						</button>
					</div>
				</div>
			</body>
		</html>
	);
}


