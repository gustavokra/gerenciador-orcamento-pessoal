import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useFirebase } from '../../hook/useFirebase';
import { EntryProps } from '../../@types/EntryProps';

const Dashboard: React.FC = () => {
  const [entries, setEntries] = useState<EntryProps[]>([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState<number>(0);
  const [type, setType] = useState<'income' | 'expense'>('income');
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
        api.entry.insert({ description, amount, type, uid: user.uid})
      }
      setDescription('');
      setAmount(0);
      setType('income');
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
    .filter(entry => entry.type === 'income')
    .reduce((acc, entry) => acc + entry.amount, 0);

  const totalExpenses = entries
    .filter(entry => entry.type === 'expense')
    .reduce((acc, entry) => acc + entry.amount, 0);

  const balance = totalIncome - totalExpenses;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Dashboard</h1>
      <div>
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
        <select value={type} onChange={(e) => setType(e.target.value as 'income' | 'expense')}>
          <option value="income">Renda</option>
          <option value="expense">Despesa</option>
        </select>
        <button onClick={handleAddEntry}>
          {editId ? 'Editar Entrada' : 'Adicionar Entrada'}
        </button>
      </div>

      <div>
        <h2>Entradas</h2>
        <ul>
          {entries.map(entry => (
            <li key={entry.id}>
              {entry.description} - R$ {entry.amount} ({entry.type === 'income' ? 'Renda' : 'Despesa'})
              <button onClick={() => handleEdit(entry.id)}>Editar</button>
              <button onClick={() => handleDelete(entry.id)}>Remover</button>
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
  );
};

export default Dashboard;
