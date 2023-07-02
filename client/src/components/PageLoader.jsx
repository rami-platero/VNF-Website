import { useContext } from "react"
import { themecontext } from "../context/themeContext"
import './pageLoader.css'

const PageLoader = () => {
    const {theme} = useContext(themecontext)
  return (
    <div className={`loader-song ${theme}`}></div>
  )
}

export default PageLoader