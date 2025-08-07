import { TavilySearch } from '@langchain/tavily';
import { envKeys } from '../../env/constants';
import { getSecretOrThrow } from '../../env/get-secret';
import { tool } from '@langchain/core/tools';

export function tavilySearch(query: string) {
  const tavilyApiKey = getSecretOrThrow(envKeys.TAVILY_API_KEY);
  const tavilySearch = new TavilySearch({ tavilyApiKey });
  return tavilySearch.invoke({ query });
}

export function createTavilySearchTool() {
  return tool(tavilySearch, {
    name: 'Crawl google for LinkedIn profile url',
    description:
      'useful for when you need to get social media profile url like linkedIn and twitter',
  });
}
