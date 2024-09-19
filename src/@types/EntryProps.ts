export type EntryProps = {
  id: string;
  type: 'income' | 'expense';
  description: string;
  amount: number;
  uid: string;
}