import type { QuizQuestion, QuizConfig } from '../../types';
import { calculateScore } from '../../services/quizService';

export type QuizStatus = 'idle' | 'in_progress' | 'submitted';

export interface QuizState {
  status: QuizStatus;
  config: QuizConfig | null;
  questions: QuizQuestion[];
  answers: (number | null)[];
  currentIndex: number;
  score: number;
  timeSpentSeconds: number;
}

export type QuizAction =
  | { type: 'START_QUIZ'; payload: { config: QuizConfig; questions: QuizQuestion[] } }
  | { type: 'SELECT_ANSWER'; payload: { questionIndex: number; optionIndex: number } }
  | { type: 'NEXT_QUESTION' }
  | { type: 'PREV_QUESTION' }
  | { type: 'JUMP_TO_QUESTION'; payload: { index: number } }
  | { type: 'SUBMIT_QUIZ' }
  | { type: 'TICK_TIMER' }
  | { type: 'RETRY_QUIZ'; payload: { questions: QuizQuestion[] } }
  | { type: 'RESET_QUIZ' };

export const initialQuizState: QuizState = {
  status: 'idle',
  config: null,
  questions: [],
  answers: [],
  currentIndex: 0,
  score: 0,
  timeSpentSeconds: 0,
};

export function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case 'START_QUIZ': {
      return {
        status: 'in_progress',
        config: action.payload.config,
        questions: action.payload.questions,
        answers: new Array<(number | null)>(action.payload.questions.length).fill(null),
        currentIndex: 0,
        score: 0,
        timeSpentSeconds: 0,
      };
    }

    case 'SELECT_ANSWER': {
      if (state.status === 'submitted') {
        return state; // Locked once submitted
      }
      const updatedAnswers = [...state.answers];
      updatedAnswers[action.payload.questionIndex] = action.payload.optionIndex;
      return { ...state, answers: updatedAnswers };
    }

    case 'NEXT_QUESTION': {
      if (state.currentIndex < state.questions.length - 1) {
        return { ...state, currentIndex: state.currentIndex + 1 };
      }
      return state;
    }

    case 'PREV_QUESTION': {
      if (state.currentIndex > 0) {
        return { ...state, currentIndex: state.currentIndex - 1 };
      }
      return state;
    }

    case 'JUMP_TO_QUESTION': {
      if (action.payload.index >= 0 && action.payload.index < state.questions.length) {
        return { ...state, currentIndex: action.payload.index };
      }
      return state;
    }

    case 'SUBMIT_QUIZ': {
      return {
        ...state,
        status: 'submitted',
        score: calculateScore(state.questions, state.answers),
      };
    }

    case 'TICK_TIMER': {
      if (state.status !== 'in_progress') {
        return state;
      }
      return { ...state, timeSpentSeconds: state.timeSpentSeconds + 1 };
    }

    case 'RETRY_QUIZ': {
      return {
        ...state,
        status: 'in_progress',
        questions: action.payload.questions,
        answers: new Array<(number | null)>(action.payload.questions.length).fill(null),
        currentIndex: 0,
        score: 0,
        timeSpentSeconds: 0,
      };
    }

    case 'RESET_QUIZ': {
      return initialQuizState;
    }

    default:
      return state;
  }
}

export default quizReducer;
