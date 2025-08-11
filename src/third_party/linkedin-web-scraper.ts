import { createScrapinSocialClient } from './scrapin/scrapin.client';

export async function scrapeLinkedin(profileUrl: string) {
  const scrapperClient = createScrapinSocialClient();
  const linkedInProfile = await scrapperClient.getProfile(profileUrl);
  return linkedInProfile;
}
