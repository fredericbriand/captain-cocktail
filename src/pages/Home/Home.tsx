import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CocktailCard from "../../components/CocktailCard/CocktailCard";
import CocktailSuggestHome from "../../components/CocktailSuggestHome/CocktailSuggestHome";
import CocktailTrending from "../../components/CocktailTrending/CocktailTrending";
import Icon from "../../components/Icon/Icon";
import { useFavorites } from "../../contexts/FavoritesContext";
import type { Cocktail } from "../../types/types";
import { getCocktailById } from "../../utils/getCocktailById";
import styles from "./Home.module.scss";

function Home() {
	const { favorites } = useFavorites();
	const [recentCocktails, setRecentCocktails] = useState<Cocktail[]>([]);
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		async function fetchRecentFavorites() {
			setLoading(true);

			const lastTwoIds = favorites.slice(-2).reverse();

			const results = await Promise.all(
				lastTwoIds.map((id) => getCocktailById(id)),
			);

			setRecentCocktails(results.filter((c): c is Cocktail => c !== null));
			setLoading(false);
		}

		if (favorites.length > 0) {
			fetchRecentFavorites();
		} else {
			setRecentCocktails([]);
		}
	}, [favorites]);

	return (
		<section className={`${styles.home} home`}>
			<img
				src="../../assets/images/logotransp.png"
				alt="Captain Cocktail's logo"
				className={styles.logo}
			/>
			<p className={styles.presentation}>
				A cocktail catalog right at your fingertips, tailored to what you
				already have at home.
			</p>
			<article className={styles["glass-morphed"]}>
				<Icon name="readytoshake" />
				<h2>Ready to shake ?</h2>
				<p>
					Add your ingredients and find your next favorite cocktail in seconds.
				</p>
				<button
					type="button"
					className={`${styles["add-ingredients"]} pink-button`}
				>
					<Link to="/bar">Add ingredients</Link>
				</button>
				<p className={styles["fast-free"]}>
					It's fast, free, and requires no registration.
				</p>
			</article>
			<article className={styles.moment}>
				<CocktailTrending />
			</article>
			<article className={styles["all-cocktails"]}>
				<h3>All cocktails</h3>
				<p>Browse our complete collection for inspiration.</p>
				<button type="button" className={styles["browse-all"]}>
					<Link to="/cocktails">
						Browse cocktails <Icon name="arrowright" />
					</Link>
				</button>
			</article>
			<article className={styles["cocktail-favorites"]}>
				<div className={styles.favorites}>
					<h2>Recents favorites</h2>
					<Link to="/favorites">See all &rsaquo;</Link>
				</div>
				<div className={styles["favorites-list"]}>
					{loading ? (
						<p className={styles.loading}>Loading your favorites...</p>
					) : recentCocktails.length > 0 ? (
						<div className={styles["suggestions-grid"]}>
							{recentCocktails.map((cocktail) => (
								<CocktailCard key={cocktail.idDrink} cocktail={cocktail} />
							))}
						</div>
					) : (
						<p className={styles["no-favorites"]}>
							You have no favorites at the moment.
						</p>
					)}
				</div>
				<div>
					<CocktailSuggestHome />
				</div>
			</article>
		</section>
	);
}

export default Home;
