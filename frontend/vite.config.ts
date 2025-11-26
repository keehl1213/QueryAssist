import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import checker from 'vite-plugin-checker';
import { fileURLToPath, URL } from 'url';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '');
	return {
		plugins: [
			react(),
			svgr({ svgrOptions: { icon: true } }),
			checker({
				typescript: true,
				eslint: {
					lintCommand: 'eslint "./src/**/*.{ts,tsx}"',
					useFlatConfig: true,
				},
			}),
		],
		resolve: {
			alias: [
				{
					find: '@',
					replacement: fileURLToPath(
						new URL('./src', import.meta.url)
					),
				},
				{
					find: '@pages',
					replacement: fileURLToPath(
						new URL('./src/pages', import.meta.url)
					),
				},
				{
					find: '@compose',
					replacement: fileURLToPath(
						new URL('./src/components/compose', import.meta.url)
					),
				},
				{
					find: '@atoms',
					replacement: fileURLToPath(
						new URL('./src/components/atoms', import.meta.url)
					),
				},
				{
					find: '@store',
					replacement: fileURLToPath(
						new URL('./src/store', import.meta.url)
					),
				},
				{
					find: '@assets',
					replacement: fileURLToPath(
						new URL('./src/assets', import.meta.url)
					),
				},
				{
					find: '@router',
					replacement: fileURLToPath(
						new URL('./src/router', import.meta.url)
					),
				},
				{
					find: '@utils',
					replacement: fileURLToPath(
						new URL('./src/utils', import.meta.url)
					),
				},
				{
					find: '@requests',
					replacement: fileURLToPath(
						new URL('./src/requests', import.meta.url)
					),
				},
				{
					find: '@styles',
					replacement: fileURLToPath(
						new URL('./src/styles', import.meta.url)
					),
				},
				{
					find: '@hooks',
					replacement: fileURLToPath(
						new URL('./src/hooks', import.meta.url)
					),
				},
				{
					find: '@types',
					replacement: fileURLToPath(
						new URL('./src/types', import.meta.url)
					),
				},
				{
					find: '@constants',
					replacement: fileURLToPath(
						new URL('./src/constants', import.meta.url)
					),
				},
			],
		},
		server: {
			port: 8080,
			proxy: {
				'/api/plugin': env.VITE_AI_BASE || 'http://localhost:8000',
				'/api': env.VITE_BASE || 'http://localhost:3000',
			},
		},
	};
});
