import React, { useState } from 'react';
import type { QuizConfig, SubtopicId } from '../../types';
import { DOMAINS, getTopicsByDomain } from '../../data/topics';
import { getAvailableQuestionCount } from '../../services/quizService';

interface QuizSetupProps {
  onStartQuiz: (config: QuizConfig) => void;
  initialTopicId?: SubtopicId | 'mixed';
}

// Built-in crisp SVG icons matching Lucide specs (zero external dependency required)
function PlayIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="5 3 19 12 5 21 5 3" />
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

function ClockIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function CheckCircle2Icon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function InfoIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
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
  const countOptions = [5, 10, 15, Math.min(30, availableCount)].filter(
    (count, index, self) => count <= availableCount && self.indexOf(count) === index
  );

  const handleStart = () => {
    onStartQuiz({
      topicId: selectedTopic,
      questionCount: Math.min(selectedCount, availableCount),
    });
  };

  const estimatedMinutes = Math.max(1, Math.ceil(selectedCount * 1.2));

  return (
    <div style={{ maxWidth: '768px', margin: '0 auto', padding: '1.5rem 1rem' }}>
      {/* Header Banner */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.25rem 0.75rem',
            borderRadius: '9999px',
            backgroundColor: '#0284c71a',
            color: '#0284c7',
            fontSize: '0.875rem',
            fontWeight: 600,
            marginBottom: '0.75rem',
          }}
        >
          <LayersIcon className="w-4 h-4" />
          <span>Interactive Exam Simulator</span>
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, margin: '0 0 0.5rem 0', color: '#0f172a' }}>
          Smart Quiz Builder
        </h1>
        <p style={{ color: '#64748b', fontSize: '1rem', margin: 0 }}>
          Configure your customized AZ-900 practice test with verified question rationales.
        </p>
      </div>

      {/* Main Configuration Card */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '1rem',
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05)',
          padding: '2rem',
          marginBottom: '1.5rem',
        }}
      >
        {/* Step 1: Select Topic */}
        <div style={{ marginBottom: '2rem' }}>
          <label
            htmlFor="topic-select"
            style={{
              display: 'block',
              fontWeight: 700,
              fontSize: '1rem',
              color: '#1e293b',
              marginBottom: '0.5rem',
            }}
          >
            1. Select Practice Scope:
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
              padding: '0.75rem 1rem',
              borderRadius: '0.5rem',
              border: '1px solid #cbd5e1',
              backgroundColor: '#f8fafc',
              fontSize: '1rem',
              color: '#0f172a',
              outline: 'none',
              cursor: 'pointer',
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
          <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.875rem', color: '#64748b' }}>
            Pool available: <strong style={{ color: '#0f172a' }}>{availableCount} questions</strong>
          </p>
        </div>

        {/* Step 2: Select Question Count */}
        <div style={{ marginBottom: '2rem' }}>
          <label
            style={{
              display: 'block',
              fontWeight: 700,
              fontSize: '1rem',
              color: '#1e293b',
              marginBottom: '0.75rem',
            }}
          >
            2. Choose Question Count:
          </label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            {countOptions.map((count) => {
              const isSelected = selectedCount === count;
              return (
                <button
                  key={count}
                  type="button"
                  onClick={() => setSelectedCount(count)}
                  style={{
                    flex: '1 1 80px',
                    padding: '0.75rem 1rem',
                    borderRadius: '0.5rem',
                    border: isSelected ? '2px solid #0284c7' : '1px solid #e2e8f0',
                    backgroundColor: isSelected ? '#f0f9ff' : '#ffffff',
                    color: isSelected ? '#0369a1' : '#334155',
                    fontWeight: isSelected ? 700 : 500,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    textAlign: 'center',
                  }}
                >
                  {count} Questions
                </button>
              );
            })}
          </div>
        </div>

        {/* Exam Target & Estimate Info Box */}
        <div
          style={{
            backgroundColor: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '0.75rem',
            padding: '1rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            marginBottom: '2rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <CheckCircle2Icon className="w-5 h-5 text-emerald-600" />
            <div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>
                Passing Benchmark
              </div>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a' }}>
                70% (700 / 1000)
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ClockIcon className="w-5 h-5 text-sky-600" />
            <div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>
                Estimated Duration
              </div>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a' }}>
                ~{estimatedMinutes} Minutes
              </div>
            </div>
          </div>
        </div>

        {/* Start Button */}
        <button
          type="button"
          onClick={handleStart}
          disabled={availableCount === 0}
          style={{
            width: '100%',
            padding: '1rem',
            borderRadius: '0.5rem',
            backgroundColor: availableCount > 0 ? '#0284c7' : '#94a3b8',
            color: '#ffffff',
            fontWeight: 700,
            fontSize: '1.125rem',
            border: 'none',
            cursor: availableCount > 0 ? 'pointer' : 'not-allowed',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            transition: 'background-color 0.2s ease',
          }}
        >
          <PlayIcon className="w-5 h-5" />
          <span>Start Practice Exam</span>
        </button>
      </div>

      {/* Unofficial Disclaimer Footer Note */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '0.5rem',
          padding: '0.75rem 1rem',
          backgroundColor: '#fefce8',
          border: '1px solid #fef08a',
          borderRadius: '0.5rem',
          color: '#854d0e',
          fontSize: '0.8rem',
          lineHeight: '1.4',
        }}
      >
        <InfoIcon className="w-4 h-4 flex-shrink-0" />
        <div>
          <strong>Unofficial Study Companion:</strong> CloudSprint is an independent educational tool created for the 1MillionDevs Hackathon. Questions are original scenarios derived from the public Microsoft Learn AZ-900 syllabus. Not affiliated with Microsoft.
        </div>
      </div>
    </div>
  );
};

export default QuizSetup;
