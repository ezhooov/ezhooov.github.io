import { TimeChallenge } from '../components/TimeChallenge.tsx'
import { firstPersonDictionary } from '../consts/firstPersonDictionary.ts'

interface IProps {
  onBack?: () => void
}

export default function FirstPerson({ onBack }: IProps) {
  return (
    <TimeChallenge words={firstPersonDictionary} time={7} onBack={onBack} />
  )
}
