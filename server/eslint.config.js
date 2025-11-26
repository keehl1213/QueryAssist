const js = require('@eslint/js');
const globals = require('globals');
const tseslint = require('typescript-eslint');
const prettier = require('eslint-plugin-prettier');

module.exports = tseslint.config(
	{ ignores: ['dist'] },
	{
		extends: [js.configs.recommended, ...tseslint.configs.recommended],
		files: ['**/*.{ts,tsx}'],
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser,
		},
		plugins: {
			prettier,
		},
		rules: {
			...tseslint.configs.recommended.rules,
			'prettier/prettier': [
				'error',
				{
					endOfLine: 'auto',
				},
			],
			semi: 1,
			'@typescript-eslint/no-explicit-any': 0,
            '@typescript-eslint/no-unused-vars': 1,
		},
	}
);
