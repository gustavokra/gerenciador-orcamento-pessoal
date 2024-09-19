import React from 'react';
import "./Sobre.css"

const Sobre: React.FC = () => {
  return (
    <section id="sobre">
      <div className='container content'>
        <h1>Sobre o Projeto</h1>
        <p>
          O Gerenciador de Orçamento Pessoal  foi criado com o objetivo de ajudar pessoas a
          organizarem suas finanças de forma prática e acessível. Com a possibilidade de adicionar receitas,
          despesas e visualizar gráficos, este aplicativo simplifica o controle do seu orçamento.
        </p>
        <p>
          Criado por Gustavo Kraemer.
        </p>
      </div>
    </section>
  );
};

export default Sobre;
