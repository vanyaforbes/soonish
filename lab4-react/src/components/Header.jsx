// Shared header. Props: routes (the links) and currentPath (the active page).
export default function Header({ routes, currentPath }) {
  return (
    <header className="site-header">
      <div className="wrap header-row">
        <a className="logo" href="#/home">Soonish</a>
        <nav className="main-nav" aria-label="Main">
          <ul>
            {routes.map((route) => (
              <li key={route.path}>
                <a href={"#/" + route.path} aria-current={route.path === currentPath ? "page" : undefined}>
                  {route.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
