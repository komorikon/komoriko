import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import "./header.scss"

const Header = ({ siteTitle }) => (
  <header>
    <Link to={`/blog/`}>
      <h1>{ siteTitle }</h1>
    </Link>
    <nav className="header-menu">
        <ul>
            <li><Link to={`/category/seisakukiso/`}>制作基礎</Link></li>
            <li><Link to={`/category/spa/`}>SPA</Link></li>
            <li><Link to={`/category/threed/`}>3D</Link></li>
            <li><Link to={`/category/design/`}>デザイン</Link></li>
            <li><Link to={`/category/webjyoho/`}>Web情報</Link></li>
            <li><Link to={`/category/poem/`}>ポエム</Link></li>
        </ul>
    </nav>
  </header>
)

export default Header
