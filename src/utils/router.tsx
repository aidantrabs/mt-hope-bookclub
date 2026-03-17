import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PageWrapper } from "@layout";
import { Home, Books, BookDetail, About, Contact, Login, Dashboard, BookForm } from "@pages";

export const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<PageWrapper />}>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="/books/:id" element={<BookDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<Login />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/new" element={<BookForm />} />
        <Route path="/admin/edit/:id" element={<BookForm />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
