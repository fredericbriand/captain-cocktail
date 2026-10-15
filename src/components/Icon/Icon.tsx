const icons = import.meta.glob("../../assets/icons/*.svg", {
	eager: true,
	query: "?raw",
	import: "default",
});

function Icon({ name, className }: { name: string; className?: string }) {
	const svg = icons[`../../assets/icons/${name}.svg`] as string;
	if (!svg) return null;
	return (
		<i
			className={className}
			// biome-ignore lint/security/noDangerouslySetInnerHtml: SVGs locaux maîtrisés
			dangerouslySetInnerHTML={{ __html: svg }}
		/>
	);
}

export default Icon;
