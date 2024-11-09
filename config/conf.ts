const apps = {
	staging: 'org.wikipedia.alpha',
	prod: 'org.wikipedia',
};

type Environment = keyof typeof apps; // 'local' | 'staging' | 'prod'

const ENV: Environment = (process.env.ENV as Environment) || 'staging';

const appPackage = apps[ENV];
export { appPackage };
