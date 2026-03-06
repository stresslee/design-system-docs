const withNextra = require('nextra')({
    theme: 'nextra-theme-docs',
    themeConfig: './theme.config.jsx',
})

const isGitHubPages = process.env.GITHUB_ACTIONS === 'true';
const basePath = isGitHubPages ? '/design-system-docs' : '';

module.exports = withNextra({
    output: 'export',
    images: { unoptimized: true },
    basePath,
    assetPrefix: isGitHubPages ? '/design-system-docs/' : '',
    env: {
        NEXT_PUBLIC_BASE_PATH: basePath,
    },
})
