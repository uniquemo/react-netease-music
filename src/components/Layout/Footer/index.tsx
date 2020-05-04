import React from 'react'
import { Icon, Tooltip } from '@blueprintjs/core'

// import Slider from 'components/Slider'
import Artists from 'components/Artists'
import AudioTimer from 'components/AudioTimer'
import { PlayMusicStateContext, PlayMusicDispatchContext, ACTIONS } from 'reducers/playMusic'
import { getMusicUrl } from 'helpers/business'
import styles from './style.module.css'

const { useEffect, useContext, useRef, useState } = React

const Footer = () => {
  const [audio, setAudio] = useState<HTMLAudioElement>()
  const dispatch = useContext(PlayMusicDispatchContext)
  const state = useContext(PlayMusicStateContext)
  const { musicId, music, isPlaying } = state

  // useRef doesn’t notify you when its content changes. Mutating the .current property doesn’t cause a re-render.
  // 所以添加了一个 audio state 来触发变化
  const audioRef = useRef<HTMLAudioElement>()

  useEffect(() => {
    if (musicId === -1) {
      return
    }

    const musicUrl = getMusicUrl(musicId)
    if (!audioRef.current) {
      audioRef.current = new Audio(musicUrl)
    } else {
      audioRef.current.src = musicUrl
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }

    setAudio(audioRef.current)
    audioRef.current.play()
  }, [musicId])

  const togglePlayStatus = () => {
    if (isPlaying) {
      audioRef.current?.pause()
    } else {
      audioRef.current?.play()
    }

    dispatch({ type: ACTIONS.TOGGLE_PLAY_STATUS })
  }

  // const [slider, setSlider] = useState(0)

  console.log('audio.duration => ', music?.song.duration)

  return (
    <div className={styles.root}>
      {/* <div className={styles.progress}>
        <Slider
          value={slider}
          max={music?.song.duration}
          onRelease={(value) => {
            console.log(value)
            setSlider(value)
          }}
        />
      </div> */}
      <div className={styles.songWrap}>
        <img src={music?.picUrl ? `${music?.picUrl}?param=40y40` : undefined} />
        <div>
          <div className={styles.info}>
            <div className={styles.name}>{`${music?.name || '--'} -`}</div>
            <Artists artists={state?.music?.song?.artists} />
          </div>
          <div className={styles.time}>
            <AudioTimer audio={audio} />
          </div>
        </div>
      </div>

      <div className={styles.operations}>
        <div className={styles.prev}>
          <Icon icon='step-backward' />
        </div>
        <div className={styles.pause} onClick={togglePlayStatus}>
          <Icon icon={isPlaying ? 'pause' : 'play'} />
        </div>
        <div className={styles.next}>
          <Icon icon='step-forward' />
        </div>
      </div>

      <div className={styles.otherOperations}>
        <div>
          <Tooltip content='列表循环'>
            <Icon icon='swap-horizontal' />
          </Tooltip>
        </div>
        <div>
          <Tooltip content='打开播放列表'>
            <Icon icon='menu-closed' />
          </Tooltip>
        </div>
        <div>
          <Tooltip content='显示歌词'>
            词
          </Tooltip>
        </div>
        <div><Icon icon='volume-off' /></div>
      </div>
    </div>
  )
}

export default Footer
