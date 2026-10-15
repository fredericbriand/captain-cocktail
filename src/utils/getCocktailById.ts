import { API_BASE } from "../config";
import type { Cocktail } from "../types/types";

export async function getCocktailById(id: string): Promise<Cocktail | null> {
	try {
		const response = await fetch(`${API_BASE}/lookup.php?i=${id}`);
		if (!response.ok) {
			return null;
		}
		const data = await response.json();
		return data.drinks?.[0] ?? null;
	} catch {
		return null;
	}
}
