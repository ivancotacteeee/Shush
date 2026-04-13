import { RouterProvider, createBrowserRouter } from "react-router"
import NotFound from "@/pages/errors/not-found/page"

import TestPage from "@/pages/user/page"

const Routes = () => {
    const routesForPublic = [
        { path: "*", element: <NotFound /> },
        { path: "/test", element: <TestPage /> }
    ];

    const router = createBrowserRouter([
        ...routesForPublic,
    ]);

    return <RouterProvider router={router} />;
};

export default Routes;