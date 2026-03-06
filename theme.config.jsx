export default {
    logo: <strong>디자인 시스템 가이드</strong>,
    project: {
        link: 'https://github.com/shuding/nextra',
    },
    docsRepositoryBase: 'https://github.com/shuding/nextra',
    footer: {
        text: 'My Design System © 2026',
    },
    useNextSeoProps() {
        return {
            titleTemplate: '%s – 디자인 시스템'
        }
    }
}
