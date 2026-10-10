import { Link, NavLink } from "react-router-dom";
import logo from "/assets/logo-full.svg";

const btn =
  "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-semibold transition-colors";

const loginClass = ({ isActive }) =>
  `${btn} border bg-surface text-primary hover:bg-page ${
    isActive ? "bg-page" : ""
  }`;

const registerClass = () =>
  `${btn} bg-primary text-white hover:bg-primary-hover`;

export default function PublicNavbar() {
  return (
    <header className="sticky top-0 z-40 border-b bg-surface">
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6"
      >
        <Link to="/" aria-label="Stockly home" className="flex items-center">
          <img src={logo} alt="Stockly" className="h-8 w-auto sm:h-9" />
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <NavLink to="/login" className={loginClass}>
            Log in
          </NavLink>
          <NavLink to="/register" className={registerClass}>
            Register
          </NavLink>
        </div>
      </nav>
    </header>
  );
}