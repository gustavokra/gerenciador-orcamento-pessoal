import { Link, useNavigate } from 'react-router-dom';
import { EnumPaginas } from '../../@types/EnumPaginas';
import { useAuth } from '../../context/AuthContext';
import Logout from '../Logout/Logout';
import Logo from "../../assets/logo_icon.svg";
import Button from '../Button/Button';
import "./Navigation.css";

const Navigation: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate(EnumPaginas.register);
  };

  const handleLoginClick = () => {
    navigate(EnumPaginas.login);
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
          <div className="flex items-center">
            {user ? (
              <>
                <div className='desktop-only' style={{ marginLeft: 110 }}>
                  <Logout />
                </div>
              </>
            ) : (
              <div className="flex items-center gap-1" >
                <ul className="flex ">
                  <li><Link to={EnumPaginas.login}>Login</Link></li>
                </ul>
                <Button text="Cadastre-se"
                  secondary={true}
                  onClick={handleRegisterClick} />
              </div>
            )}
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navigation