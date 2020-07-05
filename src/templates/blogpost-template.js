import React from "react"
import { Link, useStaticQuery } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import Profile from "../components/profile"
import "./blogpost-template.scss"

import { FontAwesomeIcon
} from "@fortawesome/react-fontawesome"
import { faClock, faFolderOpen
} from "@fortawesome/free-regular-svg-icons"
import { faChevronLeft, faChevronRight 
} from "@fortawesome/free-solid-svg-icons"

import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { BLOCKS } from "@contentful/rich-text-types"
import useContentfulImage from "../utils/useContentfulImage"


const BlogPost = ({ data, pageContext, location }) => (
  <Layout>
    <SEO pagetitle={data.contentfulBlogPost.title} 
         pagedesc={`${documentToPlainTextString(
             data.contentfulBlogPost.content.json
         ).slice(0, 70)}...`}
         pagepath={location.pathname}
         pageimg={`https:${data.contentfulBlogPost.eyecatch.file.url}`}
         pageimgw={data.contentfulBlogPost.eyecatch.file.details.image.width}
         pageimgh={data.contentfulBlogPost.eyecatch.file.details.image.height}
    />

    <div className="eyecatch">
        <figure>
            <Img 
                fluid={data.contentfulBlogPost.eyecatch.fluid}
                alt={data.contentfulBlogPost.eyecatch.description}
                style={{ height: "100%" }}
            />
        </figure>
    </div>
    

    <div className="all-content-bp">
    <article className="content-bp">
        <aside className="info">
            <time dateTime={data.contentfulBlogPost.publishDate}>
                <FontAwesomeIcon icon={faClock} />
                {data.contentfulBlogPost.publishDateJP}
            </time>
            <div className="cat">
                <FontAwesomeIcon icon={faFolderOpen} />
                <ul>
                    {data.contentfulBlogPost.category.map(cat => (
                        <li className={cat.categorySlug} key={cat.id}>
                            <Link to={`/category/${cat.categorySlug}/`}>{cat.category}</Link>
                        </li>
                    ))}
                    
                </ul>
            </div>
        </aside>

        <div className="container-bp">
            <h1 className="bar-bp">{data.contentfulBlogPost.title}</h1>
            <div className="postbody">
                {documentToReactComponents(data.contentfulBlogPost.content.json)}
            </div>
            
            <ul className="postlink">
                {pageContext.next && (
                <li className="prev">
                    <Link to={`/blog/post/${pageContext.next.slug}/`} rel="prev">
                        <FontAwesomeIcon icon={faChevronLeft} />
                        <span>{pageContext.next.title}</span>
                    </Link>
                </li>
                )}
                {pageContext.previous && (
                <li className="next">
                    <Link to={`/blog/post/${pageContext.previous.slug}/`} rel="next">
                    <span>{pageContext.previous.title}</span>
                        <FontAwesomeIcon icon={faChevronRight} />
                    </Link>
                </li>
                )}
            </ul>
        </div>
    </article>


    <Profile />
    </div>

  </Layout>
)

export default BlogPost



export const query = graphql`
    query($id: String!) {
        contentfulBlogPost(id: { eq: $id }) {
            title
            publishDateJP:publishDate(formatString: "YYYY/MM/DD")
            publishDate
            category {
                category
                categorySlug
                id
            }
            eyecatch {
                fluid(maxWidth: 1600) {
                    ...GatsbyContentfulFluid
                }
                description
                file {
                    details {
                        image {
                            width
                            height
                        }
                    }
                    url
                }
            }
            content {
                json
            }
        }
    }
`


const options = {
    renderNode: {
        [BLOCKS.EMBEDDED_ASSET]: node => (
            <img 
                fluid={useContentfulImage(node.data.target.fields.file["ja-JP"].url)}
                alt={
                    node.data.target.fields.description
                        ? node.data.target.fields.description["ja-JP"]
                        : node.data.target.fields.title["ja-JP"]
                }
            />
        )
    }
}