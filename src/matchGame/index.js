import {Component} from 'react'
import GameItems from '../gameItems'
import TabItem from '../tabItem'
import './index.css'

class MatchGame extends Component {
  state = {
    num: 0,
    display: false,
    score: 0,
    timer: 60,
    tabId: {tabId: 'FRUIT', displayText: 'Fruits'},
  }

  componentDidMount() {
    this.timerStart()
  }

  componentWillUnmount() {
    const {score} = this.state

    if (score < 1) {
      clearInterval(this.timerId)
      this.setState({display: true})
    }
  }

  showTabs = tabId => {
    if (tabId === 'FRUIT') {
      this.setState({tabId: {tabId: 'FRUIT', displayText: 'Fruits'}})
    } else if (tabId === 'ANIMAL') {
      this.setState({tabId: {tabId: 'ANIMAL', displayText: 'Animals'}})
    } else {
      this.setState({tabId: {tabId: 'PLACE', displayText: 'Places'}})
    }
  }

  timerStart = () => {
    const {timer} = this.state
    let reducedTime = timer
    this.timerId = setInterval(() => {
      if (reducedTime > 0) {
        reducedTime -= 1
        this.setState({timer: reducedTime})
      }
    }, 1000)
  }

  playAgain = () => {
    this.setState({display: false, score: 0, timer: 60})
    this.timerStart()
  }

  verifyingMatching = id => {
    const {num} = this.state
    const {imagesList} = this.props
    if (id === imagesList[num].id) {
      const randomNum = Math.floor(Math.random() * imagesList.length)
      this.setState(prevState => ({num: randomNum, score: prevState.score + 1}))
    } else {
      clearInterval(this.timerId)
      this.setState({display: true})
    }
  }

  render() {
    const {tabsList, imagesList} = this.props
    const {score, timer, tabId, num, display} = this.state

    let showMainCard = ''
    let showResultsCard = ''

    if (display) {
      showMainCard = 'disappear'
      showResultsCard = 'appear'
    }

    const randomImg = imagesList[num].imageUrl

    const filterImagesList = imagesList.filter(
      each => tabId.tabId === each.category,
    )

    return (
      <div className="bg-container">
        <nav className="nav-bar-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/match-game-website-logo.png"
            alt="website logo"
          />
          <ul className="details-container">
            <li className="score-details">
              <p>Score:</p>
              <p className="numbers">{score}</p>
            </li>
            <li className="timer-details">
              <img
                className="timer"
                src="https://assets.ccbp.in/frontend/react-js/match-game-timer-img.png"
                alt="timer"
              />
              <p className="numbers">{timer} sec</p>
            </li>
          </ul>
        </nav>
        <div className={`main-container ${showMainCard}`}>
          <button className="random-img-container">
            <img src={randomImg} className="random-img" alt="match" />
          </button>
          <ul className="tabs-container">
            {tabsList.map(eachItem => (
              <TabItem
                eachItem={eachItem}
                tabId={tabId}
                showTabs={this.showTabs}
                key={eachItem.tabId}
              />
            ))}
          </ul>
          <ul className="game-items-container">
            {filterImagesList.map(eachList => (
              <GameItems
                key={eachList.id}
                verifyingMatching={this.verifyingMatching}
                eachItem={eachList}
                tab={tabId}
              />
            ))}
          </ul>
        </div>
        <div className="torphy-conatiner">
          <div className={`results-card ${showResultsCard}`}>
            <img
              src="https://assets.ccbp.in/frontend/react-js/match-game-trophy.png"
              alt="trophy"
              className="trophy-img"
            />
            <p className="score-heading">YOUR SCORE</p>
            <p className="score">{score}</p>
            <button
              className="play-again-button"
              type="button"
              onClick={this.playAgain}
            >
              <img
                src="https://assets.ccbp.in/frontend/react-js/match-game-play-again-img.png"
                alt="reset"
              />
              <p>PLAY AGAIN</p>
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default MatchGame
