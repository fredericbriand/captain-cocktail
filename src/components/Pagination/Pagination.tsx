import type { PaginationProps as Props } from "../../types/types";
import Icon from "../Icon/Icon";
import styles from "./Pagination.module.scss";

function Pagination({ currentPage, totalPages, onPageChange }: Props) {
	const NB_PAGES = 5;
	let startPage = Math.max(1, currentPage - Math.floor(NB_PAGES / 2));
	let endPage = startPage + NB_PAGES - 1;
	if (endPage > totalPages) {
		endPage = totalPages;
		startPage = Math.max(1, endPage - NB_PAGES + 1);
	}

	return (
		<nav aria-label="Pagination" className={styles.pagination}>
			<button
				type="button"
				aria-label="First page"
				onClick={() => onPageChange(1)}
				disabled={currentPage === 1}
			>
				<Icon name="fullleft" className={styles["icon-arrow"]} />
			</button>
			<button
				type="button"
				aria-label="Previous page"
				onClick={() => onPageChange(currentPage - 1)}
				disabled={currentPage === 1}
			>
				<Icon name="left" className={styles["icon-arrow"]} />
			</button>

			{Array.from(
				{ length: endPage - startPage + 1 },
				(_, i) => startPage + i,
			).map((page) => (
				<button
					key={page}
					type="button"
					aria-label={`Page ${page}`}
					onClick={() => onPageChange(page)}
					className={currentPage === page ? styles.active : ""}
				>
					{page}
				</button>
			))}

			<button
				type="button"
				aria-label="Next page"
				onClick={() => onPageChange(currentPage + 1)}
				disabled={currentPage === totalPages}
			>
				<Icon name="right" className={styles["icon-arrow"]} />
			</button>
			<button
				type="button"
				aria-label="Last page"
				onClick={() => onPageChange(totalPages)}
				disabled={currentPage === totalPages}
			>
				<Icon name="fullright" className={styles["icon-arrow"]} />
			</button>
		</nav>
	);
}

export default Pagination;
