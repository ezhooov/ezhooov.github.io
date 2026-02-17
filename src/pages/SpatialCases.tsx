import { TimeChallenge } from '../components/TimeChallenge.tsx'
import { spatialCasesDictionary } from '../consts/spatialCasesDictionary.ts'

interface IProps {
  onBack?: () => void
}

export default function SpatialCases({ onBack }: IProps) {
  return (
    <TimeChallenge
      words={spatialCasesDictionary}
      time={0}
      onBack={onBack}
      disableTimer
      submitMode='button'
    />
  )
}
