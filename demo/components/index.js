const req = require.context('.', true, /\.js$/);

req.keys().forEach(key => {
	const filename = key.match(/[a-zA-Z]+.js$/)[0];
	const componentName = filename.split('.')[0];
	module.exports[componentName] = req(key).default;
});
