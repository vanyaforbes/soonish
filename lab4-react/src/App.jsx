import { useEffect, useState } from "react";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import HomePage from "./pages/HomePage.jsx";

const ROUTES = [
  { path: "home", label: "Home", page: HomePage },
];

function readRoute() {
  return window.location.hash.replace("#/", "") || "home";
}

export default function App() {
  const [route, setRoute] = useState(readRoute);

  // The address bar decides the page, so refresh and the Back button keep working.
  useEffect(() => {
    function handleHashChange() {
      setRoute(readRoute());
      window.scrollTo(0, 0);
    }
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const current = ROUTES.find((item) => item.path === route) || ROUTES[0];
  const Page = current.page;

  return (
    <>
      <Header routes={ROUTES} currentPath={current.path} />
      <main>
        <Page />
      </main>
      <Footer />
    </>
  );
}
