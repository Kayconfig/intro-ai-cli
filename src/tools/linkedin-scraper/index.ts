import { tool } from '@langchain/core/tools';
import { scrapeLinkedin } from '../../third_party/linkedin-web-scraper';

export function createLinkedinScraperTool() {
  return tool(
    (profileUrl) =>
      scrapeLinkedin(profileUrl).then((res) => JSON.stringify(res)),
    {
      name: 'fetch_linkedin_profile',
      description:
        'useful for when you want to fetch the linkedIn profile data, provided that you have the linkedIn profile url',
    }
  );
}
