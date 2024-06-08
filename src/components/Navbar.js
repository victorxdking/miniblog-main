import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuthentication } from "../hooks/useAuthentication";
import { useAuthValue } from "../contexts/AuthContext";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const { logout } = useAuthentication();
  const { user } = useAuthValue();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [photoURL, setPhotoURL] = useState(null);

  useEffect(() => {
    if (user && user.photoURL) {
      setPhotoURL(user.photoURL);
    }
  }, [user]);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

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
            <li className={styles.profile_container} onClick={toggleDropdown}>
              {photoURL && (
                <img src={photoURL} alt={user.displayName} className={styles.profile_image} />
              )}
              {dropdownVisible && (
                <div className={styles.dropdown_menu}>
                  <button className={styles.logout_button} onClick={logout}>Sair</button>
                </div>
              )}
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
