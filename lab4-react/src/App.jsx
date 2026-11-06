import { useEffect, useState } from "react";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import HomePage from "./pages/HomePage.jsx";
import ProblemPage from "./pages/ProblemPage.jsx";
import HowItWorksPage from "./pages/HowItWorksPage.jsx";
import ShelfGuidePage from "./pages/ShelfGuidePage.jsx";
import FridgeRulesPage from "./pages/FridgeRulesPage.jsx";
import AiRescuePage from "./pages/AiRescuePage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import FridgePage from "./pages/FridgePage.jsx";

const ROUTES = [
  { path: "home", label: "Home", page: HomePage },
  { path: "fridge", label: "My fridge", page: FridgePage },
  { path: "problem", label: "The problem", page: ProblemPage },
  { path: "how-it-works", label: "How it works", page: HowItWorksPage },
  { path: "shelf-guide", label: "Shelf guide", page: ShelfGuidePage },
  { path: "fridge-rules", label: "Fridge rules", page: FridgeRulesPage },
  { path: "ai-rescue", label: "AI rescue", page: AiRescuePage },
  { path: "about", label: "About", page: AboutPage },
  { path: "contact", label: "Contact", page: ContactPage },
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
