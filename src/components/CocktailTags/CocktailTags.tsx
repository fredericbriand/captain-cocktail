import type { CocktailTagsProps } from "../../types/types";
import styles from "./CocktailTags.module.scss";

const EXCLUDE_TAGS = [
	"IBA",
	"Alcoholic",
	"Non alcoholic",
	"Optional alcohol",
	"ContemporaryClassic",
	"NewEra",
	"Unforgettables",
];

function CocktailTags({ strIBA, strGlass, strTags }: CocktailTagsProps) {
	const filteredTags =
		strTags?.split(",").filter((tag) => !EXCLUDE_TAGS.includes(tag)) ?? [];

	return (
		<>
			<ul className={styles.info}>
				<li className={`${styles.glass} ${!strIBA ? styles.full : ""}`}>
					<span className={styles.type}>Glass Type</span>
					<span className={styles.property}>{strGlass}</span>
				</li>
				{!strIBA ? null : (
					<li>
						<abbr
							className={styles.type}
							title="International Bartenders Association"
						>
							IBA
						</abbr>{" "}
						<span className={styles.property}>{strIBA}</span>
					</li>
				)}
				{filteredTags.length === 0 ? null : (
					<li className={styles["tags-box"]}>
						<span className={`${styles.type} ${styles["type-tags"]}`}>
							Tags
						</span>
						<ul className={styles["tags-list"]}>
							{filteredTags.map((tag) => (
								<li key={tag} className={styles.tag}>
									{tag}
								</li>
							))}
						</ul>
					</li>
				)}
			</ul>
		</>
	);
}

export default CocktailTags;
