"use client";

import {
	AnimatePresence,
	motion,
	useInView,
	useScroll,
	useTransform,
} from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ContactForm from "./components/ContactForm";
import ContactModal from "./components/ContactModal";
import FloatingCTA from "./components/FloatingCTA";

interface Service {
	title: string;
	description: string;
	detailedDescription: string;
	color: string;
	image: string;
}

const FadeInSection = ({
	children,
	delay = 0,
}: {
	children: React.ReactNode;
	delay?: number;
}) => {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, margin: "-100px" });

	return (
		<motion.div
			ref={ref}
			initial={{ opacity: 0, y: 40 }}
			animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
			transition={{
				duration: 0.8,
				delay,
				ease: [0.22, 1, 0.36, 1],
			}}
		>
			{children}
		</motion.div>
	);
};

const ServiceModal = ({
	service,
	onClose,
}: {
	service: Service;
	onClose: () => void;
}) => {
	const modalContentRef = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		container: modalContentRef,
	});

	// Parallax effect: image moves up and scales slightly to fill the space
	const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
	const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

	useEffect(() => {
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = "unset";
		};
	}, []);

	return (
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
				className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-background shadow-2xl"
				onClick={(e) => e.stopPropagation()}
			>
				{/* Close button */}
				<button
					onClick={onClose}
					className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-foreground shadow-lg transition-all hover:bg-white hover:shadow-xl"
				>
					<span className="text-2xl leading-none">×</span>
				</button>

				{/* Scrollable Content */}
				<div
					ref={modalContentRef}
					className="modal-scrollbar relative max-h-[85vh] overflow-y-auto overflow-x-hidden"
					style={{ scrollbarWidth: "thin" }}
				>
					{/* Image with Parallax */}
					<div className="relative h-64 w-full overflow-hidden md:h-80">
						<motion.div
							style={{ y: imageY, scale: imageScale }}
							className="absolute inset-0 h-full w-full origin-center"
						>
							<Image
								src={service.image}
								alt={service.title}
								fill
								className="object-cover"
							/>
						</motion.div>
						<div
							className="absolute inset-0 z-10"
							style={{
								background: `linear-gradient(to bottom, transparent 0%, ${service.color}40 100%)`,
							}}
						/>
					</div>

					{/* Content */}
					<div className="relative bg-background">
						<div className="flex flex-col gap-6 p-6 md:p-8">
							<h3 className="font-crimson text-3xl font-semibold text-foreground md:text-4xl">
								{service.title}
							</h3>
							<p className="whitespace-pre-line text-base leading-relaxed text-foreground/80 md:text-lg">
								{service.detailedDescription}
							</p>
							<button
								onClick={onClose}
								className="relative z-30 mt-4 self-start rounded-full bg-primary px-8 py-3 font-medium text-white transition-all hover:bg-primary/90 hover:shadow-lg"
							>
								Fermer
							</button>
						</div>
					</div>
				</div>

				{/* Bottom gradient fade */}
				<div className="pointer-events-none absolute bottom-0 left-0 right-0 z-20 h-24 bg-gradient-to-t from-background to-transparent" />
			</motion.div>
		</motion.div>
	);
};

export default function Home() {
	const servicesRef = useRef(null);
	const servicesInView = useInView(servicesRef, {
		once: true,
		margin: "-100px",
	});

	const [selectedService, setSelectedService] = useState<Service | null>(null);
	const [isContactModalOpen, setIsContactModalOpen] = useState(false);

	const services: Service[] = [
		{
			title: "Pathologies gynécologiques",
			description:
				"Soulager les douleurs gynécologiques par la relaxation et le mouvement doux.",
			detailedDescription:
				"Les pathologies gynécologiques telles que l'endométriose, l'adénomyose ou les troubles menstruels peuvent impacter fortement le quotidien des femmes, tant sur le plan physique qu'émotionnel. Douleurs, fatigue et stress sont souvent présents et nécessitent une prise en charge globale.\n\nNous proposons un accompagnement bien-être complémentaire au suivi médical, basé sur la relaxation, la respiration et des exercices corporels doux. Ces pratiques permettent de mieux gérer les douleurs, de réduire les tensions et de favoriser une meilleure écoute du corps.\n\nChaque accompagnement est personnalisé, dans un cadre bienveillant et respectueux du rythme de chacune, avec pour objectif d'améliorer la qualité de vie et le bien-être au quotidien.\n\nAinsi, notre accompagnement ne vise pas à soigner la maladie, mais à améliorer la qualité de vie, à soutenir le bien-être physique et émotionnel et à accompagner les femmes dans leur quotidien avec plus de sérénité.",
			color: "#e8d5c4",
			image: "/ventre.jpg",
		},
		{
			title: "Grossesse / Post-partum",
			description:
				"Accompagner sereinement la grossesse et l'après-naissance par le bien-être corporel.",
			detailedDescription:
				"La grossesse et la période du post-partum sont des étapes importantes de la vie, marquées par de nombreux changements physiques et émotionnels. Fatigue, stress, tensions corporelles ou besoin de recentrage peuvent apparaître à différents moments.\n\nNous proposons un accompagnement bien-être complémentaire au suivi médical, à travers des séances de relaxation, de respiration et des exercices corporels doux, adaptés à chaque étape de la grossesse et après l'accouchement. Ces pratiques favorisent la détente, la connexion au corps et un mieux-être global.\n\nL'accompagnement est personnalisé, dans un cadre bienveillant et sécurisant, afin de soutenir les femmes avant et après la naissance.",
			color: "#d4c8b8",
			image: "/enceinte.jpg",
		},
		{
			title: "Ménopause",
			description:
				"Atténuer les symptômes de la ménopause par des pratiques douces adaptées.",
			detailedDescription:
				"La ménopause entraîne de nombreux changements physiques et émotionnels, comme les bouffées de chaleur, la fatigue, les troubles du sommeil ou les fluctuations émotionnelles.\n\nNous proposons un accompagnement bien-être complémentaire, basé sur la relaxation, la respiration et des exercices corporels doux, pour mieux gérer ces symptômes et favoriser un équilibre physique et émotionnel.\n\nChaque accompagnement est personnalisé, dans un cadre bienveillant et sécurisant, afin de soutenir les femmes et améliorer leur qualité de vie au quotidien.",
			color: "#c8b4a6",
			image: "/menopause.jpg",
		},
	];

	return (
		<div className="flex min-h-screen flex-col items-center overflow-hidden">
			{/* Hero Section - 100dvh */}
			<section className="relative flex min-h-[100dvh] w-full items-center justify-center px-6">
				{/* Decorative Leaves - Hero */}
				<motion.div
					className="pointer-events-none absolute left-[5%] top-[15%] h-32 w-32 opacity-10 md:h-48 md:w-48"
					animate={{
						y: [0, -20, 0],
						rotate: [135, 155, 135],
					}}
					transition={{
						duration: 8,
						repeat: Infinity,
						ease: "easeInOut",
					}}
				>
					<Image src="/leaf.svg" alt="" fill className="object-contain" />
				</motion.div>
				<motion.div
					className="pointer-events-none absolute right-[8%] top-[25%] h-24 w-24 opacity-8 md:h-40 md:w-40"
					animate={{
						y: [0, 15, 0],
						rotate: [210, 180, 210],
					}}
					transition={{
						duration: 10,
						repeat: Infinity,
						ease: "easeInOut",
					}}
				>
					<Image src="/leaf.svg" alt="" fill className="object-contain" />
				</motion.div>
				<motion.div
					className="pointer-events-none absolute bottom-[10%] left-[15%] h-20 w-20 opacity-12 md:h-32 md:w-32"
					animate={{
						y: [0, -10, 0],
						rotate: [260, 290, 260],
					}}
					transition={{
						duration: 7,
						repeat: Infinity,
						ease: "easeInOut",
					}}
				>
					<Image src="/leaf.svg" alt="" fill className="object-contain" />
				</motion.div>
				<motion.div
					className="pointer-events-none absolute bottom-[20%] right-[10%] h-28 w-28 opacity-10 md:h-44 md:w-44"
					animate={{
						y: [0, 12, 0],
						rotate: [95, 70, 95],
					}}
					transition={{
						duration: 9,
						repeat: Infinity,
						ease: "easeInOut",
					}}
				>
					<Image src="/leaf.svg" alt="" fill className="object-contain" />
				</motion.div>

				<div className="relative z-10 flex flex-col items-center gap-6">
					<motion.div
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{
							duration: 1,
							ease: [0.22, 1, 0.36, 1],
						}}
					>
						<Image
							src="/ondama-logo.svg"
							alt="Ondama logo"
							width={180}
							height={180}
							priority
							className="mb-4"
						/>
					</motion.div>
					<motion.h1
						className="font-crimson text-7xl font-normal tracking-tight text-primary md:text-8xl lg:text-9xl"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{
							duration: 0.8,
							delay: 0.2,
							ease: [0.22, 1, 0.36, 1],
						}}
					>
						Ondama
					</motion.h1>
					<motion.p
						className="max-w-3xl text-center text-lg text-foreground/70 md:text-4xl lg:text-xl"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{
							duration: 0.8,
							delay: 0.4,
							ease: [0.22, 1, 0.36, 1],
						}}
					>
						Un espace de soutien personnalisé destiné aux femmes enceintes ainsi
						qu'à celles souffrant de pathologies gynécologiques.
					</motion.p>
				</div>
			</section>

			{/* Content Sections */}
			<main className="relative flex w-full max-w-4xl flex-col items-center gap-20 px-6 py-16">
				{/* Decorative Leaves - Content */}
				<motion.div
					className="pointer-events-none absolute left-[-10%] top-[5%] h-24 w-24 opacity-15 md:h-36 md:w-36"
					animate={{
						y: [0, -15, 0],
						rotate: [160, 185, 160],
					}}
					transition={{
						duration: 9,
						repeat: Infinity,
						ease: "easeInOut",
					}}
				>
					<Image src="/leaf.svg" alt="" fill className="object-contain" />
				</motion.div>
				<motion.div
					className="pointer-events-none absolute right-[-8%] top-[15%] h-16 w-16 opacity-12 md:h-28 md:w-28"
					animate={{
						y: [0, 10, 0],
						rotate: [110, 85, 110],
					}}
					transition={{
						duration: 7.5,
						repeat: Infinity,
						ease: "easeInOut",
					}}
				>
					<Image src="/leaf.svg" alt="" fill className="object-contain" />
				</motion.div>
				<motion.div
					className="pointer-events-none absolute left-[-5%] top-[40%] h-20 w-20 opacity-10 md:h-32 md:w-32"
					animate={{
						y: [0, -12, 0],
						rotate: [240, 270, 240],
					}}
					transition={{
						duration: 8.5,
						repeat: Infinity,
						ease: "easeInOut",
					}}
				>
					<Image src="/leaf.svg" alt="" fill className="object-contain" />
				</motion.div>
				<motion.div
					className="pointer-events-none absolute right-[-10%] top-[55%] h-28 w-28 opacity-8 md:h-40 md:w-40"
					animate={{
						y: [0, 18, 0],
						rotate: [320, 290, 320],
					}}
					transition={{
						duration: 10.5,
						repeat: Infinity,
						ease: "easeInOut",
					}}
				>
					<Image src="/leaf.svg" alt="" fill className="object-contain" />
				</motion.div>
				<motion.div
					className="pointer-events-none absolute bottom-[10%] left-[-8%] h-32 w-32 opacity-12 md:h-44 md:w-44"
					animate={{
						y: [0, -20, 0],
						rotate: [125, 150, 125],
					}}
					transition={{
						duration: 9.5,
						repeat: Infinity,
						ease: "easeInOut",
					}}
				>
					<Image src="/leaf.svg" alt="" fill className="object-contain" />
				</motion.div>
				<motion.div
					className="pointer-events-none absolute bottom-[5%] right-[-12%] h-24 w-24 opacity-10 md:h-36 md:w-36"
					animate={{
						y: [0, 15, 0],
						rotate: [190, 165, 190],
					}}
					transition={{
						duration: 8,
						repeat: Infinity,
						ease: "easeInOut",
					}}
				>
					<Image src="/leaf.svg" alt="" fill className="object-contain" />
				</motion.div>

				{/* Small scattered leaves for extra density */}
				<motion.div
					className="pointer-events-none absolute left-[25%] top-[30%] h-12 w-12 opacity-8 md:h-20 md:w-20"
					animate={{
						y: [0, -8, 0],
						rotate: [75, 105, 75],
					}}
					transition={{
						duration: 6,
						repeat: Infinity,
						ease: "easeInOut",
					}}
				>
					<Image src="/leaf.svg" alt="" fill className="object-contain" />
				</motion.div>
				<motion.div
					className="pointer-events-none absolute right-[20%] top-[70%] h-14 w-14 opacity-7 md:h-24 md:w-24"
					animate={{
						y: [0, 10, 0],
						rotate: [200, 170, 200],
					}}
					transition={{
						duration: 7,
						repeat: Infinity,
						ease: "easeInOut",
					}}
				>
					<Image src="/leaf.svg" alt="" fill className="object-contain" />
				</motion.div>

				{/* Notre Vision Section */}
				<FadeInSection>
					<div className="relative z-10 flex w-full flex-col items-center gap-6 text-center">
						<div className="flex items-center gap-2">
							<span className="text-xl text-primary">✦</span>
							<h2 className="font-crimson text-3xl font-semibold text-foreground md:text-4xl">
								Notre vision
							</h2>
						</div>
						<p className="max-w-2xl text-base leading-relaxed text-foreground/60 md:text-lg">
							Notre vision, c'est de proposer une offre à forte valeur humaine,
							adaptée aux besoins de bien-être, de soulagement et de reconnexion
							au corps.
						</p>
					</div>
				</FadeInSection>

				{/* Nos Accompagnements Section */}
				<div className="relative z-10 flex w-full flex-col items-center gap-10">
					<FadeInSection>
						<div className="flex items-center gap-2">
							<span className="text-xl text-primary">✦</span>
							<h2 className="font-crimson text-3xl font-semibold text-foreground md:text-4xl">
								Nos accompagnements
							</h2>
						</div>
					</FadeInSection>

					{/* Leaf behind services */}
					<motion.div
						className="pointer-events-none absolute left-[50%] top-[60%] h-40 w-40 -translate-x-1/2 opacity-5 md:h-56 md:w-56"
						animate={{
							y: [0, -25, 0],
							rotate: [145, 175, 145],
						}}
						transition={{
							duration: 12,
							repeat: Infinity,
							ease: "easeInOut",
						}}
					>
						<Image src="/leaf.svg" alt="" fill className="object-contain" />
					</motion.div>

					{/* Services Grid */}
					<div
						ref={servicesRef}
						className="relative z-10 grid w-full gap-8 md:grid-cols-3"
					>
						{services.map((service, index) => (
							<motion.div
								key={service.title}
								initial={{ opacity: 0, y: 40 }}
								animate={
									servicesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }
								}
								transition={{
									duration: 0.6,
									delay: index * 0.15,
									ease: [0.22, 1, 0.36, 1],
								}}
								whileHover={{ y: -8, transition: { duration: 0.3 } }}
								onClick={() => setSelectedService(service)}
								className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl bg-white shadow-md transition-shadow duration-300 hover:shadow-xl"
							>
								<div className="relative aspect-square w-full overflow-hidden">
									<Image
										src={service.image}
										alt={service.title}
										fill
										className="object-cover transition-transform duration-500 group-hover:scale-110"
									/>
									<div
										className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-70"
										style={{ backgroundColor: service.color, opacity: 0.3 }}
									/>
								</div>
								<div className="flex flex-col gap-3 p-6 text-center">
									<h3 className="font-crimson text-l font-semibold text-foreground">
										{service.title}
									</h3>
									<p className="text-xs leading-relaxed text-foreground/60">
										{service.description}
									</p>
								</div>
							</motion.div>
						))}
					</div>
				</div>

				{/* Qui sommes-nous Section */}
				<FadeInSection>
					<div className="relative z-10 flex w-full flex-col items-center gap-8 text-center">
						<div className="flex items-center gap-2">
							<span className="text-xl text-primary">✦</span>
							<h2 className="font-crimson text-3xl font-semibold text-foreground md:text-4xl">
								Qui sommes-nous ?
							</h2>
						</div>
						<div className="flex max-w-4xl flex-col gap-6 text-base leading-relaxed text-foreground/70 md:text-lg">
							<p>
								Nous sommes des jeunes étudiantes en Licence 3 STAPS, spécialité
								Activité Physique Adaptée et Santé (APA-S). Sensibles aux
								problématiques de santé et de bien-être féminin, nous avons
								choisi de créer ce projet à partir d&apos;un constat personnel
								et professionnel : de nombreuses femmes rencontrent, à
								différents moments de leur vie, des difficultés physiques,
								émotionnelles et hormonales encore trop peu prises en compte.
							</p>
							<p>
								Notre démarche repose sur une approche humaine, bienveillante et
								individualisée. Nous proposons plusieurs prestations, adaptées
								aux besoins et aux envies des femmes. Celles-ci peuvent
								bénéficier de séances individuelles de relaxation et de
								respiration, d&apos;un accompagnement bien-être personnalisé
								incluant un temps d&apos;écoute et des exercices corporels doux,
								ou encore de différents ateliers collectifs à thème, abordant
								notamment la gestion du stress, de la fatigue ou des douleurs
								menstruelles.
							</p>
							<p>
								Ce projet s&apos;inscrit également dans une dynamique
								d&apos;évolution continue. À terme, nous souhaitons enrichir
								notre accompagnement par une formation et une intégration
								progressive de l&apos;acupuncture, afin d&apos;élargir nos
								possibilités d&apos;intervention et de répondre de manière
								toujours plus complète aux besoins des femmes. L&apos;obtention
								d&apos;un certificat en yoga thérapeutique constitue également
								une perspective de développement, tout comme l&apos;extension de
								notre offre à destination des jeunes mamans et des personnes
								souffrant de troubles hormonaux.
							</p>
							<p className="font-medium text-foreground/90">
								À travers ce projet, notre objectif est d&apos;offrir aux femmes
								un espace de bien-être, d&apos;écoute et de reconnexion au
								corps, complémentaire au suivi médical, et adapté à chaque étape
								de la vie.
							</p>
						</div>
					</div>
				</FadeInSection>

				{/* Nos accompagnements détaillés Section */}
				<FadeInSection>
					<div className="relative z-10 flex w-full flex-col items-center gap-8">
						<div className="flex items-center gap-2">
							<span className="text-xl text-primary">✦</span>
							<h2 className="font-crimson text-3xl font-semibold text-foreground md:text-4xl">
								Détails de nos accompagnements
							</h2>
						</div>
						<div className="flex w-full flex-col gap-12">
							{/* Séances individuelles */}
							<div className="flex flex-col gap-4 rounded-2xl bg-white/60 p-6 shadow-sm md:p-8">
								<h3 className="font-crimson text-2xl font-semibold text-primary md:text-3xl">
									Séances individuelles
								</h3>
								<p className="text-base leading-relaxed text-foreground/70 md:text-lg">
									Les séances individuelles offrent un accompagnement
									personnalisé, construit en fonction des besoins, des ressentis
									et des objectifs de chaque participante. Elles peuvent inclure
									des techniques de relaxation, de respiration, des exercices
									corporels doux ainsi qu&apos;un temps d&apos;écoute et
									d&apos;échange. Ces séances permettent de mieux gérer le
									stress, les douleurs, la fatigue ou les déséquilibres
									émotionnels, tout en favorisant une meilleure connexion au
									corps.
								</p>
							</div>

							{/* Ateliers collectifs */}
							<div className="flex flex-col gap-4 rounded-2xl bg-white/60 p-6 shadow-sm md:p-8">
								<h3 className="font-crimson text-2xl font-semibold text-primary md:text-3xl">
									Ateliers collectifs à thème
								</h3>
								<p className="text-base leading-relaxed text-foreground/70 md:text-lg">
									Les ateliers collectifs à thème constituent des temps de
									partage et de pratique en petit groupe, dans un cadre
									sécurisant et convivial. Ils abordent des thématiques
									spécifiques telles que la gestion du stress, la fatigue, les
									douleurs menstruelles ou encore le bien-être féminin au
									quotidien. Les ateliers allient exercices de respiration,
									relaxation, mouvements doux et échanges, permettant à chacune
									de repartir avec des outils simples à réutiliser au quotidien.
								</p>
							</div>

							{/* Approche complémentaire */}
							<p className="text-center text-base italic leading-relaxed text-foreground/60 md:text-lg">
								L&apos;ensemble de nos accompagnements s&apos;inscrit dans une
								démarche complémentaire au suivi médical, avec pour objectif
								d&apos;aider chaque femme à devenir actrice de son bien-être, à
								mieux écouter son corps et à retrouver un équilibre durable.
							</p>
						</div>
					</div>
				</FadeInSection>

				{/* Nos lieux d'intervention Section */}
				<FadeInSection>
					<div className="relative z-10 flex w-full flex-col items-center gap-8">
						<div className="flex flex-col items-center gap-2 text-center">
							<div className="flex items-center gap-2">
								<span className="text-xl text-primary">✦</span>
								<h2 className="font-crimson text-3xl font-semibold text-foreground md:text-4xl">
									Nos lieux d&apos;intervention
								</h2>
							</div>
							<p className="max-w-2xl text-base text-foreground/60 md:text-lg">
								Agglomération grenobloise
							</p>
						</div>

						{/* Grid des lieux */}
						<div className="grid w-full gap-6 md:grid-cols-2 lg:grid-cols-3">
							{[
								{
									city: "Grenoble",
									location:
										"Maison des Habitants – Centre-ville / Chorier-Berriat",
									description:
										"Salle municipale calme et accessible, idéale pour des séances individuelles et des ateliers collectifs de bien-être.",
								},
								{
									city: "Échirolles",
									location: "Maison des Habitants d'Échirolles",
									description:
										"Espace associatif accueillant, adapté aux pratiques corporelles douces et aux ateliers en petit groupe.",
								},
								{
									city: "Saint-Martin-d'Hères",
									location: "MJC Pablo Picasso",
									description:
										"Salle polyvalente offrant un cadre sécurisant pour des séances collectives et des temps d'échange.",
								},
								{
									city: "Fontaine",
									location: "Centre social Romain Rolland",
									description:
										"Lieu de proximité, accessible et propice aux activités de relaxation, respiration et accompagnement bien-être.",
								},
								{
									city: "Seyssinet-Pariset",
									location: "Maison des Habitants de Seyssinet-Pariset",
									description:
										"Salle lumineuse et calme, adaptée aux ateliers collectifs et aux séances de bien-être féminin.",
								},
								{
									city: "Meylan",
									location: "Maison de quartier des Buclos",
									description:
										"Espace agréable et facilement accessible, idéal pour des séances personnalisées et des ateliers thématiques.",
								},
								{
									city: "La Tronche",
									location: "Salle communale / Maison de quartier",
									description:
										"Cadre calme et proche des structures de santé, cohérent avec une approche complémentaire au suivi médical.",
								},
							].map((lieu, index) => (
								<motion.div
									key={lieu.city}
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true, margin: "-50px" }}
									transition={{
										duration: 0.5,
										delay: index * 0.1,
										ease: [0.22, 1, 0.36, 1],
									}}
									className="flex flex-col gap-3 rounded-xl bg-white/70 p-6 shadow-sm transition-all hover:shadow-md"
								>
									<div className="flex items-start gap-2">
										<span className="text-xl text-primary">📍</span>
										<h3 className="font-crimson text-xl font-semibold text-foreground">
											{lieu.city}
										</h3>
									</div>
									<p className="text-sm font-medium text-foreground/80">
										{lieu.location}
									</p>
									<p className="text-sm leading-relaxed text-foreground/60">
										{lieu.description}
									</p>
								</motion.div>
							))}
						</div>
					</div>
				</FadeInSection>

				{/* Contact Section */}
				<FadeInSection delay={0.2}>
					<div
						id="contact-section"
						className="relative z-10 mt-8 flex w-full flex-col gap-8"
					>
						<div className="flex w-full items-center justify-center gap-2">
							<span className="text-xl text-primary">✧</span>
							<h2 className="font-crimson text-3xl font-semibold text-foreground md:text-4xl">
								Contact
							</h2>
						</div>
						<div className="w-full rounded-3xl bg-white/60 p-8 shadow-sm md:p-10">
							<ContactForm />
						</div>
					</div>
				</FadeInSection>
			</main>

			{/* Floating CTA */}
			<FloatingCTA onClick={() => setIsContactModalOpen(true)} />

			{/* Contact Modal */}
			<ContactModal
				isOpen={isContactModalOpen}
				onClose={() => setIsContactModalOpen(false)}
			/>

			{/* Modal */}
			<AnimatePresence>
				{selectedService && (
					<ServiceModal
						service={selectedService}
						onClose={() => setSelectedService(null)}
					/>
				)}
			</AnimatePresence>
		</div>
	);
}
