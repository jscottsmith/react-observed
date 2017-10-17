module.exports = () => ({
    presets: [
        [
            'env',
            {
                targets: { browsers: ['> 5%', 'last 2 versions', 'ie 11'] },
            },
        ],
        'react',
        'stage-0',
    ],
});
