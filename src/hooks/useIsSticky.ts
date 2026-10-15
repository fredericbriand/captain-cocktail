import { useEffect, useRef, useState } from "react";

export function useIsSticky(offset = 90) {
	const ref = useRef<HTMLElement>(null);
	const naturalOffsetRef = useRef<number>(0);
	const [isSticky, setIsSticky] = useState(false);

	useEffect(() => {
		if (ref.current) naturalOffsetRef.current = ref.current.offsetTop;

		function handleScroll() {
			const stuck =
				window.scrollY > 0 &&
				window.scrollY >= naturalOffsetRef.current - offset;
			setIsSticky((prev) => (stuck !== prev ? stuck : prev));
		}
		handleScroll();
		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, [offset]);

	return { ref, isSticky };
}
