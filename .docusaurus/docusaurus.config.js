// @ts-check

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: 'Cloudaware Compliance Policies',
    favicon: 'img/favicon.ico',
    url: 'https://ce.prod.cloudaware.com',
    baseUrl: '/',
    organizationName: 'Gigware', // Usually your GitHub org/user name.
    projectName: 'compliance-platform-policies', // Usually your repo name.
    onBrokenLinks: 'warn',
    onBrokenMarkdownLinks: 'warn',
    markdown: {
        format: 'detect'
    },
    trailingSlash: false, 
    i18n: {
        defaultLocale: 'en',
        locales: ['en'],
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
                        "exports",
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
                        let caNotExpandable = [];
                        // docs is a plain list of all docs that sidebar discovered
                        docs.forEach(doc => {
                            if (doc.id === 'types/index.gen'
                                || doc.id === 'frameworks/index.gen'
                                || (doc.frontMatter && doc.frontMatter.tags && doc.frontMatter.tags.indexOf("policy") > -1)
                            ) {
                                return caNotExpandable.push(doc.id);
                            }
                        })
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
                                    doc.fileName.toLowerCase() === 'folder.gen' ||
                                    doc.fileName.toLowerCase() === 'policy.gen' ||
                                    doc.fileName.toLowerCase() === 'section.gen' ||
                                    doc.fileName.toLowerCase() === 'type.gen' ||
                                    defaultCategoryIndexMatcher(doc)
                                );
                            },
                        });
                        let items1 = [];
                        let items2 = [];
                        for (let item of items) {
                            if (item.link && caNotExpandable.indexOf(item.link.id) > -1) {
                                item.className = 'ca-not-expandable';
                            }
                            if (item.type === 'doc') {
                                items1.push(item);
                            // } else if (item.link && item.link.id.startsWith("guides")) {
                            //     // excluding guides
                            } else {
                                items2.push(item);
                            }
                        }
                        return items1.concat(items2);;
                    },
                },
                blog: false,
                theme: {
                    customCss: ['./src/css/custom.css'],
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
            // Replace with your project's social card
            image: 'img/docusaurus-social-card.jpg',
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
                    // {
                    //     type: 'docSidebar',
                    //     sidebarId: 'frameworksSidebar',
                    //     position: 'left',
                    //     label: 'Frameworks',
                    // },
                    // {
                    //     type: 'docSidebar',
                    //     sidebarId: 'typesSidebar',
                    //     position: 'left',
                    //     label: 'Types',
                    // },
                    // {
                    //     type: 'docSidebar',
                    //     sidebarId: 'listsSidebar',
                    //     position: 'left',
                    //     label: 'Lists',
                    // },
                    {
                        href: 'https://github.com/Gigware/compliance-platform-policies',
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
