import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import tailwindcss from '@tailwindcss/vite'; // Import tailwindcss


export default defineConfig({
	plugins: [
		react(),
		tailwindcss(),
		viteStaticCopy({
			targets: [
				{
					src: 'public/*',
					dest: 'assets' // copy to dist/assets/
				},
				// 		{
				// 			src: '404.html',
				// 			dest: '.' // Copies to root of dist
				// 		}
			]
		})
	],
})
