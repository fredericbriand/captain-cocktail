import { type ReactNode, createContext, useContext, useState } from "react";
import type { IngredientListItem } from "../types/types";

interface MyIngredientsContextType {
	myIngredients: IngredientListItem[];
	addIngredient: (ingredient: IngredientListItem) => void;
	removeIngredient: (ingredient: IngredientListItem) => void;
	clearIngredients: () => void;
}

const MyIngredientsContext = createContext<MyIngredientsContextType | null>(
	null,
);

export function MyIngredientsProvider({ children }: { children: ReactNode }) {
	const [myIngredients, setMyIngredients] = useState<IngredientListItem[]>([]);

	function addIngredient(ingredient: IngredientListItem) {
		setMyIngredients((prev) => {
			if (prev.some((i) => i.strIngredient1 === ingredient.strIngredient1))
				return prev;
			return [...prev, ingredient].sort((a, b) =>
				a.strIngredient1.localeCompare(b.strIngredient1),
			);
		});
	}

	function removeIngredient(ingredient: IngredientListItem) {
		setMyIngredients((prev) =>
			prev.filter((i) => i.strIngredient1 !== ingredient.strIngredient1),
		);
	}

	function clearIngredients() {
		setMyIngredients([]);
	}

	return (
		<MyIngredientsContext.Provider
			value={{
				myIngredients,
				addIngredient,
				removeIngredient,
				clearIngredients,
			}}
		>
			{children}
		</MyIngredientsContext.Provider>
	);
}

export function useMyIngredients() {
	const value = useContext(MyIngredientsContext);
	if (value === null) {
		throw new Error(
			"useMyIngredients has to be used within <MyIngredientsProvider>",
		);
	}
	return value;
}
