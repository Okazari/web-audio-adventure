/* eslint-disable react/no-danger */
import React from 'react'
import classnames from 'classnames/bind'
import styles from './style.scss'
import CodeEditor from './CodeEditor'
import GameView from './GameView'

const cx = classnames.bind(styles)

const App = () => {
  return (
    <div className={styles.container}>
      <CodeEditor />
      <GameView />
    </div>
  )
}


export default App
