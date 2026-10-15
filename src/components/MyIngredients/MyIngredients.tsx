import type { IngredientListItem } from "../../types/types";

import styles from "./MyIngredients.module.scss";

import { useIsSticky } from "../../hooks/useIsSticky";

import t from "../../data/en_EN.json";
import { pluralize } from "../../utils/pluralize";
import Icon from "../Icon/Icon";

export default function MyIngredients({
	selectedIngredients,
	onRemove,
	onClear,
}: {
	selectedIngredients: IngredientListItem[];
	onRemove: (ingredient: IngredientListItem) => void;
	onClear: () => void;
}) {
	const { ref, isSticky } = useIsSticky(90);

	return (
		<section ref={ref} className={styles.ingredients}>
			<div className={styles.title}>
				{selectedIngredients.length > 0 && (
					<>
						<h2>
							<span>{t.bar.myIngredients.title}&nbsp;</span>
							<span>
								{selectedIngredients.length}&nbsp;
								{pluralize(
									selectedIngredients.length,
									t.bar.ingredient,
									t.bar.ingredients,
								)}
							</span>
						</h2>
						<button type="button" className={styles.clear} onClick={onClear}>
							<Icon name="trashcan" />
							<span>{t.bar.myIngredients.empty}</span>
						</button>
					</>
				)}
			</div>
			<ul className={isSticky ? styles.sticky : ""}>
				{selectedIngredients.map((selectedIngredient) => (
					<li key={selectedIngredient.strIngredient1}>
						<span>{selectedIngredient.strIngredient1}</span>
						<button
							type="button"
							aria-label={`${t.bar.myIngredients.remove} ${selectedIngredient.strIngredient1}`}
							onClick={() => onRemove(selectedIngredient)}
						>
							<Icon name="cross" />
						</button>
					</li>
				))}
			</ul>
		</section>
	);
}
