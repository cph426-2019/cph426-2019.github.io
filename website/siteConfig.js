const users = [];

const siteConfig = {
  title: 'Copenhagen 426 - Summer 2019',
  tagline: '',
  url: 'https://cph426-2019.github.io',
  baseUrl: '/',
  projectName: 'cph426-2019.github.io',
  organizationName: 'cph426-2019',
  headerLinks: [
    {doc: 'assignments', label: 'Assignments'},
    {doc: 'schedule',    label: 'Schedule'},
    {doc: 'resources',   label: 'Resources'},
  ],
  users,
  headerIcon: 'img/old-well.svg',
  footerIcon: 'img/old-well.svg',
  favicon: 'img/favicon.png',
  colors: {
    primaryColor: '#4B9CD3',
    secondaryColor: '#163f5b',
  },
  /*
  fonts: {
    myFont: [
      "Times New Roman",
      "Serif"
    ],
    myOtherFont: [
      "-apple-system",
      "system-ui"
    ]
  },
  */

  copyright: `Copyright © ${new Date().getFullYear()} Kris Jordan`,

  highlight: {
    theme: 'default',
  },

  scripts: ['https://buttons.github.io/buttons.js'],

  onPageNav: 'separate',
  cleanUrl: true,

  ogImage: 'img/old-well.png',
  twitterImage: 'img/old-well.png',
  enableUpdateTime: false,
};

module.exports = siteConfig;
