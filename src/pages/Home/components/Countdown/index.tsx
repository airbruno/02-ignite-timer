import { useContext, useEffect, useState } from 'react'
import { CountdownContainer, Separator } from './styles'
import { differenceInSeconds } from 'date-fns'
import { CyclesContext } from '../../../../contexts/CyclesContext'

export function Countdown() {
  const { activeCycle, activeCycleId, cancelCurrentCycle } =
    useContext(CyclesContext)
  const [elapsedSeconds, setElapsedSeconds] = useState(0)

  const cycleSeconds = activeCycle ? activeCycle.minuteAmount : 0 // TODO: add multiplication by 60 to convert to minutes
  const remainingSeconds = activeCycle ? cycleSeconds - elapsedSeconds : 0
  const displayMinutes = String(Math.floor(remainingSeconds / 60)).padStart(
    2,
    '0',
  )
  const displaySeconds = String(remainingSeconds % 60).padStart(2, '0')

  useEffect(() => {
    let interval: number

    if (activeCycle) {
      interval = setInterval(() => {
        const currentDifference = differenceInSeconds(
          new Date(),
          activeCycle.startDate,
        )

        if (remainingSeconds === 0) {
          cancelCurrentCycle()
          setElapsedSeconds(0)
          clearInterval(interval)
        } else {
          setElapsedSeconds(currentDifference)
        }
      }, 1000)
    }

    if (!activeCycleId) {
      setElapsedSeconds(0)
    }

    return () => {
      clearInterval(interval)
    }
  }, [activeCycle, remainingSeconds, activeCycleId, cancelCurrentCycle])

  useEffect(() => {
    if (activeCycleId) {
      document.title = `${displayMinutes}:${displaySeconds}`
    }
  }, [displayMinutes, displaySeconds, activeCycleId])

  return (
    <CountdownContainer>
      <span>{displayMinutes[0]}</span>
      <span>{displayMinutes[1]}</span>
      <Separator>:</Separator>
      <span>{displaySeconds[0]}</span>
      <span>{displaySeconds[1]}</span>
    </CountdownContainer>
  )
}
