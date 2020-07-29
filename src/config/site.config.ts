import { registerAs } from '@nestjs/config';

export default registerAs('site', () => ({
  title:  process.env.TITLE || 'Vehicles Auction API',
  url: process.env.SITE_URL
}));
