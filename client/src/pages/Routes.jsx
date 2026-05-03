import { RouterProvider, createBrowserRouter } from "react-router"
import NotFound from "@/pages/errors/not-found/page"

import InboxPage from "@/pages/user/inbox"
import SenderPage from "@/pages/user/sender";
import LoginPage from "@/pages/user/login";
import RegisterPage from "@/pages/user/register";

const Routes = () => {
    const routesForPublic = [
        { path: "*", element: <NotFound /> },
        { path: "/inbox", element: <InboxPage /> },
        { path: "/sender", element: <SenderPage /> },
        { path: "/login", element: <LoginPage /> },
        { path: "/register", element: <RegisterPage /> }
    ];

    const router = createBrowserRouter([
        ...routesForPublic,
    ]);

    return <RouterProvider router={router} />;
};

export default Routes;