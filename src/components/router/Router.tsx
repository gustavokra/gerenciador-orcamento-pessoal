import React, {useState} from "react"
import Dashboard from "../../pages/DashBoard/Dashboard"
import Home from "../../pages/Home/Home"
import Login from "../../pages/Login/Login"
import Sobre from "../../pages/Sobre/Sobre"

enum EnumPaginas {
    "dashboard" = "dashboard",
    "home" = "home",
    "sobre" = "sobre",
    "login" = "login"
}

const Header = () => {
    const [getPaginaAtual, setPaginaAtual] = useState<EnumPaginas>(EnumPaginas.home)

    const renderizarCabecario = () => (
        <div>
            <button className='button' onClick={() => setPaginaAtual(EnumPaginas.dashboard)}>Dashboard</button>
            <button className='button' onClick={() => setPaginaAtual(EnumPaginas.home)}>Home</button>
            <button className='button' onClick={() => setPaginaAtual(EnumPaginas.sobre)}>Sobre</button>
            <button className='button' onClick={() => setPaginaAtual(EnumPaginas.login)}>Login</button>
        </div>
    )

    const renderizarPagina = () => {
        switch(getPaginaAtual) {
            case EnumPaginas.dashboard: return <Dashboard/>
            case EnumPaginas.home: return <Home/>
            case EnumPaginas.sobre: return <Sobre/>
            case EnumPaginas.login: return <Login/>
            default: return  <Home/>
        }
    }

    return (
        <div className='router'>
            {renderizarCabecario()}
            {renderizarPagina()}
        </div>
    )

}

export default Header