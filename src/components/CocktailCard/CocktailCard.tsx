import { useCocktailId } from "../../contexts/CocktailDetailsContext";
import { useFavorites } from "../../contexts/FavoritesContext";
import type { CocktailCardProps } from "../../types/types";
import Icon from "../Icon/Icon";
import styles from "./CocktailCard.module.scss";

function CocktailCard({ cocktail }: CocktailCardProps) {
	const { setCocktailId } = useCocktailId();
	const { isFavorite, toggleFavorite } = useFavorites();
	const isCurrentFavorite = isFavorite(cocktail.idDrink);

	return (
		<article className={styles.article}>
			<button
				type="button"
				className={`${styles["btn-favorite"]} ${isCurrentFavorite ? styles["is-active"] : ""}`}
				aria-label={
					isCurrentFavorite ? "Remove from favorites" : "Add to favorites"
				}
				onClick={() => toggleFavorite(cocktail.idDrink)}
			>
				<Icon
					name={isCurrentFavorite ? "fullheart" : "heart"}
					className={styles["icon-heart"]}
				/>
			</button>
			<button
				type="button"
				className={styles["card-details"]}
				command="show-modal"
				commandfor="my-dialog"
				onClick={() => {
					setCocktailId(cocktail.idDrink);
				}}
			>
				<img
					className={styles["card-img"]}
					src={cocktail.strDrinkThumb}
					alt={cocktail.strDrink}
				/>
				<p>{cocktail.strDrink}</p>
			</button>
		</article>
	);
}

export default CocktailCard;
