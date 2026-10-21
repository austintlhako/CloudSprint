import React, { useState } from 'react';
import type { QuizQuestion } from '../../types';
import { calculateScoreBreakdown } from '../../services/quizService';
import { getTopicById } from '../../data/topics';

export interface QuizResultsProps {
  questions: QuizQuestion[];
  answers: (number | null)[];
  timeSpentSeconds: number;
  onRetry: () => void;
  onNewQuiz: () => void;
}

// Built-in crisp SVG icons
function CheckCircleIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function XCircleIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  );
}

function RotateCcwIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
    </svg>
  );
}

function PlusCircleIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="16" />
      <line x1="8" y1="12" x2="16" y2="12" />
    </svg>
  );
}

function ExternalLinkIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function ClockIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

export const QuizResults: React.FC<QuizResultsProps> = ({
  questions,
  answers,
  timeSpentSeconds,
  onRetry,
  onNewQuiz,
}) => {
  const [filterMode, setFilterMode] = useState<'all' | 'correct' | 'incorrect'>('all');

  const breakdown = calculateScoreBreakdown(questions, answers);
  const { score, total, percentage, passed, domainBreakdown } = breakdown;

  // Format timer as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const optionLetters = ['A', 'B', 'C', 'D'];

  // Filter questions for the review list
  const filteredIndices = questions
    .map((_, idx) => idx)
    .filter((idx) => {
      const isCorrect = answers[idx] === questions[idx].correctIndex;
      if (filterMode === 'correct') return isCorrect;
      if (filterMode === 'incorrect') return !isCorrect;
      return true;
    });

  return (
    <div style={{ maxWidth: '820px', margin: '0 auto', padding: '1.5rem 1rem' }}>
      {/* 1. Score Summary Banner */}
      <div
        style={{
          backgroundColor: '#0f172a',
          borderRadius: '1.25rem',
          padding: '2rem',
          color: '#ffffff',
          marginBottom: '2rem',
          boxShadow: '0 10px 25px -5px rgba(15, 23, 42, 0.25)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Glow decoration */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: passed
              ? 'linear-gradient(90deg, #10b981, #34d399)'
              : 'linear-gradient(90deg, #f59e0b, #fbbf24)',
          }}
        />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.85rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                color: passed ? '#34d399' : '#fbbf24',
                marginBottom: '0.5rem',
              }}
            >
              {passed ? <CheckCircleIcon className="w-4 h-4" /> : <XCircleIcon className="w-4 h-4" />}
              <span>{passed ? 'Passed — Ready for Exam!' : 'Keep Sprinting — Review Below'}</span>
            </div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0 0 0.5rem 0' }}>
              {score} / {total}{' '}
              <span style={{ fontSize: '1.5rem', fontWeight: 600, color: '#94a3b8' }}>
                ({percentage}%)
              </span>
            </h1>
            <p style={{ color: '#cbd5e1', margin: 0, fontSize: '0.95rem' }}>
              {passed
                ? '🎉 Congratulations! You cleared the official 70% (700/1000) passing score.'
                : '📚 The passing threshold is 70%. Review the explanations below and try again!'}
            </p>
          </div>

          <div
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              borderRadius: '0.75rem',
              padding: '1rem 1.25rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: '#cbd5e1' }}>
              <ClockIcon className="w-4 h-4 text-sky-400" />
              <span>Time: <strong>{formatTime(timeSpentSeconds)}</strong></span>
            </div>
            <div style={{ fontSize: '0.9rem', color: '#cbd5e1' }}>
              Score Target: <strong>70% Passing</strong>
            </div>
          </div>
        </div>

        {/* Domain Breakdown Bars */}
        <div style={{ marginTop: '2rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '1.5rem' }}>
          <h2 style={{ fontSize: '0.9rem', textTransform: 'uppercase', color: '#94a3b8', margin: '0 0 1rem 0', fontWeight: 700 }}>
            Domain Performance Breakdown
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {Object.entries(domainBreakdown).map(([domKey, domData]) => {
              if (domData.total === 0) return null;
              const isDomainPassing = domData.percentage >= 70;
              return (
                <div key={domKey}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.25rem' }}>
                    <span style={{ color: '#e2e8f0', fontWeight: 500 }}>{domData.domainName}</span>
                    <span style={{ color: isDomainPassing ? '#34d399' : '#fbbf24', fontWeight: 700 }}>
                      {domData.correct}/{domData.total} ({domData.percentage}%)
                    </span>
                  </div>
                  <div style={{ height: '6px', backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: '9999px', overflow: 'hidden' }}>
                    <div
                      style={{
                        height: '100%',
                        width: `${domData.percentage}%`,
                        backgroundColor: isDomainPassing ? '#10b981' : '#f59e0b',
                        transition: 'width 0.4s ease',
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. Action Toolbar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '1.5rem',
        }}
      >
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button
            type="button"
            onClick={onRetry}
            style={{
              padding: '0.75rem 1.25rem',
              borderRadius: '0.5rem',
              border: '1px solid #cbd5e1',
              backgroundColor: '#ffffff',
              color: '#0f172a',
              fontWeight: 700,
              fontSize: '0.95rem',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
            }}
          >
            <RotateCcwIcon className="w-4 h-4 text-sky-600" />
            <span>Retake Exam</span>
          </button>

          <button
            type="button"
            onClick={onNewQuiz}
            style={{
              padding: '0.75rem 1.25rem',
              borderRadius: '0.5rem',
              border: 'none',
              backgroundColor: '#0284c7',
              color: '#ffffff',
              fontWeight: 700,
              fontSize: '0.95rem',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: '0 2px 4px rgba(2, 132, 199, 0.25)',
            }}
          >
            <PlusCircleIcon className="w-4 h-4" />
            <span>New Quiz Setup</span>
          </button>
        </div>

        {/* Filter Pills */}
        <div style={{ display: 'flex', gap: '0.35rem', backgroundColor: '#f1f5f9', padding: '0.25rem', borderRadius: '0.5rem' }}>
          {(['all', 'correct', 'incorrect'] as const).map((mode) => {
            const isSelected = filterMode === mode;
            return (
              <button
                key={mode}
                type="button"
                onClick={() => setFilterMode(mode)}
                style={{
                  padding: '0.4rem 0.75rem',
                  borderRadius: '0.375rem',
                  border: 'none',
                  backgroundColor: isSelected ? '#ffffff' : 'transparent',
                  color: isSelected ? '#0f172a' : '#64748b',
                  fontWeight: isSelected ? 700 : 500,
                  fontSize: '0.825rem',
                  cursor: 'pointer',
                  textTransform: 'capitalize',
                  boxShadow: isSelected ? '0 1px 2px rgba(0, 0, 0, 0.05)' : 'none',
                }}
              >
                {mode === 'all' ? `All (${total})` : mode === 'correct' ? `Correct (${score})` : `Incorrect (${total - score})`}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Detailed Review Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {filteredIndices.map((qIdx) => {
          const q = questions[qIdx];
          const userAns = answers[qIdx];
          const isCorrect = userAns === q.correctIndex;
          const topic = getTopicById(q.topicId);

          return (
            <div
              key={q.id}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '1rem',
                border: isCorrect ? '1px solid #d1fae5' : '1px solid #fed7aa',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.03)',
                padding: '1.5rem',
              }}
            >
              {/* Question Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      padding: '0.2rem 0.6rem',
                      borderRadius: '0.375rem',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      backgroundColor: isCorrect ? '#ecfdf5' : '#fff7ed',
                      color: isCorrect ? '#059669' : '#ea580c',
                      border: isCorrect ? '1px solid #a7f3d0' : '1px solid #fed7aa',
                    }}
                  >
                    {isCorrect ? <CheckCircleIcon className="w-3.5 h-3.5" /> : <XCircleIcon className="w-3.5 h-3.5" />}
                    <span>Question {qIdx + 1} • {isCorrect ? 'Correct' : 'Needs Review'}</span>
                  </span>
                  {topic && (
                    <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 500 }}>
                      {topic.name}
                    </span>
                  )}
                </div>
              </div>

              {/* Question Prompt */}
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a', margin: '0 0 1rem 0', lineHeight: 1.45 }}>
                {q.question}
              </h3>

              {/* Options Breakdown */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
                {q.options.map((optText, optIdx) => {
                  const isThisCorrect = optIdx === q.correctIndex;
                  const isThisUserChoice = optIdx === userAns;

                  let optBorder = '#e2e8f0';
                  let optBg = '#ffffff';
                  let optColor = '#334155';

                  if (isThisCorrect) {
                    optBorder = '#10b981';
                    optBg = '#f0fdf4';
                    optColor = '#065f46';
                  } else if (isThisUserChoice && !isThisCorrect) {
                    optBorder = '#ef4444';
                    optBg = '#fef2f2';
                    optColor = '#991b1b';
                  }

                  return (
                    <div
                      key={optIdx}
                      style={{
                        padding: '0.65rem 0.85rem',
                        borderRadius: '0.5rem',
                        border: `1.5px solid ${optBorder}`,
                        backgroundColor: optBg,
                        color: optColor,
                        fontSize: '0.9rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <span
                          style={{
                            fontWeight: 700,
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '22px',
                            height: '22px',
                            borderRadius: '9999px',
                            backgroundColor: isThisCorrect ? '#10b981' : isThisUserChoice ? '#ef4444' : '#e2e8f0',
                            color: isThisCorrect || isThisUserChoice ? '#ffffff' : '#475569',
                            fontSize: '0.75rem',
                          }}
                        >
                          {optionLetters[optIdx]}
                        </span>
                        <span style={{ fontWeight: isThisCorrect || isThisUserChoice ? 600 : 400 }}>
                          {optText}
                        </span>
                      </div>
                      {isThisCorrect && (
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#059669' }}>
                          ✓ Correct Answer
                        </span>
                      )}
                      {isThisUserChoice && !isThisCorrect && (
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#dc2626' }}>
                          ✗ Your Choice
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* In-depth Explanation Card */}
              <div
                style={{
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '0.5rem',
                  padding: '1rem',
                  fontSize: '0.875rem',
                  lineHeight: '1.5',
                  color: '#334155',
                  marginBottom: '0.75rem',
                }}
              >
                <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '0.35rem' }}>
                  💡 Explanation & Learning Context:
                </div>
                {q.explanation}
              </div>

              {/* Official Microsoft Learn Reference Link */}
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <a
                  href={q.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    fontSize: '0.825rem',
                    fontWeight: 600,
                    color: '#0284c7',
                    textDecoration: 'none',
                    padding: '0.3rem 0.6rem',
                    borderRadius: '0.375rem',
                    backgroundColor: '#f0f9ff',
                    border: '1px solid #bae6fd',
                  }}
                >
                  <span>Microsoft Learn Documentation</span>
                  <ExternalLinkIcon className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuizResults;
