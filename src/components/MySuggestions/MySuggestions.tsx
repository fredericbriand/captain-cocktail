import { useEffect, useState } from "react";

import type { Cocktail, IngredientListItem } from "../../types/types";

import styles from "./MySuggestions.module.scss";

import { useIsSticky } from "../../hooks/useIsSticky";
import CocktailSuggestion from "../CocktailSuggestion/CocktailSuggestion";

import { API_BASE } from "../../config";
import t from "../../data/en_EN.json";
import { getMissingCount } from "../../utils/cocktail";

export default function MySuggestions({
	selectedIngredients,
}: { selectedIngredients: IngredientListItem[] }) {
	const [suggestions, setSuggestions] = useState<Cocktail[]>([]);
	const { ref, isSticky } = useIsSticky(0);

	useEffect(() => {
		if (selectedIngredients.length < 2) {
			setSuggestions([]);
			return;
		}

		Promise.all(
			selectedIngredients.map((i) =>
				fetch(`${API_BASE}/filter.php?i=${i.strIngredient1}`)
					.then((res) => res.json())
					.then((data) => (Array.isArray(data.drinks) ? data.drinks : [])),
			),
		)
			.then((results) => {
				const all = results.flat() as Cocktail[];
				const countById = new Map<string, number>();
				for (const d of all)
					countById.set(d.idDrink, (countById.get(d.idDrink) ?? 0) + 1);

				const matchingCocktails = [
					...new Map(all.map((d) => [d.idDrink, d])).values(),
				].filter((d) => (countById.get(d.idDrink) ?? 0) >= 2) as Cocktail[];

				return Promise.all(
					matchingCocktails.map((cocktail) =>
						fetch(`${API_BASE}/lookup.php?i=${cocktail.idDrink}`)
							.then((res) => res.json())
							.then((data) => data.drinks[0] as Cocktail),
					),
				);
			})
			.then((fullCocktail) => {
				setSuggestions(
					fullCocktail.sort(
						(a, b) =>
							getMissingCount(a, selectedIngredients) -
							getMissingCount(b, selectedIngredients),
					),
				);
			});
	}, [selectedIngredients]);

	return (
		<>
			{suggestions.length > 0 && (
				<section
					ref={ref}
					className={`${styles.suggestions} ${isSticky ? styles.sticky : ""}`}
				>
					<h2>
						<span>{t.bar.mySuggestions.title}&nbsp;</span>
						<span>{suggestions.length}</span>
					</h2>
					<div className={styles["suggestions-container"]}>
						{suggestions.map((suggestion) => (
							<CocktailSuggestion
								key={suggestion.idDrink}
								suggestion={suggestion}
								missingCount={getMissingCount(suggestion, selectedIngredients)}
							/>
						))}
					</div>
				</section>
			)}
		</>
	);
}
