import { createContext, ReactNode, useState } from 'react'

interface ICycleContextProviderProps {
  children: ReactNode
}

interface ICycle {
  id: string
  task: string
  minuteAmount: number
  startDate: Date
  cancelDate?: Date
  completionDate?: Date
}
interface INewCycleData {
  task: string
  minuteAmount: number
}

interface ICycleContext {
  cycles: ICycle[]
  activeCycle: ICycle | undefined
  activeCycleId: string | null
  completeCurrentCycle: () => void
  createNewCycle: (data: INewCycleData) => void
  cancelCurrentCycle: () => void
}

export const CyclesContext = createContext({} as ICycleContext)

export function CyclesContextProvider({
  children,
}: ICycleContextProviderProps) {
  const [cycles, setCycles] = useState<ICycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)

  const activeCycle = cycles.find((item) => item.id === activeCycleId)

  function createNewCycle(data: INewCycleData) {
    const id = String(Date.now())
    const newCycle: ICycle = {
      id,
      task: data.task,
      minuteAmount: data.minuteAmount,
      startDate: new Date(),
    }

    setCycles([...cycles, newCycle])
    setActiveCycleId(id)
  }

  function cancelCurrentCycle() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, cancelDate: new Date() }
        } else {
          return cycle
        }
      }),
    )
    setActiveCycleId(null)
  }

  function completeCurrentCycle() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, completionDate: new Date() }
        } else {
          return cycle
        }
      }),
    )
    setActiveCycleId(null)
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        completeCurrentCycle,
        cancelCurrentCycle,
        createNewCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
