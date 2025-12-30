"use client";

import { motion } from "framer-motion";
import { FormEvent, useState } from "react";

interface ContactFormProps {
	onSuccess?: () => void;
}

export default function ContactForm({ onSuccess }: ContactFormProps) {
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState(false);

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setError("");
		setSuccess(false);
		setIsLoading(true);

		try {
			const response = await fetch(
				process.env.NEXT_PUBLIC_MAILER_URL ||
					"https://mailer.ondama.fr" + "/api/mail/send",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						"X-API-Key": process.env.NEXT_PUBLIC_MAILER_API_KEY || "",
					},
					body: JSON.stringify({
						mail: email,
						message: message,
					}),
				},
			);

			if (!response.ok) {
				throw new Error("Erreur lors de l'envoi du message");
			}

			setSuccess(true);
			setEmail("");
			setMessage("");

			if (onSuccess) {
				setTimeout(() => {
					onSuccess();
				}, 2000);
			}
		} catch (err) {
			setError(
				err instanceof Error
					? err.message
					: "Une erreur est survenue. Veuillez réessayer.",
			);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="flex w-full flex-col gap-6">
			{/* Email Input */}
			<div className="flex w-full flex-col gap-2">
				<label
					htmlFor="email"
					className="text-sm font-medium text-foreground/80"
				>
					Email <span className="text-primary">*</span>
				</label>
				<input
					type="email"
					id="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
					disabled={isLoading}
					className="w-full rounded-xl border border-foreground/20 bg-white/80 px-4 py-3 text-foreground transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50"
					placeholder="votre@email.com"
				/>
			</div>

			{/* Message Textarea */}
			<div className="flex w-full flex-col gap-2">
				<label
					htmlFor="message"
					className="text-sm font-medium text-foreground/80"
				>
					Message <span className="text-primary">*</span>
				</label>
				<textarea
					id="message"
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					required
					disabled={isLoading}
					rows={6}
					className="w-full rounded-xl border border-foreground/20 bg-white/80 px-4 py-3 text-foreground transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50"
					placeholder="Votre message..."
				/>
			</div>

			{/* Error Message */}
			{error && (
				<motion.p
					initial={{ opacity: 0, y: -10 }}
					animate={{ opacity: 1, y: 0 }}
					className="rounded-lg bg-red-50 p-3 text-sm text-red-600"
				>
					{error}
				</motion.p>
			)}

			{/* Success Message */}
			{success && (
				<motion.p
					initial={{ opacity: 0, y: -10 }}
					animate={{ opacity: 1, y: 0 }}
					className="rounded-lg bg-green-50 p-3 text-sm text-green-600"
				>
					Votre message a été envoyé avec succès ! Nous vous répondrons dans les
					plus brefs délais.
				</motion.p>
			)}

			{/* Submit Button */}
			<button
				type="submit"
				disabled={isLoading}
				className="relative flex items-center justify-center rounded-full bg-primary px-8 py-4 font-medium text-white transition-all hover:bg-primary/90 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70"
			>
				{isLoading ? (
					<>
						<svg
							className="mr-2 h-5 w-5 animate-spin"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
						>
							<circle
								className="opacity-25"
								cx="12"
								cy="12"
								r="10"
								stroke="currentColor"
								strokeWidth="4"
							/>
							<path
								className="opacity-75"
								fill="currentColor"
								d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
							/>
						</svg>
						Envoi en cours...
					</>
				) : (
					"Envoyer"
				)}
			</button>
		</form>
	);
}
