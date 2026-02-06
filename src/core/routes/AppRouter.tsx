import { Routes, Route } from "react-router-dom";
import { APP_ROUTES } from "./config";
import { ProtectedRoute, PublicRoute } from "./guards";

// Public routes that should redirect to dashboard if authenticated
const PUBLIC_PATHS = ["/", "/login", "/onboarding"];

const AppRouter = () => {
    return (
        <Routes>
            {APP_ROUTES.map((route) => {
                const isPublicRoute = PUBLIC_PATHS.includes(route.path);

                if (route.protected) {
                    // Protected routes - require authentication
                    return (
                        <Route
                            key={route.path}
                            path={route.path}
                            element={
                                <ProtectedRoute>
                                    {route.element}
                                </ProtectedRoute>
                            }
                        />
                    );
                } else if (isPublicRoute) {
                    // Public routes - redirect to dashboard if already authenticated
                    return (
                        <Route
                            key={route.path}
                            path={route.path}
                            element={
                                <PublicRoute>
                                    {route.element}
                                </PublicRoute>
                            }
                        />
                    );
                } else {
                    // Other routes (like 404) - no guards
                    return (
                        <Route
                            key={route.path}
                            path={route.path}
                            element={route.element}
                        />
                    );
                }
            })}
        </Routes>
    );
};

export default AppRouter;
