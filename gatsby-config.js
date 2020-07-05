module.exports = {
  siteMetadata: {
    title: `komoriko`,
    description: `web creator blog`,
    author: `shuhei komori`,
  },
  plugins: [
    `gatsby-plugin-offline`, 
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: `o446mc1n4bib`,
        accessToken: `q5Y4hudEpHBUy0yilkuj595QuSqo20l3nq5DjjBy4bE`,
      }
    },
    `gatsby-plugin-sass`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-playground`
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
