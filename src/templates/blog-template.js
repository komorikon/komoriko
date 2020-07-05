import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import Profile from "../components/profile"
import "./blog-template.scss"

import {
  FontAwesomeIcon
} from "@fortawesome/react-fontawesome"
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons"
import {
  faTwitter,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons"


const BlogPage = ({ data, location, pageContext }) => (
  <Layout>
    <SEO
      pagetitle="komoriko"
      pagedesc="komorikonblog"
      pagepath={location.pathname}
    />
    <div className="all-content">
    <section className="content bloglist">
      <div className="container">
        <div className="posts">
          {data.allContentfulBlogPost.edges.map(({ node }) => (
          <article className="post" key={node.id}>
            <Link to={`/blog/post/${node.slug}/`}>
              <figure>
                <Img
                  fluid={node.eyecatch.fluid}
                  alt={node.eyecatch.description}
                  style={{height: "100%"}}
                />
              </figure>
              <div className="post-t">
              <div className="post-t-tu">
              <ul>
                  {node.category.map(cat => (
                      <li className={cat.categorySlug} key={cat.id}>
                          <Link to={`/category/${cat.categorySlug}/`}>{cat.category}</Link>
                      </li>
                  ))}
              </ul>
              <time dateTime={node.publishDate}>
                {node.publishDateJP}
              </time>
              </div>
              <h2>{node.title}</h2>
              </div>
            </Link>
          </article>
          ))}
        </div>
        <ul>
            {!pageContext.isFirst && (
              <li className="prev">
                <Link
                  to={
                    pageContext.currentPage === 2
                      ? `/blog/`
                      : `/blog/${pageContext.currentPage - 1}/`
                  }
                  rel = "prev"
                >
                  <FontAwesomeIcon icon={faChevronLeft} />
                  <span>前ページへ</span>
                </Link>
              </li>
            )}
            {!pageContext.isLast && (
              <li className="next">
                <Link to={`/blog/${pageContext.currentPage + 1}/`} rel="next">
                  <span>次ページへ</span>
                  <FontAwesomeIcon icon={faChevronRight} />
                </Link>
              </li>
            )}
        </ul>
      </div>
    </section>


    <Profile />

    </div>
  </Layout>
)

export default BlogPage


export const query = graphql`
  query($skip: Int!, $limit: Int!) {
    profilei:file(relativePath: {eq: "profile-i.jpg"}) {
      childImageSharp {
        fluid(maxWidth: 1600) {
          ...GatsbyImageSharpFluid
        }
      }
    },

    allContentfulBlogPost(
      sort: {order: DESC, fields: publishDate}
      skip: $skip
      limit: $limit
    ) {
      edges {
        node {
          publishDateJP:publishDate(formatString: "YYYY/MM/DD")
          publishDate
          title
          id
          slug
          category {
            category
            categorySlug
          }
          eyecatch {
            fluid(maxWidth: 500) {
              ...GatsbyContentfulFluid
            }
            description
          }
        }
      }
    }
  }
` 