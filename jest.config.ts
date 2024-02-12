module.exports = {
    // Rutas de los archivos que contienen las pruebas
    testMatch: ['**/__tests__/**/*.test.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
  
    // Directorios donde Jest buscará pruebas
    roots: ['<rootDir>/src'],
  
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
      ".+\\.(css|scss|png|jpg|svg)$": "jest-transform-stub"
    },
  
    // Archivos de configuración para Jest y TypeScript
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

    "testEnvironment": "jsdom"
  };
  