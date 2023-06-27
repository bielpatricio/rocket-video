import { describe, expect, it } from 'vitest'
import {
  player as reducer,
  playerSlice,
  play,
  next,
  PlayerState,
} from './player'

const exampleState: PlayerState = {
  course: {
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
  },
  isLoading: false,
  currentModuleIndex: 0,
  currentLessonIndex: 0,
}

describe('player slice', () => {
  it('should be able to play', () => {
    const initialState = playerSlice.getInitialState()

    const state = reducer(initialState, play([1, 2]))

    expect(state.currentModuleIndex).toEqual(1)
    expect(state.currentLessonIndex).toEqual(2)
  })

  it('should be able to play next video automatically', () => {
    const state = reducer(exampleState, next())

    expect(state.currentModuleIndex).toEqual(0)
    expect(state.currentLessonIndex).toEqual(1)
  })

  it('should be able to play next module automatically', () => {
    const state = reducer({ ...exampleState, currentLessonIndex: 1 }, next())

    expect(state.currentModuleIndex).toEqual(1)
    expect(state.currentLessonIndex).toEqual(0)
  })

  it('should not update the current module and lesson index if there is no next lesson available', () => {
    const state = reducer(
      { ...exampleState, currentLessonIndex: 2, currentModuleIndex: 1 },
      next(),
    )

    expect(state.currentModuleIndex).toEqual(1)
    expect(state.currentLessonIndex).toEqual(2)
  })
})
