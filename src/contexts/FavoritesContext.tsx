import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

interface FavoritesContextTypes {
	favorites: string[];
	toggleFavorite: (id: string) => void;
	isFavorite: (id: string) => boolean;
}
const FavoritesContext = createContext<FavoritesContextTypes | undefined>(
	undefined,
);
const STORAGE_KEY = "cocktail-favorites";

export function FavoritesProvider({ children }: { children: ReactNode }) {
	const [favorites, setFavorites] = useState<string[]>(() => {
		const addedToFav = localStorage.getItem(STORAGE_KEY);
		return addedToFav ? JSON.parse(addedToFav) : [];
	});

	useEffect(() => {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
	}, [favorites]);

	const toggleFavorite = (id: string) => {
		setFavorites((prev) =>
			prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id],
		);
	};
	const isFavorite = (id: string) => favorites.includes(id);

	return (
		<FavoritesContext.Provider
			value={{ favorites, toggleFavorite, isFavorite }}
		>
			{children}
		</FavoritesContext.Provider>
	);
}
export function useFavorites() {
	const context = useContext(FavoritesContext);
	if (!context) {
		throw new Error("useFavorites must be used in FavoritesProvider");
	}
	return context;
}
