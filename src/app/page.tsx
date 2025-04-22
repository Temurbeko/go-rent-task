import { getBestRepos } from "@/api/github.api";
import GithubRepos from "@/components/GithubRepos";

export default async function Home() {
  const data = await getBestRepos({});

  return (
    <div>
      <GithubRepos repos={data.items} totalCount={data.total_count} />
    </div>
  );
}
