import { beforeEach, describe, expect, it } from 'vitest'
import { useStore as store } from '.'

const course = {
  id: 1,
  modules: [
    {
      id: 1,
      title: 'Module 1 - React Component',
      lessons: [
        {
          id: 'Jai8w6K_GnY',
          title: 'Lesson 1 - Class Component',
          duration: '4:23',
        },
        {
          id: '1G0vSTqWELg',
          title: 'Utilizando estado',
          duration: '09:12',
        },
      ],
    },
    {
      id: 2,
      title: 'Iniciando com React',
      lessons: [
        { id: 'Jai8w6K_GnY', title: 'CSS Modules', duration: '13:45' },
        {
          id: 'w-DW4DhDfcw',
          title: 'Estilização do Post',
          duration: '10:05',
        },
        {
          id: 'D83-55LUdKE',
          title: 'Componente: Header',
          duration: '06:33',
        },
      ],
    },
  ],
}

const initialState = store.getState()

describe('player slice', () => {
  beforeEach(() => {
    store.setState(initialState)
  })

  it('should be able to play', () => {
    const { play } = store.getState()

    play([1, 2])

    const { currentModuleIndex, currentLessonIndex } = store.getState()

    expect(currentModuleIndex).toEqual(1)
    expect(currentLessonIndex).toEqual(2)
  })

  it('should be able to play next video automatically', () => {
    store.setState({ course })
    const { next } = store.getState()

    next()

    const { currentModuleIndex, currentLessonIndex } = store.getState()

    expect(currentModuleIndex).toEqual(0)
    expect(currentLessonIndex).toEqual(1)
  })

  it('should be able to play next module automatically', () => {
    store.setState({ course })

    const { next } = store.getState()
    store.setState({ currentLessonIndex: 1 })

    next()

    const { currentModuleIndex, currentLessonIndex } = store.getState()

    expect(currentModuleIndex).toEqual(1)
    expect(currentLessonIndex).toEqual(0)
  })

  it('should not update the current module and lesson index if there is no next lesson available', () => {
    store.setState({ course })

    const { next } = store.getState()
    store.setState({ currentLessonIndex: 2, currentModuleIndex: 1 })

    next()

    const { currentModuleIndex, currentLessonIndex } = store.getState()

    expect(currentModuleIndex).toEqual(1)
    expect(currentLessonIndex).toEqual(2)
  })
})
