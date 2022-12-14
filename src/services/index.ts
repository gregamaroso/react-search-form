import type { Term } from '../store/results';

interface IGitHubApiResponseItem {
  [key: string]: any;
  id: number;
  url: string;
  full_name: string;
  language: string;
  stargazers_count: number;
}

interface IGitHubApiResponse {
  incomplete_results: boolean;
  items: IGitHubApiResponseItem[];
  total_count: number;
}

type ISearchResponse = Omit<IGitHubApiResponse, 'incomplete_results'>;

export async function searchGithub(
  term: Term,
  page: number
): Promise<ISearchResponse> {
  const resultsPerPage = 2;

  const response = await fetch(
    `https://api.github.com/search/repositories?q=${term}&sort=stars&order=desc&per_page=${resultsPerPage}&page=${page}`
  );
  const results = await response.json();

  return {
    items: results.items.map(
      ({
        id,
        url,
        full_name,
        language,
        stargazers_count,
      }: IGitHubApiResponseItem) => ({
        id,
        url,
        full_name,
        language,
        stars: stargazers_count,
      })
    ),
    total_count: results.total_count,
  };
}

export default searchGithub;
