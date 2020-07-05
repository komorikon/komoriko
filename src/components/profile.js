import React from "react"
import { Link, graphql, StaticQuery } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import "./profile.scss"

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


const Profile = () => (
    <StaticQuery
        query={query}
        render={ data => (
<section className="profile"> 
      <h3>プロフィール</h3>
      <figure>
        <Img fluid={data.profilei.childImageSharp.fluid}
             style={{ height: "100%" }} />
      </figure>
      <article className="profile-t">
      <h4>小森脩平</h4>
      <h5>Webディベロッパー1年生</h5>
      <div className="sns">
        <a href="https://twitter.com/syuupiyon95">
          <FontAwesomeIcon icon={faTwitter} />
        </a>
        <a href="https://www.facebook.com/profile.php?id=100011362350005">
          <FontAwesomeIcon icon={faFacebook} />
        </a>
      </div>
      <dl>
        <dt>【経歴】</dt>
        <dd>社会人3年生/24歳/3社目</dd>
        <dd>武蔵野Web制作←静岡再エネ事業←銀座百貨店</dd>
        <dt>【スキル】</dt>
        <dd>HTML&CSS/WordPress/JavaScript(Gatsby.js)</dd>
        <dt>【趣味】</dt>
        <dd>深夜ラジオ/お茶/読書/料理/制作</dd>
      </dl>
      <p>
        2019年7月ごろから、静岡にて独学でWeb制作の学習をはじめて、基礎的な学習をひととおり終えた段階で、都内のWeb制作会社へ2020年の7月から勤務できることになりました。
        現在はGatsby.jsにハマっております。
        まだまだ勉強中ですが、日々のアウトプットをこのブログでしていければと思います。
      </p>
      
      </article>
</section>    
)}
/> 
)


export default Profile


export const query = graphql`
    query {
        profilei:file(relativePath: {eq: "profile-i.jpg"}) {
            childImageSharp {
              fluid(maxWidth: 1600) {
                ...GatsbyImageSharpFluid
              }
            }
          },
    }
    `