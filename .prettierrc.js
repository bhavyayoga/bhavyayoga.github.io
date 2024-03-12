module.exports = {
    printWidth: 80,
    useTabs: false,
    tabWidth: 4,
    singleQuote: true,
    semi: true,
    trailingComma: 'all',
    arrowParens: 'always',
    bracketSameLine: true,
    htmlWhitespaceSensitivity: 'ignore',
    plugins: ['prettier-plugin-tailwindcss'],
    overrides: [
        {
            files: '*.html',
            options: {
                tabWidth: 2,
                printWidth: 100,
            },
        },
    ],
};
