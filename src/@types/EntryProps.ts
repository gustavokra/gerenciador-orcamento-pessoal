export type EntryProps = {
  id: string;
  type: 'Renda' | 'Despesa';
  description: string;
  amount: number;
  uid: string;
}