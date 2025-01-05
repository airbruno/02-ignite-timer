import { FormContainer, MinuteAmountInput, TaskInput } from './styles'
import { useContext } from 'react'
import { CyclesContext } from '../../../../contexts/CyclesContext'
import { useFormContext } from 'react-hook-form'

export function NewCycleForm() {
  const { activeCycleId } = useContext(CyclesContext)
  const { register } = useFormContext()

  return (
    <FormContainer>
      <label htmlFor="task">Im working on</label>
      <TaskInput
        id="task"
        list="task-suggestions"
        placeholder="Name your project"
        disabled={!!activeCycleId}
        {...register('task')}
      />
      <datalist id="task-suggestions">
        <option value="Projeto 1"></option>
        <option value="Projeto 2"></option>
        <option value="Projeto 3"></option>
      </datalist>
      <label htmlFor="minuteAmount">for</label>
      <MinuteAmountInput
        type="number"
        id="minuteAmount"
        placeholder="00"
        step={1}
        min={1}
        max={60}
        disabled={!!activeCycleId}
        {...register('minuteAmount', { valueAsNumber: true })}
      />
      <span>minutes.</span>
    </FormContainer>
  )
}
