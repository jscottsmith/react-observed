module.exports = () => ({
    presets: [
        [
            'env',
            {
                targets: { browsers: ['> 5%', 'last 2 versions', 'ie 11'] },
                modules: false,
            },
        ],
        'react',
        'stage-0',
    ],
});
