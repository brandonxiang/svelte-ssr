import * as main from './App.svelte';

console.log(main)

const App = main.default

export default async function CreateApp () {
	if(!main.preload) return App.render();
	const props = await main.preload();
	return App.render(props);
};