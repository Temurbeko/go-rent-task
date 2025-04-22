export type GitHubRepo = {
  full_name: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  description: string | null;
  language: string | null;
  owner: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
};
export type GitHubSearchResponse = {
  items: GitHubRepo[];
  total_count: number;
  incomplete_results: boolean;
};

export type Column<T> = {
  header: string;
  accessor: keyof T;
  renderCell: (row: T) => React.ReactNode;
  sortable?: boolean;
  filterable?: boolean;
};

export type TableProps<T> = {
  columns: Column<T>[];
  rows: T[];
};
