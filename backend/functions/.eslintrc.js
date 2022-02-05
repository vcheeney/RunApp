module.exports = {
	root: true,
	env: {
		es6: true,
		node: true,
	},
	extends: [
		"eslint:recommended",
		"plugin:import/errors",
		"plugin:import/warnings",
		"plugin:import/typescript",
		"plugin:@typescript-eslint/recommended",
	],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		project: ["tsconfig.json", "tsconfig.dev.json"],
		sourceType: "module",
	},
	ignorePatterns: [
		"/build/**/*", // Ignore built files.
		"jest.config.js",
		"*.d.ts",
	],
	plugins: ["@typescript-eslint", "import"],
	rules: {
		semi: 0,
		quotes: ["error", "double"],
	},
}
