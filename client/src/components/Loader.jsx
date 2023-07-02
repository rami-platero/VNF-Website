import LoadGIF from '../assets/loader.gif'
import './loader.css'

const Loader = () => {
  return (
    <div className="loader">
        <img src={LoadGIF} />
    </div>
  )
}

export default Loader