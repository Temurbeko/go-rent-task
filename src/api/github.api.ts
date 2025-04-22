import { GitHubSearchResponse } from "@/types";
import apiClient from ".";

export const getBestRepos = async ({
  query,
  page = 1,
}: {
  query?: string;
  page?: number;
}) => {
  const { data } = await apiClient.get<GitHubSearchResponse>("", {
    params: {
      q: query,
      sort: "stars",
      order: "desc",
      per_page: 10,
      page: page,
    },
  });
  return data;
};
