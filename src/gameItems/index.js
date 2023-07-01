import './index.css'

const GameItems = props => {
  const {eachItem, tab, verifyingMatching} = props

  const verifying = () => {
    verifyingMatching(eachItem.id)
  }

  return (
    <li className="thumbnail">
      <button onClick={verifying} className="img-button">
        <img
          src={eachItem.thumbnailUrl}
          className="thumbnail-img"
          alt="thumbnail"
        />
      </button>
    </li>
  )
}

export default GameItems
