import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router-dom";

import App from "./App";
import "./index.scss";

import Bar from "./pages/Bar/Bar";
import Cocktails from "./pages/Cocktails/Cocktails";
import Favorites from "./pages/Favorites/Favorites";
import Home from "./pages/Home/Home";

const router = createBrowserRouter([
	{
		element: <App />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/bar",
				element: <Bar />,
			},
			{
				path: "/cocktails",
				element: <Cocktails />,
			},
			{
				path: "/favorites",
				element: <Favorites />,
			},
		],
	},
]);

const rootElement = document.getElementById("root");

if (rootElement != null) {
	ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
