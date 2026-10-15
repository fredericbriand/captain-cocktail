import type { Cocktail } from "../types/types";

// Cocktail "maison" (n'existe pas dans l'API TheCocktailDB).
// idDrink "700" = notre identifiant local, sert à l'aiguillage du modal.
export const blueSignature: Cocktail = {
	idDrink: "700",
	strDrink: "Blue Signature",
	strTags: "French,Layered,Summer,Featured,Blue,White,Red",
	strCategory: "Cocktail",
	strAlcoholic: "Alcoholic",
	strGlass: "Hurricane glass",
	strInstructions:
		"Fill a hurricane glass with ice. Pour the grenadine into the bottom of the glass. In a shaker, combine the vodka and lime juice, then gently pour the mixture over the grenadine. Slowly layer the Cream of Coconut over the back of a spoon to create the white layer. Finish by carefully pouring the Blue Curacao over the back of a spoon to create the blue layer. Serve immediately without stirring.",
	strInstructionsFR:
		"Remplissez un verre Hurricane de glaçons. Versez la grenadine au fond du verre. Mélangez la vodka avec le jus de citron vert puis versez délicatement sur la grenadine. Versez lentement la crème de coco sur le dos d'une cuillère afin de créer la couche blanche. Terminez en ajoutant doucement le curaçao bleu pour former la couche bleue. Servez immédiatement sans mélanger afin de conserver l'effet tricolore.",
	strDrinkThumb: "/assets/images/cocktails/blue-signature.png",
	strIngredient1: "Vodka",
	strMeasure1: "4 cl",
	strIngredient2: "Blue Curacao",
	strMeasure2: "2 cl",
	strIngredient3: "Cream of Coconut",
	strMeasure3: "2 cl",
	strIngredient4: "Grenadine",
	strMeasure4: "2 cl",
	strIngredient5: "Lime Juice",
	strMeasure5: "1 cl",
	strIngredient6: "Ice",
	strMeasure6: "Fill glass",
	strImageAttribution: "Captain Cocktail",
	strCreativeCommonsConfirmed: "No",
	dateModified: "2026-07-10",
};
