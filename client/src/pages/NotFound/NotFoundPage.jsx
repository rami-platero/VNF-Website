import React, { useContext } from 'react'
import './notFound.css'
import { themecontext } from '../../context/themeContext'
import { Link } from 'react-router-dom'

function NotFoundPage() {
  const {theme} = useContext(themecontext)
  return (
    <div className={`not-found ${theme}`}>
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <Link to={"/"}>Back to Home</Link>
    </div>
  )
}

export default NotFoundPage