import { NavLink } from "react-router-dom";
import { useAuthentication } from "../hooks/useAuthentication";
import { useAuthValue } from "../contexts/AuthContext";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const { logout } = useAuthentication();
  const { user } = useAuthValue();

  return (
    <nav className={styles.navbar}>
      <NavLink className={styles.brand} to="/">
        💪Mundo<span>MAROMBA</span>
      </NavLink>
      <ul className={styles.links_list}>
        <li>
          <NavLink to="/" className={({ isActive }) => (isActive ? styles.active : "")}>
            Home
          </NavLink>
        </li>
        {!user && (
          <>
            <li>
              <NavLink to="/login" className={({ isActive }) => (isActive ? styles.active : "")}>
                Entrar
              </NavLink>
            </li>
            <li>
              <NavLink to="/register" className={({ isActive }) => (isActive ? styles.active : "")}>
                Cadastrar
              </NavLink>
            </li>
          </>
        )}
        {user && (
          <>
            <li>
              <NavLink to="/posts/create" className={({ isActive }) => (isActive ? styles.active : "")}>
                Novo post
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard" className={({ isActive }) => (isActive ? styles.active : "")}>
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={({ isActive }) => (isActive ? styles.active : "")}>
                Sobre
              </NavLink>
            </li>
            <li>
              <img src={user.photoURL} alt={user.displayName} className={styles.profile_image} />
            </li>
            <li>
              <button onClick={logout}>Sair</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
