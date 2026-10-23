import React, { useReducer, useEffect } from 'react';
import type { QuizConfig, SubtopicId } from '../../types';
import { quizReducer, initialQuizState } from './quizReducer';
import { QuizSetup } from './QuizSetup';
import { QuizQuestionComponent } from './QuizQuestion';
import { QuizResults } from './QuizResults';
import { getQuestionsByTopic, recordQuizAttempt } from '../../services/quizService';

export const QuizPage: React.FC = () => {
  const [state, dispatch] = useReducer(quizReducer, initialQuizState);

  // Read URL query params (e.g. ?topic=cc-cloud-computing) safely without router dependency
  const searchParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  const topicParam = searchParams?.get('topic') as SubtopicId | null;

  // 1-second interval timer while quiz is in progress
  useEffect(() => {
    if (state.status !== 'in_progress') return;

    const timer = setInterval(() => {
      dispatch({ type: 'TICK_TIMER' });
    }, 1000);

    return () => clearInterval(timer);
  }, [state.status]);

  // Handler: Start Quiz from setup
  const handleStartQuiz = (config: QuizConfig) => {
    const questions = getQuestionsByTopic(config.topicId, config.questionCount);
    dispatch({
      type: 'START_QUIZ',
      payload: {
        config,
        questions,
      },
    });
  };

  // Handler: Select an answer
  const handleSelectAnswer = (optionIndex: number) => {
    dispatch({
      type: 'SELECT_ANSWER',
      payload: {
        questionIndex: state.currentIndex,
        optionIndex,
      },
    });
  };

  // Handler: Next question
  const handleNext = () => {
    dispatch({ type: 'NEXT_QUESTION' });
  };

  // Handler: Previous question
  const handlePrev = () => {
    dispatch({ type: 'PREV_QUESTION' });
  };

  // Handler: Jump directly to question index
  const handleJumpTo = (index: number) => {
    dispatch({ type: 'JUMP_TO_QUESTION', payload: { index } });
  };

  // Handler: Submit Quiz
  const handleSubmit = () => {
    recordQuizAttempt(state.questions, state.answers);
    dispatch({ type: 'SUBMIT_QUIZ' });
  };

  // Handler: Retry the same quiz questions
  const handleRetry = () => {
    dispatch({
      type: 'RETRY_QUIZ',
      payload: {
        questions: state.questions,
      },
    });
  };

  // Handler: Return to setup for a new quiz
  const handleNewQuiz = () => {
    dispatch({ type: 'RESET_QUIZ' });
  };

  return (
    <main
      className="quiz-screen"
      style={{
        minHeight: '100vh',
        backgroundColor: '#f8fafc',
        padding: '2rem 1rem',
        boxSizing: 'border-box',
      }}
    >
      {/* View 1: Setup Mode */}
      {state.status === 'idle' && (
        <QuizSetup
          onStartQuiz={handleStartQuiz}
          initialTopicId={topicParam || 'mixed'}
        />
      )}

      {/* View 2: In-Progress Quiz Mode */}
      {state.status === 'in_progress' && state.questions.length > 0 && (
        <QuizQuestionComponent
          question={state.questions[state.currentIndex]}
          questionNumber={state.currentIndex + 1}
          totalQuestions={state.questions.length}
          selectedAnswer={state.answers[state.currentIndex]}
          onSelectAnswer={handleSelectAnswer}
          onNext={handleNext}
          onPrev={handlePrev}
          onSubmit={handleSubmit}
          onJumpTo={handleJumpTo}
          answers={state.answers}
          timeSpentSeconds={state.timeSpentSeconds}
        />
      )}

      {/* View 3: Submitted / Results Review Mode */}
      {state.status === 'submitted' && (
        <QuizResults
          questions={state.questions}
          answers={state.answers}
          timeSpentSeconds={state.timeSpentSeconds}
          onRetry={handleRetry}
          onNewQuiz={handleNewQuiz}
        />
      )}
    </main>
  );
};

export default QuizPage;
