import path from "node:path";

export const getAbsolutePathFromRoot = (dir?: string) => {
	return path.resolve(__dirname, "../../", dir || "");
};

export const getRelativePathFromRoot = (dir?: string) => {
	const rootPath = path.resolve(__dirname, "../../");
	return path.relative(rootPath, dir || "");
};
