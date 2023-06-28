import { ChevronDown } from 'lucide-react'
import { Lesson } from './Lesson'
import * as Collapsible from '@radix-ui/react-collapsible'
import { useStore } from '../zustand-store'

interface ModuleProps {
  title: string
  amountOfLessons: number
  moduleIndex: number
}

export function Module({ title, amountOfLessons, moduleIndex }: ModuleProps) {
  const { currentModuleIndex, currentLessonIndex, play, lessons } = useStore(
    (store) => {
      return {
        currentModuleIndex: store.currentModuleIndex,
        currentLessonIndex: store.currentLessonIndex,
        play: store.play,
        lessons: store.course?.modules[moduleIndex].lessons,
      }
    },
  )

  return (
    <Collapsible.Root className="group" defaultOpen={moduleIndex === 0}>
      <Collapsible.Trigger className="flex w-full items-center gap-3 bg-zinc-800 p-4">
        <div className="flex h-10 w-10 rounded-full items-center justify-center bg-zinc-950 text-xs">
          {moduleIndex + 1}
        </div>

        <div className="flex flex-col gap-1 text-left">
          <strong className="text-sm">{title}</strong>
          <span className="text-xs text-zinc-400">{amountOfLessons} aulas</span>
        </div>

        <ChevronDown className="w-5 h-5 ml-auto text-zinc-400 group-data-[state=open]:rotate-180 transition-transform" />
      </Collapsible.Trigger>

      <Collapsible.Content>
        <nav className="relative flex flex-col gap-5 p-6">
          {lessons &&
            lessons.map((lesson, index) => {
              const isCurrent =
                currentLessonIndex === index &&
                currentModuleIndex === moduleIndex

              return (
                <Lesson
                  title={lesson.title}
                  duration={lesson.duration}
                  key={lesson.id}
                  isCurrent={isCurrent}
                  onPlay={() => {
                    play([moduleIndex, index])
                  }}
                />
              )
            })}
        </nav>
      </Collapsible.Content>
    </Collapsible.Root>
  )
}
