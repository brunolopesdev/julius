import "./index.scss";
import Logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";
import {
  MdAdd,
  MdList,
  MdDeleteOutline,
  MdModeEditOutline,
  MdOutlineSpaceDashboard,
  MdClose,
} from "react-icons/md";
import { Button } from "../Button/Index";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import { FaBars } from "react-icons/fa";

export const Sidebar = () => {
  const { logout, currentUser } = useAuth();
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => {
    setSidebar(!sidebar);
  };

  async function handleLogout() {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <FaBars
        onClick={showSidebar}
        size={30}
        color={"#2e4a65"}
        className="open-sidebar"
      />
      <header className={sidebar ? "header active" : "header"}>
        <MdClose
          onClick={showSidebar}
          size={40}
          color={"#fff"}
          className="close-sidebar"
        />
        <div className="header__container">
          <div className="logo">
            <Link to="/">
              <img src={Logo} alt="Logo - Julius" />
            </Link>
          </div>
          <ul className="header__items">
            {/* <li className='header__links'>Bruno</li>
                <li className='header__links'>Jessyca</li> */}
            <li className="header__links">
              <i className="icons">
                <MdOutlineSpaceDashboard />
              </i>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li className="header__links">
              <i className="icons">
                <MdAdd />
              </i>{" "}
              <Link to="/adicionar">Adicionar</Link>
            </li>
            <li className="header__links">
              <i className="icons">
                <MdList />
              </i>{" "}
              <Link to="/listar">Listar</Link>
            </li>
          </ul>
        </div>
        {currentUser && <Button text="Sair" data={handleLogout} />}
      </header>
    </>
  );
};
