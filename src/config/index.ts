import config from 'config.json';

type Index = {
	readonly author: string;
	readonly site_url: string;
	readonly site_title: string;
	readonly site_description: string;
	readonly email: string;
	readonly github: string;
	readonly twitter: string;
	readonly linkedin: string;
	readonly site_keywords: { keyword: string }[];
};

export default config as Index;
