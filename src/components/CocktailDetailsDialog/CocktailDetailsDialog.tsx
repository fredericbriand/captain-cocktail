import { useCocktailId } from "../../contexts/CocktailDetailsContext";
import CocktailDetails from "../CocktailDetails/CocktailDetails";
import styles from "./CocktailDetailsDialog.module.scss";

function CocktailDetailsDialog() {
	const { cocktailId } = useCocktailId(); // à renommer useCocktailDetails, cf. l'autre commentaire
	return (
		<dialog id="my-dialog" className={styles.dialog}>
			{cocktailId && <CocktailDetails idDrink={cocktailId} />}
		</dialog>
	);
}

export default CocktailDetailsDialog;
