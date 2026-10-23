import React, { useState } from 'react';
import type { QuizQuestion } from '../../types';
import { getTopicById } from '../../data/topics';

export interface QuizQuestionProps {
  question: QuizQuestion;
  questionNumber: number;
  totalQuestions: number;
  selectedAnswer: number | null;
  onSelectAnswer: (optionIndex: number) => void;
  onNext: () => void;
  onPrev: () => void;
  onSubmit: () => void;
  onJumpTo: (index: number) => void;
  answers: (number | null)[];
  timeSpentSeconds: number;
}

// Built-in crisp SVG icons
function ClockIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function ChevronLeftIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function ChevronRightIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

function CheckIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function AlertCircleIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}

export const QuizQuestionComponent: React.FC<QuizQuestionProps> = ({
  question,
  questionNumber,
  totalQuestions,
  selectedAnswer,
  onSelectAnswer,
  onNext,
  onPrev,
  onSubmit,
  onJumpTo,
  answers,
  timeSpentSeconds,
}) => {
  const [showSubmitModal, setShowSubmitModal] = useState<boolean>(false);
  const [isBookmarked, setIsBookmarked] = useState(() => localStorage.getItem(`cloudsprint_bookmark_${question.id}`) === 'true');
  const [savedForRevision, setSavedForRevision] = useState(() => localStorage.getItem(`cloudsprint_revision_${question.id}`) === 'true');

  const topic = getTopicById(question.topicId);
  const answeredCount = answers.filter((a) => a !== null).length;
  const progressPercent = Math.round((answeredCount / totalQuestions) * 100);
  const unansweredCount = totalQuestions - answeredCount;

  // Format timer as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Difficulty badge colors
  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return { bg: '#ecfdf5', text: '#059669', border: '#a7f3d0', label: 'Beginner' };
      case 'intermediate':
        return { bg: '#fffbeb', text: '#d97706', border: '#fde68a', label: 'Intermediate' };
      case 'advanced':
        return { bg: '#faf5ff', text: '#7e22ce', border: '#e9d5ff', label: 'Advanced' };
      default:
        return { bg: '#f1f5f9', text: '#475569', border: '#cbd5e1', label: difficulty };
    }
  };

  const diffBadge = getDifficultyBadge(question.difficulty ?? 'beginner');
  const optionLetters = ['A', 'B', 'C', 'D'];
  const hasAnswered = selectedAnswer !== null;
  const isCorrect = hasAnswered && selectedAnswer === question.correctIndex;
  const optionExplanation = (optionIndex: number) =>
    question.optionExplanations?.[optionIndex] ??
    (optionIndex === question.correctIndex
      ? `Correct. ${question.options[optionIndex]} is the best answer because ${question.explanation}`
      : `Incorrect. ${question.options[optionIndex]} does not satisfy the requirement in this question. The correct answer is ${optionLetters[question.correctIndex]}, ${question.options[question.correctIndex]}. ${question.explanation}`);

  const toggleSaved = (key: string, value: boolean, setValue: (next: boolean) => void) => {
    setValue(value);
    if (value) localStorage.setItem(key, 'true');
    else localStorage.removeItem(key);
  };

  const handleAttemptSubmit = () => {
    if (unansweredCount > 0) {
      setShowSubmitModal(true);
    } else {
      onSubmit();
    }
  };

  return (
    <div className="quiz-question-screen" style={{ maxWidth: '820px', margin: '0 auto', padding: '1.5rem 1rem' }}>
      {/* Top Header: Progress & Timer */}
      <div
        className="quiz-question-header"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '1rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '1.125rem', fontWeight: 800, color: '#0f172a' }}>
            Question {questionNumber} of {totalQuestions}
          </span>
          {topic && (
            <span
              style={{
                backgroundColor: '#f1f5f9',
                color: '#475569',
                fontSize: '0.8rem',
                fontWeight: 600,
                padding: '0.2rem 0.6rem',
                borderRadius: '0.375rem',
                border: '1px solid #e2e8f0',
              }}
            >
              {topic.name}
            </span>
          )}
          <span
            style={{
              backgroundColor: diffBadge.bg,
              color: diffBadge.text,
              border: `1px solid ${diffBadge.border}`,
              fontSize: '0.8rem',
              fontWeight: 700,
              padding: '0.2rem 0.6rem',
              borderRadius: '0.375rem',
            }}
          >
            {diffBadge.label}
          </span>
        </div>

        {/* Live Stopwatch Timer */}
        <div
          className="quiz-question-card"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.35rem 0.75rem',
            borderRadius: '9999px',
            backgroundColor: '#f8fafc',
            border: '1px solid #cbd5e1',
            color: '#334155',
            fontWeight: 700,
            fontSize: '0.9rem',
          }}
        >
          <ClockIcon className="w-4 h-4 text-sky-600" />
          <span>{formatTime(timeSpentSeconds)}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div
        style={{
          width: '100%',
          height: '6px',
          backgroundColor: '#e2e8f0',
          borderRadius: '9999px',
          overflow: 'hidden',
          marginBottom: '1.5rem',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${progressPercent}%`,
            backgroundColor: '#0284c7',
            transition: 'width 0.3s ease',
          }}
        />
      </div>

      {/* Question Card */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '1rem',
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
          padding: '2rem',
          marginBottom: '1.5rem',
        }}
      >
        <div className="quiz-question-actions" style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginBottom: '0.75rem' }}>
          <button type="button" onClick={() => toggleSaved(`cloudsprint_bookmark_${question.id}`, !isBookmarked, setIsBookmarked)}
            aria-pressed={isBookmarked} style={{ border: '1px solid #cbd5e1', borderRadius: '0.5rem', background: '#fff', color: '#0369a1', padding: '0.4rem 0.65rem', cursor: 'pointer', fontSize: '0.8rem' }}>
            {isBookmarked ? '★ Bookmarked' : '☆ Bookmark'}
          </button>
          <button type="button" onClick={() => toggleSaved(`cloudsprint_revision_${question.id}`, !savedForRevision, setSavedForRevision)}
            aria-pressed={savedForRevision} style={{ border: '1px solid #cbd5e1', borderRadius: '0.5rem', background: '#fff', color: '#7c3aed', padding: '0.4rem 0.65rem', cursor: 'pointer', fontSize: '0.8rem' }}>
            {savedForRevision ? '✓ Saved for revision' : 'Save for revision'}
          </button>
        </div>
        <h2
          style={{
            fontSize: '1.25rem',
            fontWeight: 700,
            lineHeight: '1.5',
            color: '#0f172a',
            marginBottom: '1.5rem',
          }}
        >
          {question.question}
        </h2>

        {/* Option Choices */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
          {question.options.map((optText, optIndex) => {
            const isSelected = selectedAnswer === optIndex;
            const isCorrectOption = hasAnswered && optIndex === question.correctIndex;
            const isWrongSelection = isSelected && !isCorrectOption;
            return (
              <button
                key={optIndex}
                type="button"
                onClick={() => !hasAnswered && onSelectAnswer(optIndex)}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1rem',
                  padding: '1rem 1.25rem',
                  borderRadius: '0.75rem',
                  border: isCorrectOption
                    ? '2px solid #16a34a'
                    : isWrongSelection
                    ? '2px solid #dc2626'
                    : isSelected
                    ? '2px solid #0284c7'
                    : '1px solid #cbd5e1',
                  backgroundColor: isCorrectOption
                    ? '#f0fdf4'
                    : isWrongSelection
                    ? '#fef2f2'
                    : isSelected
                    ? '#f0f9ff'
                    : '#ffffff',
                  color: isCorrectOption
                    ? '#166534'
                    : isWrongSelection
                    ? '#b91c1c'
                    : isSelected
                    ? '#0369a1'
                    : '#1e293b',
                  cursor: hasAnswered ? 'default' : 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s ease',
                  fontSize: '1rem',
                  lineHeight: '1.4',
                  boxShadow: isCorrectOption
                    ? '0 0 0 3px rgba(22, 163, 74, 0.15)'
                    : isWrongSelection
                    ? '0 0 0 3px rgba(220, 38, 38, 0.15)'
                    : isSelected
                    ? '0 0 0 3px rgba(2, 132, 199, 0.15)'
                    : 'none',
                }}
              >
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '28px',
                    height: '28px',
                    borderRadius: '9999px',
                    backgroundColor: isCorrectOption
                      ? '#16a34a'
                      : isWrongSelection
                      ? '#dc2626'
                      : isSelected
                      ? '#0284c7'
                      : '#f1f5f9',
                    color: isCorrectOption || isWrongSelection || isSelected ? '#ffffff' : '#475569',
                    fontWeight: 700,
                    fontSize: '0.875rem',
                    flexShrink: 0,
                  }}
                >
                  {optionLetters[optIndex]}
                </span>
                <span style={{ paddingTop: '0.2rem', fontWeight: isSelected ? 600 : 400 }}>
                  {optText}
                </span>
              </button>
            );
          })}
        </div>

        {hasAnswered && (
          <div
            role="status"
            style={{
              marginTop: '1.5rem',
              padding: '1rem 1.15rem',
              borderRadius: '0.75rem',
              border: `1px solid ${isCorrect ? '#a7f3d0' : '#fecaca'}`,
              backgroundColor: isCorrect ? '#ecfdf5' : '#fef2f2',
              color: isCorrect ? '#065f46' : '#991b1b',
            }}
          >
            <div style={{ fontWeight: 800, fontSize: '1rem', marginBottom: '0.75rem' }}>
              {isCorrect ? 'Correct — well done.' : 'Incorrect — your answer is marked in red.'}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {question.options.map((option, index) => (
                <div key={option} style={{ lineHeight: 1.45 }}>
                  <strong>{optionLetters[index]}. {option}</strong>
                  <div style={{ marginTop: '0.2rem' }}>{optionExplanation(index)}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Question Navigator Strip */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '0.75rem',
          border: '1px solid #e2e8f0',
          padding: '0.875rem 1rem',
          marginBottom: '1.5rem',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '0.5rem',
            fontSize: '0.85rem',
            color: '#64748b',
          }}
        >
          <span>Jump to Question:</span>
          <span>{answeredCount} of {totalQuestions} answered</span>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
          {answers.map((ans, idx) => {
            const isCurrent = idx === questionNumber - 1;
            const isAnswered = ans !== null;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => onJumpTo(idx)}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '0.375rem',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  border: isCurrent
                    ? '2px solid #0284c7'
                    : isAnswered
                    ? '1px solid #93c5fd'
                    : '1px solid #cbd5e1',
                  backgroundColor: isCurrent
                    ? '#0284c7'
                    : isAnswered
                    ? '#dbeafe'
                    : '#f8fafc',
                  color: isCurrent
                    ? '#ffffff'
                    : isAnswered
                    ? '#1e40af'
                    : '#64748b',
                }}
                aria-label={`Jump to question ${idx + 1}`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Navigation Buttons */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
          flexWrap: 'wrap',
        }}
      >
        <button
          type="button"
          onClick={onPrev}
          disabled={questionNumber === 1}
          style={{
            padding: '0.75rem 1.25rem',
            borderRadius: '0.5rem',
            border: '1px solid #cbd5e1',
            backgroundColor: questionNumber === 1 ? '#f1f5f9' : '#ffffff',
            color: questionNumber === 1 ? '#94a3b8' : '#334155',
            fontWeight: 600,
            cursor: questionNumber === 1 ? 'not-allowed' : 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
          }}
        >
          <ChevronLeftIcon className="w-5 h-5" />
          <span>Previous</span>
        </button>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          {questionNumber < totalQuestions ? (
            <button
              type="button"
              onClick={onNext}
              disabled={!hasAnswered}
              style={{
                padding: '0.75rem 1.25rem',
                borderRadius: '0.5rem',
                border: 'none',
                backgroundColor: hasAnswered ? '#0284c7' : '#94a3b8',
                color: '#ffffff',
                fontWeight: 600,
                cursor: hasAnswered ? 'pointer' : 'not-allowed',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
              }}
            >
              <span>Next</span>
              <ChevronRightIcon className="w-5 h-5" />
            </button>
          ) : null}

          <button
            type="button"
            onClick={handleAttemptSubmit}
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: '0.5rem',
              border: 'none',
              backgroundColor: '#059669',
              color: '#ffffff',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              boxShadow: '0 2px 4px rgba(5, 150, 105, 0.2)',
            }}
          >
            <CheckIcon className="w-5 h-5" />
            <span>Submit Exam</span>
          </button>
        </div>
      </div>

      {/* Confirmation Modal for Unanswered Questions */}
      {showSubmitModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 50,
            padding: '1rem',
          }}
        >
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '1rem',
              padding: '2rem',
              maxWidth: '460px',
              width: '100%',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <AlertCircleIcon className="w-6 h-6 text-amber-500" />
              <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700, color: '#0f172a' }}>
                Unanswered Questions
              </h3>
            </div>
            <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.5', margin: '0 0 1.5rem 0' }}>
              You have <strong>{unansweredCount} unanswered</strong> question{unansweredCount > 1 ? 's' : ''}. Unanswered questions will be scored as incorrect. Are you sure you want to finish and submit?
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button
                type="button"
                onClick={() => setShowSubmitModal(false)}
                style={{
                  padding: '0.6rem 1.1rem',
                  borderRadius: '0.375rem',
                  border: '1px solid #cbd5e1',
                  backgroundColor: '#ffffff',
                  color: '#334155',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Keep Reviewing
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowSubmitModal(false);
                  onSubmit();
                }}
                style={{
                  padding: '0.6rem 1.1rem',
                  borderRadius: '0.375rem',
                  border: 'none',
                  backgroundColor: '#059669',
                  color: '#ffffff',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                Yes, Submit Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizQuestionComponent;
