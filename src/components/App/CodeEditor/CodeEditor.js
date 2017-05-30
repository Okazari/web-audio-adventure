/* eslint-disable react/no-danger */
import React from 'react'
import AceEditor from 'react-ace'
import classnames from 'classnames/bind'
import 'brace/mode/javascript'
import 'brace/theme/solarized_dark'
import styles from './style.scss'
import MonkeyPatch from '../../../services/MonkeyPatch'

const cx = classnames.bind(styles)

class CodeEditor extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      code: `const audioContext = new AudioContext()
const audio = new Audio(url)
audio.play()
const audioSource = audioContext.createMediaElementSource(audio)
audioSource.connect(audioContext.destination)`,
    }
  }
  componentDidMount() {
    this.onEditorChange(this.state.code)
  }

  onEditorChange = (code) => {
    try {
      MonkeyPatch.clean()
      new Function('AudioContext', 'Audio', 'url', code)(MonkeyPatch.AudioContext, MonkeyPatch.Audio, 'samples/rythm.mp3')
      this.setState({ error: '' })
    } catch(error) {
      this.setState({ error: error.message })
    }
    this.setState({ code })
  }

  render() {
    const { code, error } = this.state
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <AceEditor
            onChange={this.onEditorChange}
            mode="javascript"
            theme="solarized_dark"
            name="UNIQUE_ID_OF_DIV"
            value={code}
          />
          {error}
        </div>
      </div>
    )
  }
}


export default CodeEditor
