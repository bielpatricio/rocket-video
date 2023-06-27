import { useAppSelector } from '../store'
import { useCurrentLesson } from '../store/slices/player'

export function Header() {
  const { currentLesson, currentModule } = useCurrentLesson()

  const isCourseLoading = useAppSelector((state) => state.player.isLoading)

  if (!currentLesson || !currentModule) return null

  if (isCourseLoading) {
    return (
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold">Carregando...</h1>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-2xl font-bold">{currentLesson.title}</h1>
      <span className="text-sm text-zinc-400">{currentModule.title}</span>
    </div>
  )
}
