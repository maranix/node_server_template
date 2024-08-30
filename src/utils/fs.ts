import fs from "node:fs";

export const createDirSync = (dir: string, exitOnFailure?: boolean) => {
	try {
		fs.mkdirSync(dir, { recursive: true });
	} catch (err: unknown) {
		if (err instanceof Error) {
			console.log(err.name, ":", err.message);
		}

		console.log("Unable to create logs directory.");

		if (exitOnFailure) {
			process.exit(1);
		}
	}
};
