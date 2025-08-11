import axios from 'axios';
import { getSecretOrThrow } from '../../env/get-secret';
import { envKeys } from '../../env/constants';

export function createScrapinSocialClient() {
  const scrapinApiKey = getSecretOrThrow(envKeys.SCRAPIN_API_KEY);
  const client = axios.create({
    headers: { 'Content-Type': 'application/json', 'x-api-key': scrapinApiKey },
  });
  return {
    async getProfile(profileUrl: string) {
      const scrapeProfileUrl = 'https://api.scrapin.io/v1/enrichment/profile';
      const { data } = await client.post(scrapeProfileUrl, {
        linkedInUrl: profileUrl,
      });
      return data;
    },
  };
}

export const scrapinClient = {};
