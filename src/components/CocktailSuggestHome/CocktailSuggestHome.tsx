import { useCallback, useEffect, useState } from "react";
import { API_BASE } from "../../config";
import type { Cocktail } from "../../types/types";
import CocktailGrid from "../CocktailGrid/CocktailGrid";

function CocktailSuggestHome() {
	const [cocktailSuggest, setCocktailSuggest] = useState<Cocktail[]>([]);
	const [error, setError] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	const fetchCocktail = useCallback(() => {
		setError(false);

		fetch(`${API_BASE}/popular.php`)
			.then((response) => {
				if (!response.ok) {
					throw new Error("Network Error");
				}
				return response.json();
			})
			.then((data) => {
				setIsLoading(false);
				setCocktailSuggest(data.drinks.slice(0, 6));
			})
			.catch(() => {
				setIsLoading(false);
				setError(true);
			});
	}, []);
	useEffect(() => {
		fetchCocktail();
	}, [fetchCocktail]);

	if (error) {
		return <></>;
	}

	if (isLoading === true) {
		return <p>Loading ...</p>;
	}

	return (
		<>
			<h2>Popular Cocktails</h2>
			<CocktailGrid cocktails={cocktailSuggest} />
		</>
	);
}

export default CocktailSuggestHome;
