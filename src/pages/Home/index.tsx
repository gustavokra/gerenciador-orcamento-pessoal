import React from 'react';

const Home: React.FC = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Bem-vindo ao Gerenciador de Orçamento Pessoal</h1>
      <p>
        Este aplicativo permite que você gerencie sua renda e despesas mensais de forma simples e eficiente. 
        Aqui, você pode adicionar, editar e excluir entradas de receitas e despesas, e visualizar um resumo 
        das suas finanças com gráficos e relatórios.
      </p>
      <p>
        Com o <strong>Gerenciador de Orçamento Pessoal</strong>, você terá controle total sobre suas finanças e 
        poderá tomar decisões informadas sobre seus gastos.
      </p>
    </div>
  );
};

export default Home;
