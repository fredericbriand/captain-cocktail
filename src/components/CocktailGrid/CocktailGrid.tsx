import type { CocktailGridProps } from "../../types/types";
import CocktailCard from "../CocktailCard/CocktailCard";
import styles from "./CocktailGrid.module.scss";

function CocktailGrid({ cocktails }: CocktailGridProps) {
	return (
		<section className={styles.grid}>
			{cocktails.map((cocktail) => (
				<CocktailCard key={cocktail.idDrink} cocktail={cocktail} />
			))}
		</section>
	);
}

export default CocktailGrid;
