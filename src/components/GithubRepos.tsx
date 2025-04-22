"use client";
import { Column, GitHubRepo } from "@/types";
import Table from "./Table";
import Pagination from "./Pagination";
import { getBestRepos } from "@/api/github.api";
import { useState } from "react";
import { useParamState } from "@/hooks";

const GithubRepos = ({
  repos,
  totalCount,
}: {
  repos: GitHubRepo[];
  totalCount: number;
}) => {
  const [paginatedRepos, setPaginatedRepos] = useState(repos);
  const [page, setPage] = useParamState<number>("query", 1);
  const handlePageChange = async (newPage: number) => {
    setPage(newPage);
    const newRepos = await getBestRepos({ page: newPage });
    setPaginatedRepos(newRepos.items);
  };
  return (
    <div>
      <Table columns={columns} rows={paginatedRepos} />
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
