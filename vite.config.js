import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';


export default defineConfig({
	base: '/BudgetBuddy',
	plugins: [
		react(),
		viteStaticCopy({
			targets: [
				{
					src: '404.html',
					dest: '.' // Copies to root of dist
				}
			]
		})
	],
})
