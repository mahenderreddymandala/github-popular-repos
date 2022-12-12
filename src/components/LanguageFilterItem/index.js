// Write your code here

import './index.css'

const LanguageFilterItem = props => {
  const {details, updateActiveTabid, isActive} = props
  const {language, id} = details
  console.log(language)
  console.log(details)

  const onPresstab = () => {
    updateActiveTabid(id)
  }

  const activeTabBtnClassName = isActive ? 'active-tab-btn' : ''

  const para = isActive ? 'params' : ''
  return (
    <li className="list-items">
      <button
        type="button"
        onClick={onPresstab}
        className={`tab-btn ${activeTabBtnClassName}`}
      >
        <p className={`paragraph5 ${para}`}>{language}</p>
      </button>
    </li>
  )
}

export default LanguageFilterItem
