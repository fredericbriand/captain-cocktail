import { useCocktailId } from "../../contexts/CocktailDetailsContext";
import { useFavorites } from "../../contexts/FavoritesContext";
import type { Cocktail } from "../../types/types";

import styles from "./CocktailSuggestion.module.scss";

import t from "../../data/en_EN.json";
import { getMissingColor } from "../../utils/cocktail";
import { pluralize } from "../../utils/pluralize";
import Icon from "../Icon/Icon";

export default function CocktailSuggestion({
	suggestion,
	missingCount,
}: { suggestion: Cocktail; missingCount: number }) {
	const { setCocktailId } = useCocktailId();
	const { isFavorite, toggleFavorite } = useFavorites();
	const isCurrentFavorite = isFavorite(suggestion.idDrink);

	return (
		<div className={styles.wrapper}>
			<button
				type="button"
				className={`${styles.suggestion} ${getMissingColor(missingCount)}`}
				command="show-modal"
				commandfor="my-dialog"
				onClick={() => {
					setCocktailId(suggestion.idDrink);
				}}
			>
				<img src={suggestion.strDrinkThumb} alt={suggestion.strDrink} />
				<div>
					<h5>{suggestion.strDrink}</h5>
					<span>
						{missingCount === 0 ? (
							<>
								<Icon name="checkmark" className={styles.checkmark} />
								{t.bar.cocktailSuggestion.doable}
							</>
						) : (
							<>
								{t.bar.cocktailSuggestion.missingIngredient.replace(
									"{missingCount}",
									String(missingCount),
								)}
								&nbsp;
								{pluralize(missingCount, t.bar.ingredient, t.bar.ingredients)}
							</>
						)}
					</span>
				</div>
			</button>
			<button
				type="button"
				className={styles["btn-favorite"]}
				aria-label={
					isCurrentFavorite ? "Remove from favorites" : "Add to favorites"
				}
				onClick={(e) => {
					e.stopPropagation();
					toggleFavorite(suggestion.idDrink);
				}}
			>
				<Icon
					name={isCurrentFavorite ? "fullheart" : "heart"}
					className={styles["icon-heart"]}
				/>
			</button>
		</div>
	);
}
