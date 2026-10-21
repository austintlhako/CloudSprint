import React, { useState } from 'react';
import type { QuizConfig, SubtopicId } from '../../types';
import { DOMAINS, getTopicsByDomain } from '../../data/topics';
import { getAvailableQuestionCount } from '../../services/quizService';

export interface QuizSetupProps {
  onStartQuiz: (config: QuizConfig) => void;
  initialTopicId?: SubtopicId | 'mixed';
}

// Built-in crisp SVG icons
function ArrowRightIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function LayersIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  );
}

function TargetIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

function ClockIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function ShieldCheckIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export const QuizSetup: React.FC<QuizSetupProps> = ({
  onStartQuiz,
  initialTopicId = 'mixed',
}) => {
  const [selectedTopic, setSelectedTopic] = useState<SubtopicId | 'mixed'>(initialTopicId);
  const [selectedCount, setSelectedCount] = useState<number>(10);

  const availableCount = getAvailableQuestionCount(selectedTopic);
  const pillOptions = [5, 10, 15];

  const handleStart = () => {
    onStartQuiz({
      topicId: selectedTopic,
      questionCount: Math.min(selectedCount, availableCount),
    });
  };

  const estimatedMinutes = Math.max(1, selectedCount); // ~1 min per question

  return (
    <div style={{ maxWidth: '720px', margin: '0 auto', padding: '2rem 1rem' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.35rem 0.9rem',
            borderRadius: '9999px',
            backgroundColor: '#0c4a6e',
            color: '#38bdf8',
            fontSize: '0.85rem',
            fontWeight: 700,
            letterSpacing: '0.03em',
            marginBottom: '0.75rem',
            border: '1px solid #0284c7',
          }}
        >
          <LayersIcon className="w-4 h-4" />
          <span>AZ-900 EXAM SIMULATOR</span>
        </div>
        <h1
          style={{
            fontSize: '2.25rem',
            fontWeight: 800,
            color: '#0f172a',
            margin: '0 0 0.5rem 0',
            letterSpacing: '-0.025em',
          }}
        >
          Smart Quiz Builder
        </h1>
        <p style={{ color: '#475569', fontSize: '1.05rem', margin: 0, lineHeight: 1.5 }}>
          Test your Azure knowledge with realistic, scenario-based practice questions.
        </p>
      </div>

      {/* Main Card with navy/cyan glow aesthetic */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '1.25rem',
          border: '1px solid #cbd5e1',
          boxShadow: '0 10px 25px -5px rgba(2, 132, 199, 0.1), 0 8px 10px -6px rgba(2, 132, 199, 0.05)',
          padding: '2.25rem',
          marginBottom: '1.5rem',
          position: 'relative',
        }}
      >
        {/* Subtle cyan glow line at top of card */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '2rem',
            right: '2rem',
            height: '3px',
            background: 'linear-gradient(90deg, #0284c7, #38bdf8, #0ea5e9)',
            borderRadius: '9999px',
          }}
        />

        {/* 1. Topic Selection */}
        <div style={{ marginBottom: '2rem' }}>
          <label
            htmlFor="topic-select"
            style={{
              display: 'block',
              fontWeight: 700,
              fontSize: '1rem',
              color: '#0f172a',
              marginBottom: '0.6rem',
            }}
          >
            1. Select Practice Scope
          </label>
          <select
            id="topic-select"
            value={selectedTopic}
            onChange={(e) => {
              const val = e.target.value as SubtopicId | 'mixed';
              setSelectedTopic(val);
              const maxAvailable = getAvailableQuestionCount(val);
              if (selectedCount > maxAvailable) {
                setSelectedCount(Math.min(10, maxAvailable));
              }
            }}
            style={{
              width: '100%',
              padding: '0.85rem 1rem',
              borderRadius: '0.6rem',
              border: '1.5px solid #cbd5e1',
              backgroundColor: '#f8fafc',
              fontSize: '0.95rem',
              fontWeight: 500,
              color: '#0f172a',
              outline: 'none',
              cursor: 'pointer',
              transition: 'border-color 0.2s',
            }}
          >
            <option value="mixed">🎯 Mixed Exam Mode (All 3 Domains — Recommended)</option>
            {DOMAINS.map((domain) => (
              <optgroup key={domain.id} label={`${domain.name} (${domain.weight})`}>
                {getTopicsByDomain(domain.id).map((topic) => (
                  <option key={topic.id} value={topic.id}>
                    {topic.name}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
          <div style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: '#64748b' }}>
            Available question pool: <strong style={{ color: '#0284c7' }}>{availableCount} questions</strong>
          </div>
        </div>

        {/* 2. Question Count Selector */}
        <div style={{ marginBottom: '2rem' }}>
          <label
            style={{
              display: 'block',
              fontWeight: 700,
              fontSize: '1rem',
              color: '#0f172a',
              marginBottom: '0.75rem',
            }}
          >
            2. Choose Question Count
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
            {pillOptions.map((count) => {
              const isSelected = selectedCount === count;
              const isDisabled = count > availableCount;
              return (
                <button
                  key={count}
                  type="button"
                  disabled={isDisabled}
                  onClick={() => setSelectedCount(count)}
                  style={{
                    padding: '0.85rem 0.5rem',
                    borderRadius: '0.6rem',
                    border: isSelected ? '2px solid #0284c7' : '1.5px solid #e2e8f0',
                    backgroundColor: isSelected ? '#f0f9ff' : isDisabled ? '#f8fafc' : '#ffffff',
                    color: isSelected ? '#0369a1' : isDisabled ? '#94a3b8' : '#334155',
                    fontWeight: isSelected ? 700 : 600,
                    fontSize: '0.95rem',
                    cursor: isDisabled ? 'not-allowed' : 'pointer',
                    transition: 'all 0.15s ease',
                    boxShadow: isSelected ? '0 0 0 3px rgba(2, 132, 199, 0.15)' : 'none',
                    textAlign: 'center',
                  }}
                >
                  {count} Questions
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Exam Mode Info Box */}
        <div
          style={{
            backgroundColor: '#0f172a',
            color: '#f8fafc',
            borderRadius: '0.85rem',
            padding: '1.25rem',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1.5rem',
            marginBottom: '2rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '0.5rem',
                backgroundColor: 'rgba(56, 189, 248, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#38bdf8',
              }}
            >
              <TargetIcon className="w-5 h-5" />
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 600 }}>
                Passing Benchmark
              </div>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: '#38bdf8' }}>
                70% (700 / 1000)
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '0.5rem',
                backgroundColor: 'rgba(56, 189, 248, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#38bdf8',
              }}
            >
              <ClockIcon className="w-5 h-5" />
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 600 }}>
                Estimated Duration
              </div>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff' }}>
                ~{estimatedMinutes} Minutes (~1 min/q)
              </div>
            </div>
          </div>
        </div>

        {/* Primary Start Quiz Button with Arrow Icon */}
        <button
          type="button"
          onClick={handleStart}
          disabled={availableCount === 0}
          style={{
            width: '100%',
            padding: '1rem 1.5rem',
            borderRadius: '0.65rem',
            background: availableCount > 0 ? 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)' : '#94a3b8',
            color: '#ffffff',
            fontWeight: 700,
            fontSize: '1.125rem',
            border: 'none',
            cursor: availableCount > 0 ? 'pointer' : 'not-allowed',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.6rem',
            boxShadow: availableCount > 0 ? '0 4px 14px rgba(2, 132, 199, 0.35)' : 'none',
            transition: 'transform 0.15s ease, box-shadow 0.15s ease',
          }}
        >
          <span>Start Practice Exam</span>
          <ArrowRightIcon className="w-5 h-5" />
        </button>
      </div>

      {/* Unofficial Disclaimer Callout */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '0.6rem',
          padding: '0.85rem 1rem',
          backgroundColor: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: '0.65rem',
          color: '#64748b',
          fontSize: '0.825rem',
          lineHeight: '1.45',
        }}
      >
        <ShieldCheckIcon className="w-4 h-4 text-sky-600 flex-shrink-0" />
        <div>
          <strong style={{ color: '#0f172a' }}>Unofficial Educational Tool:</strong> CloudSprint is an independent study aid created for the 1MillionDevs Hackathon. Questions are original scenarios derived from the public Microsoft Learn AZ-900 syllabus. Not affiliated with Microsoft Corporation.
        </div>
      </div>
    </div>
  );
};

export default QuizSetup;
