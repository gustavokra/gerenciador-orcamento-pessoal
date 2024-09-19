import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { EnumPaginas } from '../../@types/EnumPaginas';
import Logo from "../../assets/logo_icon.svg";
import { useAuth } from '../../context/AuthContext';
import Button from '../Button/Button';
import Logout from '../Logout/Logout';
import Close from "../../assets/close_icon.svg"
import Amburguer from "../../assets/amburguer_icon.svg"
import "./Menu.css";
import "../../styles/utility.css";

const Menu: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [showMobileMenu, setShowMobileMenu] = useState(false);
  useEffect(() => {
    const atribute = showMobileMenu ? "hidden" : "visible"

    document.documentElement.style.overflowY = atribute
  }, [showMobileMenu])

  const handleRegisterClick = () => {
    setShowMobileMenu(false)
    navigate(EnumPaginas.register);
  };

  return (
    <>
      <header className="container py-sm">
        <nav className='flex items-center justify-between'>
          <img src={Logo} alt="Logo Datasage" width={220} height={80} />
          <div className="desktop-only">
            <ul className="flex gap-1">
              <li><Link to={EnumPaginas.home}>Home</Link></li>
              <li><Link to={EnumPaginas.dashboard}>Dashboard</Link></li>
              <li><Link to={EnumPaginas.sobre}>Sobre</Link></li>
            </ul>
          </div>
          <div className="flex items-center desktop-only">
            {user ? (
              <div style={{ marginLeft: 110 }}>
                <Logout />
              </div>
            ) : (
              <div className="desktop-only" >
                <ul className="flex gap-1 items-center">
                  <li><Link to={EnumPaginas.login}>Login</Link></li>
                  <Button text="Cadastre-se"
                    secondary={true}
                    onClick={handleRegisterClick} />
                </ul>
              </div>
            )}
          </div>
          <div className="mobile-menu">
            {showMobileMenu ?
              <div className="mobile-menu-content">
                <div className="container flex">
                  <ul>
                    <li><Link to={EnumPaginas.home} onClick={() => setShowMobileMenu(!showMobileMenu)}>Home</Link></li>
                    <li><Link to={EnumPaginas.dashboard} onClick={() => setShowMobileMenu(!showMobileMenu)}>Dashboard</Link></li>
                    <li><Link to={EnumPaginas.sobre} onClick={() => setShowMobileMenu(!showMobileMenu)}>Sobre</Link></li>
                    {user ? (
                      <li>
                        <Logout />
                      </li>
                    ) : (
                      <>
                        <li>
                          <Link to={EnumPaginas.login} onClick={() => setShowMobileMenu(!showMobileMenu)}>Login</Link>
                        </li>
                        <li>
                          <Button text="Cadastre-se"
                            secondary={true}
                            onClick={handleRegisterClick} />
                        </li>
                      </>
                    )}
                  </ul>
                  <span onClick={() => setShowMobileMenu(!showMobileMenu)} className="btn-wrapper">
                    <img src={Close} alt="ícone fechar menu" width={24} height={24} />
                  </span>
                </div>
              </div>
              : <span onClick={() => setShowMobileMenu(!showMobileMenu)} className="btn-wrapper">
                <img src={Amburguer} alt="ícone menu" width={24} height={24} />
              </span>
            }
          </div>
        </nav >
      </header >
    </>
  );
};

export default Menu