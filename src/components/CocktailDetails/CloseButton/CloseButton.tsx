import Icon from "../../Icon/Icon";
import styles from "./CloseButton.module.scss";

function CloseButton() {
	return (
		<button
			type="button"
			commandfor="my-dialog"
			command="close"
			className={`${styles["close-button"]}`}
			aria-label="Close"
		>
			<Icon name="cross" />
		</button>
	);
}

export default CloseButton;
