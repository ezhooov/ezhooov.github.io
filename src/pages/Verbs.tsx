import { TimeChallenge } from '../components/TimeChallenge.tsx'
import { verbsDictionary } from '../consts/verbsDictionary.ts'

interface IProps {
  onBack?: () => void
}

export default function Verbs({ onBack }: IProps) {
  return (
    <TimeChallenge
      words={verbsDictionary}
      time={0}
      onBack={onBack}
      disableTimer
      submitMode='button'
    />
  )
}
