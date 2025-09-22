// @ts-check

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: 'Cloudaware Compliance Policies',
    favicon: 'img/favicon.ico',
    url: 'https://ce.prod.cloudaware.com',
    baseUrl: process.env.BASE_URL ? process.env.BASE_URL : '/',
    organizationName: 'cloudaware',
    projectName: 'compliance-policies',
    onBrokenLinks: 'ignore',
    onBrokenMarkdownLinks: 'ignore',
    markdown: {
        format: 'detect'
    },
    trailingSlash: true,
    i18n: {
        defaultLocale: 'en',
        locales: ['en'],
    },
    future: {
        v4: true,
        experimental_faster: true
    },
    presets: [
        [
            'classic',
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    routeBasePath: '/',
                    path: '..',
                    exclude: [
                        ".*",
                        "export",
                        "internal"
                    ],
                    sidebarPath: './sidebars.js',
                    async sidebarItemsGenerator({
                                                    defaultSidebarItemsGenerator,
                                                    numberPrefixParser,
                                                    item,
                                                    version,
                                                    docs,
                                                    categoriesMetadata,
                                                    isCategoryIndex,
                                                }) {
                        let defaultCategoryIndexMatcher = isCategoryIndex;
                        // removing not needed docs from the sidebar
                        docs = docs.filter(
                            doc => !(
                                (doc.id.startsWith("frameworks") && doc.id !== 'frameworks/index.gen') // everything in /frameworks except the framework list
                                || (doc.id.startsWith("types") && doc.id !== 'types/index.gen') // everything in /types except the type list
                            )
                        );
                        // setting the correct sidebar positions manually
                        for (const doc of docs) {
                            if (doc.id === 'index.gen') {
                                doc.sidebarPosition = 1;
                            } else if (doc.id === 'ce/folder.yaml') {
                                doc.sidebarPosition = 2;
                            } else if (doc.id === 'frameworks/index.gen') {
                                doc.sidebarPosition = 3;
                            } else if (doc.id === 'lists/index.gen') {
                                doc.sidebarPosition = 4;
                            } else if (doc.id === 'types/index.gen') {
                                doc.sidebarPosition = 5;
                            }
                        }

                        const items = defaultSidebarItemsGenerator({
                            defaultSidebarItemsGenerator,
                            numberPrefixParser,
                            item,
                            version,
                            docs,
                            categoriesMetadata,
                            isCategoryIndex(doc) {
                                return (
                                    doc.fileName.toLowerCase() === 'index' ||
                                    doc.fileName.toLowerCase() === 'index.gen' ||
                                    doc.fileName.toLowerCase() === 'folder.yaml' ||
                                    doc.fileName.toLowerCase() === 'policy.yaml' ||
                                    doc.fileName.toLowerCase() === 'section.yaml' ||
                                    doc.fileName.toLowerCase() === 'type.json' ||
                                    defaultCategoryIndexMatcher(doc)
                                );
                            },
                        });
                        return items;
                    },
                },
                blog: false,
                theme: {
                    customCss: ['./src/css/custom.css'],
                },
                gtag: {
                    trackingID: 'G-JSTVPVNRFQ'
                },
                googleTagManager: {
                    containerId: 'GTM-PSB5TPCV',
                },
            }),
        ],
    ],

    themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            docs: {
                sidebar: {
                    autoCollapseCategories: true,
                },
            },
            image: 'img/cloudaware-social-card.png',
            navbar: {
                title: 'CA Compliance Policies',
                logo: {
                    alt: 'Cloudaware',
                    src: 'img/cloudaware.png',
                },
                items: [
                    {
                        type: 'docSidebar',
                        sidebarId: 'repoSidebar',
                        position: 'left',
                        label: 'Repository',
                    },
                    {
                        type: 'docSidebar',
                        sidebarId: 'guidesSidebar',
                        position: 'left',
                        label: 'Guides',
                    },
                    {
                        href: 'https://github.com/cloudaware/compliance-policies',
                        label: 'GitHub',
                        position: 'right',
                    },
                ],
            },
            footer: {
                style: 'dark',
                // links: [
                //     {
                //         title: 'Docs',
                //         items: [
                //             {
                //                 label: 'Tutorial',
                //                 to: '/docs/intro',
                //             },
                //         ],
                //     },
                //     {
                //         title: 'Community',
                //         items: [
                //             {
                //                 label: 'Stack Overflow',
                //                 href: 'https://stackoverflow.com/questions/tagged/docusaurus',
                //             },
                //             {
                //                 label: 'Discord',
                //                 href: 'https://discordapp.com/invite/docusaurus',
                //             },
                //             {
                //                 label: 'Twitter',
                //                 href: 'https://twitter.com/docusaurus',
                //             },
                //         ],
                //     },
                //     {
                //         title: 'More',
                //         items: [
                //             {
                //                 label: 'Blog',
                //                 to: '/blog',
                //             },
                //             {
                //                 label: 'GitHub',
                //                 href: 'https://github.com/facebook/docusaurus',
                //             },
                //         ],
                //     },
                // ],
                copyright: `Copyright © ${new Date().getFullYear()} Cloudaware`,
            },
            prism: {
                theme: prismThemes.github,
                darkTheme: prismThemes.dracula,
            },
        }),

};

export default config;
