import { createContext, useContext, useState } from "react";
import type { DetailsContext } from "../types/types";

const CocktailDetailsContext = createContext<DetailsContext | null>(null);

export function CocktailDetailsProvider({
	children,
}: { children: React.ReactNode }) {
	const [cocktailId, setCocktailId] = useState<string | null>(null);
	return (
		<CocktailDetailsContext.Provider value={{ cocktailId, setCocktailId }}>
			{children}
		</CocktailDetailsContext.Provider>
	);
}

export const useCocktailId = () => {
	const value = useContext(CocktailDetailsContext);
	if (value == null) {
		throw new Error(
			"useCocktailId has to be used within <CocktailDetailsProvider>",
		);
	}

	return value;
};
