import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useFirebase } from '../../hook/useFirebase';
import { EntryProps } from '../../@types/EntryProps';
import "./Dashboard.css"
import Button from '../../components/Button/Button';

const Dashboard: React.FC = () => {
  const [entries, setEntries] = useState<EntryProps[]>([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState<number>(0);
  const [type, setType] = useState<'Renda' | 'Despesa'>('Renda');
  const [editId, setEditId] = useState<string | null>(null);
  const { user } = useAuth();
  const api = useFirebase();

  const fetchEntries = async () => {
    if (user) {
      const data = api.entry.selectAll(user.uid)
      setEntries(await data);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, [user, entries]);

  const handleAddEntry = async () => {
    if (user) {
      if (editId !== null) {
        api.entry.update({ id: editId, description, amount, type })
        setEditId(null);
      } else {
        api.entry.insert({ description, amount, type, uid: user.uid })
      }
      setDescription('');
      setAmount(0);
      setType('Renda');
      entries.push({ id: user.uid, description, amount, type, uid: user.uid })
      await fetchEntries()
    }
  };

  const handleEdit = (id: string) => {
    const entryToEdit = entries.find(entry => entry.id === id);
    if (entryToEdit) {
      setDescription(entryToEdit.description);
      setAmount(entryToEdit.amount);
      setType(entryToEdit.type);
      setEditId(id);
    }
  };

  const handleDelete = async (id: string) => {
    api.entry.delete(id)
    setEntries(entries.filter(entry => entry.id !== id));
  };

  const totalIncome = entries
    .filter(entry => entry.type === 'Renda')
    .reduce((acc, entry) => acc + entry.amount, 0);

  const totalExpenses = entries
    .filter(entry => entry.type === 'Despesa')
    .reduce((acc, entry) => acc + entry.amount, 0);

  const balance = totalIncome - totalExpenses;

  return (
    <section id='dashboard'>
      <div className='container'>
        <h1>Dashboard</h1>
        <div className='layout'>
          <div className='addEntry'>
            <h2>Adicionar Entrada</h2>
            <input
              type="text"
              placeholder="Descrição"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              type="number"
              placeholder="Valor"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
            />
            <select value={type} onChange={(e) => setType(e.target.value as 'Renda' | 'Despesa')}>
              <option value="Renda">Renda</option>
              <option value="Despesa">Despesa</option>
            </select>
            <Button
              text={editId ? 'Editar Entrada' : 'Adicionar Entrada'}
              onClick={handleAddEntry}
              secondary={false} />
          </div>
          <div className='entries'>
            <h2>Entradas</h2>
            <div className='entries-header'>
              <span>Desc</span>
              <span>Vlr</span>
              <span>Ações</span>
            </div>
            <ul>
              {entries.map(entry => (
                <li key={entry.id} className='entry-item'>
                  <span>{entry.description}</span>
                  <span className={entry.type === "Renda" ?
                      "renda"
                    : "despesa"}>R$ {entry.amount}</span>
                  <span>
                    <button onClick={() => handleEdit(entry.id)}>Editar</button>
                    <button onClick={() => handleDelete(entry.id)}>Remover</button>
                  </span>
                  <hr />
                  <hr />
                  <hr />
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2>Resumo</h2>
            <p><strong>Total de Renda:</strong> R$ {totalIncome}</p>
            <p><strong>Total de Despesas:</strong> R$ {totalExpenses}</p>
            <p><strong>Saldo Restante:</strong> R$ {balance}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
