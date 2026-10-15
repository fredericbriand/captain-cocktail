import Icon from "../Icon/Icon";
import styles from "./IngredientsSearch.module.scss";

import t from "../../data/en_EN.json";

export default function IngredientsSearch({
	search,
	onSearchChange,
}: {
	search: string;
	onSearchChange: (value: string) => void;
}) {
	return (
		<div className={styles.search}>
			<div>
				<Icon name="search" className={styles.search} />
				<input
					type="text"
					placeholder={t.bar.search.select}
					value={search}
					onChange={(e) => onSearchChange(e.target.value)}
				/>
				{search && (
					<button
						type="button"
						aria-label={t.bar.search.clear}
						onClick={() => onSearchChange("")}
					>
						<Icon name="cross" className={styles.cross} />
					</button>
				)}
			</div>
		</div>
	);
}
