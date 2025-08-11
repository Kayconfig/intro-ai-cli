import { TavilySearch } from '@langchain/tavily';
import { envKeys } from '../../env/constants';
import { getSecretOrThrow } from '../../env/get-secret';
import { tool } from '@langchain/core/tools';

export async function tavilySearch(query: string) {
  const tavilyApiKey = getSecretOrThrow(envKeys.TAVILY_API_KEY);
  const tavilySearch = new TavilySearch({ tavilyApiKey });
  const searchResult = await tavilySearch.invoke({ query });
  return searchResult.results;
}

export function createTavilySearchTool() {
  return tool(tavilySearch, {
    name: 'crawl_google_for_linkedin_profile_url',
    description:
      'useful for when you need to get social media profile url like linkedIn and twitter',
  });
}
