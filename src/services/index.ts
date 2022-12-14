import type { Term } from '../store/results';

export interface IGitHubApiResponseItem {
  [key: string]: any;
  id: number;
  url: string;
  full_name: string;
  language: string;
  count: number;
}

interface IGitHubApiResponse {
  incomplete_results: boolean;
  items: IGitHubApiResponseItem[];
  total_count: number;
}

type ISearchResponse = Omit<IGitHubApiResponse, 'incomplete_results'>;

export async function searchGithub(term: Term): Promise<ISearchResponse> {
  const rpp = 2;
  const page = 2;

  const response = await fetch(
    `https://api.github.com/search/repositories?q=${term}&sort=stars&order=desc&per_page=${rpp}&page=${page}`
  );
  const results = await response.json();

  return {
    items: results.items.map(
      ({ id, url, full_name, language, count }: IGitHubApiResponseItem) => ({
        id,
        url,
        full_name,
        language,
        count,
      })
    ),
    total_count: results.total_count,
  };
}

export default searchGithub;
