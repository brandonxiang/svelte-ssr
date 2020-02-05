import App from './App.svelte';

const app = new App({
	target: document.querySelector('#server-rendered'),
	hydrate: true
});

export default app;