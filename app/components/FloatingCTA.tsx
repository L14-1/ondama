"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect, useRef } from "react";

interface FloatingCTAProps {
	onClick: () => void;
}

export default function FloatingCTA({ onClick }: FloatingCTAProps) {
	const [isVisible, setIsVisible] = useState(true);
	const contactSectionRef = useRef<HTMLElement | null>(null);

	useEffect(() => {
		// Find the contact section
		const contactSection = document.getElementById("contact-section");
		contactSectionRef.current = contactSection;

		const handleScroll = () => {
			if (!contactSectionRef.current) return;

			const contactRect = contactSectionRef.current.getBoundingClientRect();
			const windowHeight = window.innerHeight;

			// Hide button when contact section is visible
			const isContactVisible =
				contactRect.top < windowHeight && contactRect.bottom > 0;

			setIsVisible(!isContactVisible);
		};

		window.addEventListener("scroll", handleScroll);
		handleScroll(); // Initial check

		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<motion.button
			onClick={onClick}
			initial={{ opacity: 0, scale: 0.8 }}
			animate={{
				opacity: isVisible ? 1 : 0,
				scale: isVisible ? 1 : 0.8,
			}}
			transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
			className="fixed bottom-8 right-8 z-40 flex items-center gap-3 rounded-full bg-primary px-6 py-4 font-medium text-white shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl md:px-8 md:py-5"
			style={{
				pointerEvents: isVisible ? "auto" : "none",
			}}
		>
			<svg
				className="h-5 w-5 md:h-6 md:w-6"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
				/>
			</svg>
			<span className="hidden md:inline">Nous contacter</span>
		</motion.button>
	);
}
