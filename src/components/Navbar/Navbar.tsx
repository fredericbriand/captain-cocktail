import { NavLink } from "react-router-dom";
import Icon from "../Icon/Icon";
import styles from "./Navbar.module.scss";

const navLinks = [
	{ path: "/", icon: "house", label: "Home" },
	{ path: "/cocktails", icon: "martini", label: "Cocktails" },
	{ path: "/bar", icon: "bottle-wine", label: "Bar" },
	{ path: "/favorites", icon: "star", label: "Favorites" },
];

function Navbar() {
	return (
		<nav className={styles["nav-main"]} aria-label="Main navigation">
			<ul className={styles["nav-list"]}>
				{navLinks.map((link) => (
					<li key={link.path}>
						<NavLink
							to={link.path}
							className={({ isActive }) =>
								isActive ? styles["nav-link-active"] : styles["nav-link"]
							}
						>
							<Icon name={link.icon} className={styles["nav-icon"]} />
							<span className={styles["nav-label"]}>{link.label}</span>
						</NavLink>
					</li>
				))}
			</ul>
		</nav>
	);
}

export default Navbar;
