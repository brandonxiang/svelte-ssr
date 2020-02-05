import App from './App.svelte';

const app = new App({
	target: document.querySelector('#server-rendered'),
	hydrate: true,
	props: window.context
});

export default app;