"use client";
import { getBestRepos } from "@/api/github.api";
import { useParamState } from "@/hooks";
import { Column, GitHubRepo } from "@/types";
import { useState } from "react";
import Pagination from "./Pagination";
import SearchInput from "./SearchInput";
import Table from "./Table";

const GithubRepos = ({
  repos,
  totalCount,
}: {
  repos: GitHubRepo[];
  totalCount: number;
}) => {
  const [paginatedRepos, setPaginatedRepos] = useState(repos);
  const [searchQuery, setSearchQuery] = useParamState<string>("query", "");
  const [page, setPage] = useParamState<number>("page", 1);

  const handlePageChange = async (newPage: number) => {
    setPage(newPage);
    const newRepos = await getBestRepos({ page: newPage });
    setPaginatedRepos(newRepos.items);
  };

  const handleQueryChange  = async (newQuery: string) => {
    setSearchQuery(newQuery);
    const newRepos = await getBestRepos({ query: newQuery });
    setPaginatedRepos(newRepos.items);
  };

  return (
    <div>
      {/* Search Input */}
      <SearchInput searchQuery={searchQuery} setSearchQuery={handleQueryChange} />

      {/* Table */}
      <Table columns={columns} rows={paginatedRepos} />

      {/* Pagination */}
      <Pagination
        totalPages={15}
        currentPage={page}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default GithubRepos;

const columns: Column<GitHubRepo>[] = [
  {
    header: "Name",
    accessor: "full_name",
    renderCell: (repo) => (
      <div>
        <a className="text-blue-600" href={repo.html_url}>
          {repo.full_name}
        </a>
      </div>
    ),
    sortable: true,
  },
  {
    header: "Stars",
    accessor: "stargazers_count",
    renderCell: (repo) => `⭐${repo.stargazers_count}`,
    sortable: true,
  },
  {
    header: "Forks",
    accessor: "forks_count",
    renderCell: (repo) => `🔗${repo.forks_count}`,
    sortable: true,
  },
  {
    header: "Owner",
    accessor: "owner",
    renderCell: (repo) => (
      <div className="flex items-center space-x-2">
        <img
          src={repo.owner.avatar_url}
          alt={repo.owner.login}
          className="w-6 h-6 rounded-full"
        />
        <span>{repo.owner.login}</span>
      </div>
    ),
    sortable: false,
  },
];
