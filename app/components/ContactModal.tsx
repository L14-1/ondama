"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import ContactForm from "./ContactForm";

interface ContactModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}

		return () => {
			document.body.style.overflow = "unset";
		};
	}, [isOpen]);

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.3 }}
					className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
					onClick={onClose}
				>
					<motion.div
						initial={{ scale: 0.9, opacity: 0, y: 20 }}
						animate={{ scale: 1, opacity: 1, y: 0 }}
						exit={{ scale: 0.9, opacity: 0, y: 20 }}
						transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
						className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-background p-8 shadow-2xl md:p-10"
						onClick={(e) => e.stopPropagation()}
					>
						{/* Close button */}
						<button
							onClick={onClose}
							className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-foreground/5 text-foreground transition-all hover:bg-foreground/10"
						>
							<span className="text-2xl leading-none">×</span>
						</button>

						{/* Title */}
						<div className="mb-8 flex flex-col gap-2">
							<h2 className="font-crimson text-3xl font-semibold text-foreground md:text-4xl">
								Contactez-nous
							</h2>
							<p className="text-base text-foreground/60">
								Nous sommes à votre écoute pour répondre à toutes vos questions
							</p>
						</div>

						{/* Contact Form */}
						<ContactForm onSuccess={onClose} />
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
