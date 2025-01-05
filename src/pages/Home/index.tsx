import { Play } from 'phosphor-react'
import {
  CancelCountdownButton,
  HomeContainer,
  StartCountdownButton,
} from './styles'
import { Countdown } from './components/Countdown'
import * as zod from 'zod'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { NewCycleForm } from './components/NewCycleForm'
import { useContext } from 'react'
import { CyclesContext } from '../../contexts/CyclesContext'

export function Home() {
  const { activeCycleId, cancelCurrentCycle, createNewCycle } =
    useContext(CyclesContext)

  const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1),
    minuteAmount: zod.number().min(1).max(60),
  })

  type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minuteAmount: 0,
    },
  })

  const { handleSubmit, watch, reset } = newCycleForm
  const task = watch('task')
  const isSubmitDisabled = !task

  function handleCreateNewCycle(data: NewCycleFormData) {
    createNewCycle(data)
    reset()
  }

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />

        {activeCycleId ? (
          <CancelCountdownButton onClick={cancelCurrentCycle} type="button">
            Cancel
          </CancelCountdownButton>
        ) : (
          <StartCountdownButton type="submit" disabled={isSubmitDisabled}>
            <Play size={24} />
            Start
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}
