import { Link } from 'react-router-dom';
import { EnumPaginas } from '../../@types/EnumPaginas';
import { useAuth } from '../../context/AuthContext';
import Logout from '../Logout/Logout';
import Logo from "../../assets/logo_icon.svg";
import "../../styles/utility.css";
import "./navigation.css";

const Navigation: React.FC = () => {
  const { user } = useAuth();

  return (
    <>
      <header className="container py-sm">
        <nav>
          <div className="desktop-only">
            <ul className="flex gap-1">
              <li><Link to={EnumPaginas.home}>Home</Link></li>
              <li><Link to={EnumPaginas.dashboard}>Dashboard</Link></li>
              <li><Link to={EnumPaginas.sobre}>Sobre</Link></li>
              {user ? (
                <li><Logout /></li>
              ) : (
                <>
                  <li><Link to={EnumPaginas.login}>Login</Link></li>
                  <li><Link to={EnumPaginas.register}>Cadastro</Link></li>
                </>
              )}
            </ul>
          </div>
        </nav>
      </header >
    </>
  );
};

export default Navigation