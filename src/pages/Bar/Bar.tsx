import { useEffect, useState } from "react";

import Icon from "../../components/Icon/Icon";
import IngredientsDropdown from "../../components/IngredientsDropdown/IngredientsDropdown";
import IngredientsSearch from "../../components/IngredientsSearch/IngredientsSearch";
import MyIngredients from "../../components/MyIngredients/MyIngredients";
import MySuggestions from "../../components/MySuggestions/MySuggestions";

import styles from "./Bar.module.scss";

import { API_BASE } from "../../config";
import { useMyIngredients } from "../../contexts/MyIngredientsContext";
import t from "../../data/en_EN.json";
import type { IngredientListItem } from "../../types/types";

export default function Bar() {
	const { myIngredients, addIngredient, removeIngredient, clearIngredients } =
		useMyIngredients();

	const [ingredients, setIngredients] = useState<IngredientListItem[]>([]);
	const [search, setSearch] = useState("");

	useEffect(() => {
		fetch(`${API_BASE}/list.php?i=list`)
			.then((res) => res.json())
			.then((data) => setIngredients(data.drinks));
	}, []);

	const filteredIngredients =
		search.length >= 3
			? ingredients.filter((ingredient) =>
					ingredient.strIngredient1
						.toLowerCase()
						.includes(search.toLowerCase()),
				)
			: [];

	return (
		<div className={styles.page}>
			<h1 className={styles.title}>
				<span>{t.bar.title}</span>
				<Icon name="palm" />
			</h1>
			<IngredientsSearch search={search} onSearchChange={setSearch} />
			{myIngredients.length === 0 && search.length === 0 && (
				<div className={`${styles["how-to"]} how-to`}>
					<h3>{t.bar.howTo.title}</h3>
					<ul>
						{t.bar.howTo.steps.map((step, i) => (
							<li key={step.id} className={`${styles[step.id]}`}>
								<span>{i + 1}</span>
								<div>
									<span>{step.line1}</span>
									<span>{step.line2}</span>
								</div>
							</li>
						))}
					</ul>
				</div>
			)}
			<div className={styles.container}>
				<IngredientsDropdown
					ingredients={filteredIngredients}
					onSelect={addIngredient}
					search={search}
				/>
				<MyIngredients
					selectedIngredients={myIngredients}
					onRemove={removeIngredient}
					onClear={clearIngredients}
				/>
				<MySuggestions selectedIngredients={myIngredients} />
			</div>
		</div>
	);
}
