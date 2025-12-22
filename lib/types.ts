export interface Option {
  _id: string;
  name: string;
  votes: number;
}

export interface Debate {
  _id: string;
  slug: string;
  title: string;
  description?: string;
  category: string;
  subCategory?: string;
  totalVotes: number;
  isMoreOptionAllowed?: boolean;
  options: Option[];
  createdAt: string;
}
