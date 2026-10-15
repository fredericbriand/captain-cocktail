import type { ReactNode } from "react";
import { createContext, useContext, useState } from "react";
import type { SortContextType } from "../../types/types";

const SortContext = createContext<SortContextType | undefined>(undefined);

export const SortProvider = ({ children }: { children: React.ReactNode }) => {
	const [sortAscending, setSortAscending] = useState<boolean>(true);
	const toggleSort = () => setSortAscending((s) => !s);

	return (
		<SortContext.Provider value={{ sortAscending, toggleSort }}>
			{children}
		</SortContext.Provider>
	);
};

export const useSort = (): SortContextType | undefined => {
	return useContext(SortContext);
};

export default SortContext;
