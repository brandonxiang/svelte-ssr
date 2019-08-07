import App from './App.svelte';

const app = new App({
	target: document.querySelector('#server-rendered'),
	props: {
		name: 'world'
	},
	hydrate: true
});

export default app;