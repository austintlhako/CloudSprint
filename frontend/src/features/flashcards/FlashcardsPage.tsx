import React, { useState, useEffect } from 'react';
import type { SubtopicId, FlashcardStatus } from '../../types';
import { DOMAINS, getTopicsByDomain } from '../../data/topics';
import { getAllFlashcards, getFlashcardProgress } from '../../services/flashcardService';
import { FlashcardDeck } from './FlashcardDeck';

// Built-in crisp SVG icons
function LayersIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  );
}

export const FlashcardsPage: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<SubtopicId | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'review' | 'unseen'>('all');
  const [progressMap, setProgressMap] = useState<Record<string, FlashcardStatus>>({});

  const allCards = getAllFlashcards();

  // Load progress for filter counts
  useEffect(() => {
    let isMounted = true;
    getFlashcardProgress().then((map) => {
      if (isMounted) setProgressMap(map);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  // Filter cards by topic
  const topicFilteredCards =
    selectedTopic === 'all'
      ? allCards
      : allCards.filter((card) => card.subtopicId === selectedTopic || card.topicId === selectedTopic);

  // Filter cards by status pill
  const activeDeckCards = topicFilteredCards.filter((card) => {
    const status = progressMap[card.id] || 'unseen';
    if (statusFilter === 'review') return status === 'review';
    if (statusFilter === 'unseen') return status === 'unseen';
    return true;
  });

  // Global counts for the current topic filter
  const totalInTopic = topicFilteredCards.length;
  const knownInTopic = topicFilteredCards.filter((c) => progressMap[c.id] === 'know').length;
  const reviewInTopic = topicFilteredCards.filter((c) => progressMap[c.id] === 'review').length;
  const unseenInTopic = totalInTopic - (knownInTopic + reviewInTopic);

  const handleNavigateToQuiz = (topicId: string) => {
    const url = topicId && topicId !== 'all' ? `/quiz?topic=${topicId}` : '/quiz';
    window.location.href = url;
  };

  return (
    <main
      className="flashcards-screen"
      style={{
        minHeight: '100vh',
        backgroundColor: '#f8fafc',
        padding: '2rem 1rem',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ maxWidth: '820px', margin: '0 auto' }}>
        {/* Page Header */}
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
            <span>ACTIVE RECALL ENGINE</span>
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
            Flashcard Coach
          </h1>
          <p style={{ color: '#475569', fontSize: '1.05rem', margin: 0 }}>
            Master core Azure terminology with active recall and self-assessment.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '1rem',
            border: '1px solid #e2e8f0',
            padding: '1.25rem 1.5rem',
            marginBottom: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.02)',
          }}
        >
          {/* Topic Dropdown */}
          <div>
            <label
              htmlFor="flashcard-topic-select"
              style={{
                display: 'block',
                fontWeight: 700,
                fontSize: '0.9rem',
                color: '#334155',
                marginBottom: '0.4rem',
              }}
            >
              Filter by Exam Domain or Topic:
            </label>
            <select
              id="flashcard-topic-select"
              name="flashcardTopic"
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value as SubtopicId | 'all')}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                borderRadius: '0.5rem',
                border: '1.5px solid #cbd5e1',
                backgroundColor: '#f8fafc',
                fontSize: '0.95rem',
                color: '#0f172a',
                outline: 'none',
                cursor: 'pointer',
              }}
            >
              <option value="all">📚 All AZ-900 Topics (All 3 Domains)</option>
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
          </div>

          {/* Status Filter Pills & Quick Counts */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '0.75rem',
              borderTop: '1px solid #f1f5f9',
              paddingTop: '0.75rem',
            }}
          >
            <div style={{ display: 'flex', gap: '0.4rem' }}>
              {(['all', 'review', 'unseen'] as const).map((mode) => {
                const isSelected = statusFilter === mode;
                const label =
                  mode === 'all'
                    ? `All (${totalInTopic})`
                    : mode === 'review'
                    ? `Needs Review (${reviewInTopic})`
                    : `Unseen (${unseenInTopic})`;
                return (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setStatusFilter(mode)}
                    style={{
                      padding: '0.35rem 0.75rem',
                      borderRadius: '0.375rem',
                      border: isSelected ? '1px solid #0284c7' : '1px solid #e2e8f0',
                      backgroundColor: isSelected ? '#f0f9ff' : '#ffffff',
                      color: isSelected ? '#0369a1' : '#64748b',
                      fontWeight: isSelected ? 700 : 500,
                      fontSize: '0.8rem',
                      cursor: 'pointer',
                    }}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            {/* Quick Mastered Counter */}
            <div style={{ fontSize: '0.85rem', color: '#059669', fontWeight: 700 }}>
              ✓ {knownInTopic} Mastered
            </div>
          </div>
        </div>

        {/* Flashcard Deck Controller */}
        <FlashcardDeck
          cards={activeDeckCards}
          selectedTopicId={selectedTopic}
          onNavigateToQuiz={handleNavigateToQuiz}
        />

        {/* Hotkeys Legend */}
        <div
          style={{
            maxWidth: '680px',
            margin: '2rem auto 1rem auto',
            padding: '0.75rem 1rem',
            backgroundColor: '#ffffff',
            borderRadius: '0.5rem',
            border: '1px solid #e2e8f0',
            fontSize: '0.8rem',
            color: '#64748b',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1.25rem',
          }}
        >
          <span><strong>Keyboard Shortcuts:</strong></span>
          <span><kbd style={{ backgroundColor: '#f1f5f9', padding: '0.15rem 0.4rem', borderRadius: '0.25rem', border: '1px solid #cbd5e1' }}>Space</kbd> Flip</span>
          <span><kbd style={{ backgroundColor: '#f1f5f9', padding: '0.15rem 0.4rem', borderRadius: '0.25rem', border: '1px solid #cbd5e1' }}>← / →</kbd> Prev / Next</span>
          <span><kbd style={{ backgroundColor: '#f1f5f9', padding: '0.15rem 0.4rem', borderRadius: '0.25rem', border: '1px solid #cbd5e1' }}>1 / R</kbd> Need Review</span>
          <span><kbd style={{ backgroundColor: '#f1f5f9', padding: '0.15rem 0.4rem', borderRadius: '0.25rem', border: '1px solid #cbd5e1' }}>2 / K</kbd> I Know This</span>
        </div>

      </div>
    </main>
  );
};

export default FlashcardsPage;
