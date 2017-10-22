import { configure } from '@storybook/react';

const req = require.context('../demo/components', true, /\.stories\.js$/);

function loadStories() {
	req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
