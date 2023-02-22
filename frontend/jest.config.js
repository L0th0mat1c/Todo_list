/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  moduleNameMapper: {
    "@components/(.*)$": "<rootDir>/src/components/$1",
    "@/(.*)$": "<rootDir>/src/$1",
    "^.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/tests/mocks/fileMock.ts",
    "^.+\\.(css|less|scss|sass)$": "<rootDir>/tests/mocks/styleMock.ts",

    "(assets|models|services)": "<rootDir>/tests/mocks/fileMock.ts",
  },
  moduleDirectories: ["node_modules", "src"],
  transform: {
    "node_modules/variables/.+\\.(j|t)sx?$": "ts-jest",
    "^.+\\.(css)$": "<rootDir>/tests/fileTransform.ts",
  },
  transformIgnorePatterns: ["node_modules/(?!variables/.*)"],
  setupFilesAfterEnv: ["./tests/setupTests.ts"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  modulePaths: ["<rootDir>"],
  testEnvironment: "jsdom",
};
