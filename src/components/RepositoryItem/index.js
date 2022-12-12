// Write your code here

import './index.css'

const RepositoryItem = props => {
  const {productdetails} = props
  const {name, issuesCount, forksCount, starsCount, avatarUrl} = productdetails
  // console.log(issuesCount)
  return (
    <li className="p-container">
      <img src={avatarUrl} alt={name} className="avatar-image" />
      <h1 className="heading-name">{name}</h1>
      <div className="section">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png  "
          alt="stars"
          className="icons"
        />
        <p className="paragraph1">{starsCount} stars</p>
      </div>

      <div className="section">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="icons"
        />

        <p className="paragraph1">{forksCount} forks</p>
      </div>

      <div className="section">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="icons"
        />
        <p className="paragraph1">{issuesCount} open issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem
