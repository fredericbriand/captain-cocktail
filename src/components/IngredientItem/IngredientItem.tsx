import { useMyIngredients } from "../../contexts/MyIngredientsContext";
import t from "../../data/en_EN.json";
import type { IngredientProps } from "../../types/types";
import Icon from "../Icon/Icon";
import styles from "./IngredientItem.module.scss";

function IngredientItem({ strIngredient, strMeasure }: IngredientProps) {
	const { myIngredients } = useMyIngredients();
	const isOwned = myIngredients.some(
		(i) => i.strIngredient1.toLowerCase() === strIngredient?.toLowerCase(),
	);

	return (
		<>
			{!strIngredient ? null : (
				<li className={styles["ingr-and-measure"]}>
					<span
						className={`${styles.status} ${isOwned ? styles.owned : styles.missing}`}
					>
						<Icon
							name={isOwned ? "checkmark" : "cross"}
							className={styles["status-icon"]}
						/>
					</span>
					<p>
						{strMeasure && <span>{strMeasure} of&nbsp;</span>}
						<span>{strIngredient}</span>
					</p>
					{!isOwned && <span className={styles.badge}>{t.details.toPlan}</span>}
				</li>
			)}
		</>
	);
}

export default IngredientItem;
