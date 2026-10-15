import { useCallback, useEffect, useState } from "react";
import { API_BASE } from "../../config";
import { useFavorites } from "../../contexts/FavoritesContext";
import { blueSignature } from "../../data/blueSignature";
import type { Cocktail, CocktailDetailsProps } from "../../types/types";
import CocktailTags from "../CocktailTags/CocktailTags";
import Icon from "../Icon/Icon";
import IngredientItem from "../IngredientItem/IngredientItem";
import CloseButton from "./CloseButton/CloseButton";
import styles from "./CocktailDetails.module.scss";

function splitInstructionSteps(instructions?: string): string[] {
	if (!instructions) return [];
	return instructions
		.split(".")
		.map((step) => step.trim())
		.filter(Boolean);
}

function CocktailDetails({ idDrink }: CocktailDetailsProps) {
	const { isFavorite, toggleFavorite } = useFavorites();

	function handleFavorite() {
		toggleFavorite(cocktailDetails?.idDrink || "");
	}

	const [isTranslate, setIsTranslate] = useState(false);

	const [cocktailDetails, setCocktailDetails] = useState<Cocktail | null>(null);
	const [error, setError] = useState(false);
	const fetchCocktail = useCallback(() => {
		setError(false);

		if (idDrink === blueSignature.idDrink) {
			setCocktailDetails(blueSignature);
			return;
		}

		fetch(`${API_BASE}/lookup.php?i=${idDrink}`)
			.then((response) => {
				if (!response.ok) {
					throw new Error("Network Error");
				}
				return response.json();
			})
			.then((data) => {
				setCocktailDetails(data.drinks[0]);
			})
			.catch(() => {
				setError(true);
			});
	}, [idDrink]);
	useEffect(() => {
		fetchCocktail();
	}, [fetchCocktail]);

	function difficulty() {
		if (cocktailDetails?.strIngredient6) {
			return "Hard";
		}
		if (cocktailDetails?.strIngredient4) {
			return "Medium";
		}
		return "Easy";
	}

	if (error) {
		return (
			<article className={`${styles["not-found"]} ${styles["cocktail-card"]}`}>
				<CloseButton />
				<Icon className={styles.exclamationpoint} name="exclamationpoint" />
				<h2>Cocktail not found</h2>
				<p>An error occurred. Please check your connection and try again.</p>
				<button type="reset" onClick={fetchCocktail}>
					Try again
				</button>
			</article>
		);
	}
	if (!cocktailDetails) {
		return (
			<article className={`${styles["not-found"]} ${styles["cocktail-card"]}`}>
				<CloseButton />
				<p>Loading ...</p>
			</article>
		);
	}

	return (
		<article className={styles["cocktail-card"]}>
			<div className={styles["image-header"]}>
				<CloseButton />
				<img
					className={styles["cocktail-img"]}
					src={cocktailDetails.strDrinkThumb}
					alt={`${cocktailDetails.strDrink}`}
				/>
				<button
					type="button"
					onClick={handleFavorite}
					className={`${styles.favorite} ${isFavorite(cocktailDetails.idDrink) ? styles["is-active"] : ""}`}
					aria-label={
						!isFavorite(cocktailDetails.idDrink)
							? "Set Favorite"
							: "Remove Favorite"
					}
				>
					{!isFavorite(cocktailDetails.idDrink) ? (
						<Icon name="heart" />
					) : (
						<Icon name="fullheart" />
					)}
				</button>
			</div>
			<h1>{cocktailDetails.strDrink}</h1>
			<ul className={styles["tags-container"]}>
				<li className={styles.alcool}>{cocktailDetails.strAlcoholic}</li>
				<li>{cocktailDetails.strCategory}</li>
			</ul>
			<div className={styles["recipe-specs"]}>
				<span>🕙&nbsp;&nbsp;10 min</span>
				<span>👩‍👦&nbsp;&nbsp;1 pers.</span>
				<span>⭐&nbsp;&nbsp;{difficulty()}</span>
			</div>
			<h2>INGREDIENTS</h2>
			<ul className={styles.ingredients}>
				{Array.from({ length: 15 }, (_, index) => index + 1).map((value) => (
					<IngredientItem
						key={value}
						strIngredient={cocktailDetails[`strIngredient${value}`]}
						strMeasure={cocktailDetails[`strMeasure${value}`]}
					/>
				))}
			</ul>
			<h2>PREPARATION</h2>
			<div className={styles.preparation}>
				<ol className={styles.steps}>
					{splitInstructionSteps(
						isTranslate
							? cocktailDetails.strInstructionsFR
							: cocktailDetails.strInstructions,
					).map((step, index) => (
						// biome-ignore lint/suspicious/noArrayIndexKey: liste statique dérivée du texte, ne se réordonne jamais
						<li key={index}>{step}</li>
					))}
				</ol>
				{cocktailDetails.strInstructionsFR && (
					<button
						type="button"
						className="pink-button"
						onClick={() => setIsTranslate(!isTranslate)}
					>
						{isTranslate ? "Translate to English" : "Translate to French"}
					</button>
				)}
			</div>
			<h2>INFORMATIONS</h2>
			<CocktailTags
				strIBA={cocktailDetails.strIBA}
				strGlass={cocktailDetails.strGlass}
				strTags={cocktailDetails.strTags}
			/>
		</article>
	);
}

export default CocktailDetails;
