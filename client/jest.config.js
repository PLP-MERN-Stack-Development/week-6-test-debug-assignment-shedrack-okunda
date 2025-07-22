export default {
	testEnvironment: "jsdom",
	testMatch: ["**/tests/**/*.test.jsx"],
	moduleFileExtensions: ["js", "jsx"],
	moduleNameMapper: {
		"\\.(css|less|scss|sass)$": "identity-obj-proxy",
	},
	setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
	transform: { "^.+\\.(js|jsx)$": "babel-jest" },
	collectCoverage: true,
	coverageDirectory: "coverage",
};
