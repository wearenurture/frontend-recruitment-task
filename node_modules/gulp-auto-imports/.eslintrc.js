module.exports = {
   parser: '@typescript-eslint/parser', // Specifies the ESLint parser
   extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'prettier/@typescript-eslint',
      'plugin:prettier/recommended',
   ],
   settings: {
      react: {
         version: 'detect',
      },
   },
   env: {
      browser: true,
      node: true,
      es6: true,
   },
   plugins: ['@typescript-eslint'],
   parserOptions: {
      ecmaVersion: 2017, // Allows for the parsing of modern ECMAScript features
      sourceType: 'module', // Allows for the use of imports
   },
   rules: {
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      'prefer-const': 'off',
      'prettier/prettier': 'warn',
   },
}
