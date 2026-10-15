import type { Cocktail, IngredientListItem } from "../types/types";

const MAX_COCKTAILDB_INGREDIENTS = 15;

export function getMissingColor(missingCount: number): string {
	if (missingCount === 0) return "status-green";
	if (missingCount === 1) return "status-yellow";
	if (missingCount === 2) return "status-orange";
	return "status-red";
}

export function getMissingCount(
	cocktail: Cocktail,
	selectedIngredients: IngredientListItem[],
): number {
	const cocktailIngredients = Array.from(
		{ length: MAX_COCKTAILDB_INGREDIENTS },
		(_, i) => cocktail[`strIngredient${i + 1}` as keyof Cocktail],
	).filter(Boolean) as string[];

	const selectedNames = selectedIngredients.map((i) =>
		i.strIngredient1.toLowerCase(),
	);

	return cocktailIngredients.filter(
		(ing) => !selectedNames.includes(ing.toLowerCase()),
	).length;
}
