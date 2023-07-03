import './index.css'

const TabItem = props => {
  const {eachItem, tabId, showTabs} = props

  const clickTabs = () => {
    showTabs(eachItem.tabId)
  }

  const marked = tabId.tabId === eachItem.tabId ? 'marked' : ''

  return (
    <li>
      <button className={`tabs ${marked}`} type="button" onClick={clickTabs}>
        {eachItem.displayText}
      </button>
    </li>
  )
}

export default TabItem
