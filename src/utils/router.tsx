import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PageWrapper, ProtectedRoute } from "@layout";
import { Home, Books, BookDetail, About, Contact, Login, Dashboard, BookForm } from "@pages";

const router = createBrowserRouter([
  {
    element: <PageWrapper />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/discover", element: <Books /> },
      { path: "/discover/:id", element: <BookDetail /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      { path: "/admin", element: <Login /> },
      {
        element: <ProtectedRoute />,
        children: [
          { path: "/admin/dashboard", element: <Dashboard /> },
          { path: "/admin/new", element: <BookForm /> },
          { path: "/admin/edit/:id", element: <BookForm /> },
        ],
      },
    ],
  },
]);

export const Router = () => <RouterProvider router={router} />;
