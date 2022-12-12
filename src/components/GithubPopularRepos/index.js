import {Component} from 'react'

import Loader from 'react-loader-spinner'

import RepositoryItem from '../RepositoryItem'

import LanguageFilterItem from '../LanguageFilterItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

// Write your code here
class GithubPopularRepos extends Component {
  state = {
    activeTabid: languageFiltersData[0].id,
    productsList: [],
    status: '',
  }

  componentDidMount() {
    this.getProducts()
  }

  updateActiveTabid = id => {
    this.setState({activeTabid: id}, this.getProducts)
  }

  getProducts = async () => {
    const {activeTabid} = this.state
    this.setState({status: apiStatusConstants.inProgress})

    console.log(activeTabid)

    const url = `https://apis.ccbp.in/popular-repos?language=${activeTabid}`
    console.log(url)

    const response = await fetch(url)
    console.log(response.ok)

    if (response.ok === true) {
      const data = await response.json()

      const formattedData = data.popular_repos.map(eachItem => ({
        name: eachItem.name,
        id: eachItem.id,
        issuesCount: eachItem.issues_count,
        forksCount: eachItem.forks_count,
        starsCount: eachItem.stars_count,
        avatarUrl: eachItem.avatar_url,
      }))

      this.setState({
        productsList: formattedData,
        status: apiStatusConstants.success,
      })
    } else {
      this.setState({status: apiStatusConstants.failure})
    }
  }

  renderProductDealsList = () => {
    const {productsList} = this.state

    return (
      <ul className="product-container">
        {productsList.map(each => (
          <RepositoryItem productdetails={each} key={each.id} />
        ))}
      </ul>
    )
  }

  renderPrimeDealsFailureView = () => (
    <div className="error">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png "
        alt="failure view"
        className="error-image"
      />
      <h1 className="error">Something Went Wrong</h1>
    </div>
  )

  renderLoadingView = () => (
    <div className="products-loader-container" testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderHeader = () => {
    const {status} = this.state

    switch (status) {
      case apiStatusConstants.success:
        return this.renderProductDealsList()
      case apiStatusConstants.failure:
        return this.renderPrimeDealsFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {activeTabid} = this.state
    return (
      <div className="container">
        <h1 className="heading">Popular</h1>
        <ul className="sub-container">
          {languageFiltersData.map(each => (
            <LanguageFilterItem
              details={each}
              key={each.id}
              updateActiveTabid={this.updateActiveTabid}
              isActive={activeTabid === each.id}
            />
          ))}
        </ul>
        {this.renderHeader()}
      </div>
    )
  }
}
export default GithubPopularRepos
