import { useMyIngredients } from "../../contexts/MyIngredientsContext";
import type { IngredientListItem } from "../../types/types";

import styles from "./IngredientsDropdown.module.scss";

import t from "../../data/en_EN.json";
import Icon from "../Icon/Icon";

export default function IngredientsDropdown({
	ingredients,
	onSelect,
	search,
}: {
	ingredients: IngredientListItem[];
	onSelect: (ingredient: IngredientListItem) => void;
	search: string;
}) {
	const { myIngredients } = useMyIngredients();
	return (
		<>
			{ingredients.length > 0 ? (
				<div className={styles.dropdown}>
					<h2>{t.bar.dropdown.results}</h2>
					<ul>
						{ingredients.map((ingredient) => {
							const isSelected = myIngredients.some(
								(i) => i.strIngredient1 === ingredient.strIngredient1,
							);
							return (
								<li
									key={ingredient.strIngredient1}
									className={isSelected ? styles.selected : ""}
								>
									<button
										type="button"
										disabled={isSelected}
										aria-label={`${t.bar.dropdown.add} ${ingredient.strIngredient1}`}
										onClick={() => onSelect(ingredient)}
									>
										<img
											src={`https://www.thecocktaildb.com/images/ingredients/${ingredient.strIngredient1}.png/small`}
											alt={ingredient.strIngredient1}
										/>
										<span>{ingredient.strIngredient1}</span>
										<Icon name={isSelected ? "checkmark" : "add"} />
									</button>
								</li>
							);
						})}
					</ul>
				</div>
			) : search.length > 0 ? (
				<div className={styles.dropdown}>
					<Icon name="search" />
					<h4>{t.bar.dropdown.noIngredientFound}</h4>
					<p>
						{t.bar.dropdown.noResult.replace("{search}", search)}
						<br />
						{t.bar.dropdown.noResultHint}
					</p>
				</div>
			) : null}
		</>
	);
}
