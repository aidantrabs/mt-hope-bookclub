import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PageWrapper } from "@/components/layout/page-wrapper.tsx";
import { ProtectedRoute } from "@/components/layout/protected-route.tsx";
import { LoadingSpinner } from "@/components/ui/loading-spinner.tsx";

const Home = lazy(() => import("@/pages/home.tsx").then((m) => ({ default: m.Home })));
const Books = lazy(() => import("@/pages/books.tsx").then((m) => ({ default: m.Books })));
const BookDetail = lazy(() => import("@/pages/book-detail.tsx").then((m) => ({ default: m.BookDetail })));
const About = lazy(() => import("@/pages/about.tsx").then((m) => ({ default: m.About })));
const Contact = lazy(() => import("@/pages/contact.tsx").then((m) => ({ default: m.Contact })));
const Login = lazy(() => import("@/pages/admin/login.tsx").then((m) => ({ default: m.Login })));
const Dashboard = lazy(() => import("@/pages/admin/dashboard.tsx").then((m) => ({ default: m.Dashboard })));
const BookForm = lazy(() => import("@/pages/admin/book-form.tsx").then((m) => ({ default: m.BookForm })));

const Lazy = ({ children }: { children: React.ReactNode }) => (
    <Suspense fallback={<LoadingSpinner />}>{children}</Suspense>
);

const router = createBrowserRouter([
    {
        element: <PageWrapper />,
        children: [
            {
                path: "/",
                element: (
                    <Lazy>
                        <Home />
                    </Lazy>
                ),
            },
            {
                path: "/discover",
                element: (
                    <Lazy>
                        <Books />
                    </Lazy>
                ),
            },
            {
                path: "/discover/:id",
                element: (
                    <Lazy>
                        <BookDetail />
                    </Lazy>
                ),
            },
            {
                path: "/about",
                element: (
                    <Lazy>
                        <About />
                    </Lazy>
                ),
            },
            {
                path: "/contact",
                element: (
                    <Lazy>
                        <Contact />
                    </Lazy>
                ),
            },
            {
                path: "/admin",
                element: (
                    <Lazy>
                        <Login />
                    </Lazy>
                ),
            },
            {
                element: <ProtectedRoute />,
                children: [
                    {
                        path: "/admin/dashboard",
                        element: (
                            <Lazy>
                                <Dashboard />
                            </Lazy>
                        ),
                    },
                    {
                        path: "/admin/new",
                        element: (
                            <Lazy>
                                <BookForm />
                            </Lazy>
                        ),
                    },
                    {
                        path: "/admin/edit/:id",
                        element: (
                            <Lazy>
                                <BookForm />
                            </Lazy>
                        ),
                    },
                ],
            },
        ],
    },
]);

export const Router = () => <RouterProvider router={router} />;
