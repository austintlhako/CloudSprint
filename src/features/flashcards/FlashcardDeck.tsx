import React, { useState, useEffect, useCallback } from 'react';
import type { Flashcard, FlashcardStatus, SubtopicId } from '../../types';
import { FlashCard } from './FlashCard';
import { getFlashcardProgress, saveFlashcardProgress } from '../../services/flashcardService';
import { getTopicById } from '../../data/topics';

export interface FlashcardDeckProps {
  cards: Flashcard[];
  selectedTopicId?: SubtopicId | 'all';
  onNavigateToQuiz?: (topicId: string) => void;
}

// Built-in crisp SVG icons
function ThumbsUpIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 10v12" />
      <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
    </svg>
  );
}

function BookmarkIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
    </svg>
  );
}

function ShuffleIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m18 14 4 4-4 4" />
      <path d="m18 2 4 4-4 4" />
      <path d="M2 18h1.973a4 4 0 0 0 3.3-1.7l5.454-8.6a4 4 0 0 1 3.3-1.7H22" />
      <path d="M2 6h1.973a4 4 0 0 1 3.3 1.7l5.454 8.6a4 4 0 0 0 3.3 1.7H22" />
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

function RotateCcwIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
    </svg>
  );
}

function AwardIcon({ className = 'w-12 h-12' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  );
}

export const FlashcardDeck: React.FC<FlashcardDeckProps> = ({
  cards,
  selectedTopicId = 'all',
  onNavigateToQuiz,
}) => {
  const [deck, setDeck] = useState<Flashcard[]>(cards);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [progressMap, setProgressMap] = useState<Record<string, FlashcardStatus>>({});

  // Sync deck when external cards list changes
  useEffect(() => {
    setDeck(cards);
    setCurrentIndex(0);
    setIsFlipped(false);
    setIsCompleted(false);
  }, [cards]);

  // Load progress from service on mount
  useEffect(() => {
    let isMounted = true;
    getFlashcardProgress().then((map) => {
      if (isMounted) setProgressMap(map);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  // Safe navigation helpers
  const handleFlip = useCallback(() => {
    setIsFlipped((prev) => !prev);
  }, []);

  const handleNext = useCallback(() => {
    setIsFlipped(false);
    if (currentIndex < deck.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsCompleted(true);
    }
  }, [currentIndex, deck.length]);

  const handlePrev = useCallback(() => {
    setIsFlipped(false);
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setIsCompleted(false);
    }
  }, [currentIndex]);

  // Mark Status handler ("know" or "review") and auto-advance
  const handleMarkStatus = useCallback(
    (status: 'know' | 'review') => {
      if (deck.length === 0 || currentIndex >= deck.length) return;
      const card = deck[currentIndex];

      // Update state & persist
      setProgressMap((prev) => ({ ...prev, [card.id]: status }));
      saveFlashcardProgress(card.id, status);

      // Auto advance to next card
      handleNext();
    },
    [deck, currentIndex, handleNext]
  );

  // Shuffle deck
  const handleShuffle = () => {
    const shuffled = [...deck];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setDeck(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
    setIsCompleted(false);
  };

  // Keyboard Hotkeys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is inside an input or select
      if (['INPUT', 'SELECT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === ' ' && !isCompleted) {
        e.preventDefault();
        handleFlip();
      } else if (e.key === '1' || e.key === 'r' || e.key === 'R') {
        e.preventDefault();
        handleMarkStatus('review');
      } else if (e.key === '2' || e.key === 'k' || e.key === 'K') {
        e.preventDefault();
        handleMarkStatus('know');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, handleFlip, handleMarkStatus, isCompleted]);

  // Restart Deck
  const handleRestart = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setIsCompleted(false);
  };

  // Filter to review cards only
  const handleReviewUnmastered = () => {
    const reviewCards = deck.filter((c) => progressMap[c.id] === 'review');
    if (reviewCards.length > 0) {
      setDeck(reviewCards);
      setCurrentIndex(0);
      setIsFlipped(false);
      setIsCompleted(false);
    } else {
      handleRestart();
    }
  };

  // Stats calculation
  const totalInDeck = deck.length;
  const knownCount = deck.filter((c) => progressMap[c.id] === 'know').length;
  const reviewCount = deck.filter((c) => progressMap[c.id] === 'review').length;

  if (deck.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#64748b' }}>
        <p style={{ fontSize: '1.1rem' }}>No flashcards found for this topic filter.</p>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VIEW: DECK COMPLETION CELEBRATION
  // ═══════════════════════════════════════════════════════════════════════════
  if (isCompleted) {
    const knownPercent = Math.round((knownCount / totalInDeck) * 100);

    return (
      <div
        style={{
          maxWidth: '680px',
          margin: '0 auto',
          backgroundColor: '#ffffff',
          borderRadius: '1.25rem',
          border: '1.5px solid #cbd5e1',
          padding: '2.5rem 2rem',
          textAlign: 'center',
          boxShadow: '0 10px 25px -5px rgba(2, 132, 199, 0.1)',
        }}
      >
        <div style={{ display: 'inline-flex', color: '#0284c7', marginBottom: '1rem' }}>
          <AwardIcon className="w-16 h-16 text-sky-600" />
        </div>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.5rem 0' }}>
          🎉 Deck Complete!
        </h2>
        <p style={{ color: '#475569', fontSize: '1rem', margin: '0 0 2rem 0' }}>
          You have reviewed all {totalInDeck} cards in this study session.
        </p>

        {/* Stats Summary Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1rem',
            marginBottom: '2rem',
          }}
        >
          <div
            style={{
              padding: '1.25rem',
              borderRadius: '0.75rem',
              backgroundColor: '#ecfdf5',
              border: '1px solid #a7f3d0',
            }}
          >
            <div style={{ fontSize: '0.8rem', color: '#059669', fontWeight: 700, textTransform: 'uppercase' }}>
              Mastered / Known
            </div>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#065f46' }}>
              {knownCount} <span style={{ fontSize: '1rem', fontWeight: 600 }}>({knownPercent}%)</span>
            </div>
          </div>

          <div
            style={{
              padding: '1.25rem',
              borderRadius: '0.75rem',
              backgroundColor: '#fffbeb',
              border: '1px solid #fde68a',
            }}
          >
            <div style={{ fontSize: '0.8rem', color: '#d97706', fontWeight: 700, textTransform: 'uppercase' }}>
              Needs Review
            </div>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#92400e' }}>
              {reviewCount}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {reviewCount > 0 && (
            <button
              type="button"
              onClick={handleReviewUnmastered}
              style={{
                width: '100%',
                padding: '0.85rem',
                borderRadius: '0.5rem',
                backgroundColor: '#d97706',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '1rem',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Review {reviewCount} Cards Marked "Needs Review"
            </button>
          )}

          <button
            type="button"
            onClick={handleRestart}
            style={{
              width: '100%',
              padding: '0.85rem',
              borderRadius: '0.5rem',
              backgroundColor: '#0284c7',
              color: '#ffffff',
              fontWeight: 700,
              fontSize: '1rem',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Restart Entire Deck
          </button>

          {onNavigateToQuiz && (
            <button
              type="button"
              onClick={() => onNavigateToQuiz(selectedTopicId)}
              style={{
                width: '100%',
                padding: '0.85rem',
                borderRadius: '0.5rem',
                backgroundColor: '#ffffff',
                color: '#0f172a',
                border: '1px solid #cbd5e1',
                fontWeight: 600,
                fontSize: '0.95rem',
                cursor: 'pointer',
              }}
            >
              Take a Practice Quiz on this Topic ➔
            </button>
          )}
        </div>
      </div>
    );
  }

  // Current Card
  const currentCard = deck[currentIndex];
  const topicMeta = getTopicById(currentCard.topicId);
  const currentStatus = progressMap[currentCard.id] || 'unseen';

  return (
    <div style={{ maxWidth: '680px', margin: '0 auto' }}>
      {/* Deck Toolbar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1rem',
          fontSize: '0.875rem',
          color: '#64748b',
        }}
      >
        <span style={{ fontWeight: 700, color: '#0f172a' }}>
          Card {currentIndex + 1} of {totalInDeck}
        </span>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            type="button"
            onClick={handleShuffle}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              backgroundColor: '#f1f5f9',
              border: '1px solid #cbd5e1',
              borderRadius: '0.375rem',
              padding: '0.35rem 0.65rem',
              color: '#334155',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            <ShuffleIcon className="w-3.5 h-3.5" />
            <span>Shuffle</span>
          </button>
        </div>
      </div>

      {/* 3D Flip Card */}
      <FlashCard
        card={currentCard}
        isFlipped={isFlipped}
        onFlip={handleFlip}
        topicName={topicMeta?.name}
        status={currentStatus}
      />

      {/* Assessment Controls */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1rem',
          marginTop: '1.5rem',
        }}
      >
        <button
          type="button"
          onClick={() => handleMarkStatus('review')}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            padding: '0.85rem 1rem',
            borderRadius: '0.65rem',
            backgroundColor: '#fffbeb',
            border: '1.5px solid #fde68a',
            color: '#b45309',
            fontWeight: 700,
            fontSize: '1rem',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
          }}
        >
          <BookmarkIcon className="w-4 h-4" />
          <span>Need Review (1 / R)</span>
        </button>

        <button
          type="button"
          onClick={() => handleMarkStatus('know')}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            padding: '0.85rem 1rem',
            borderRadius: '0.65rem',
            backgroundColor: '#ecfdf5',
            border: '1.5px solid #a7f3d0',
            color: '#047857',
            fontWeight: 700,
            fontSize: '1rem',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
          }}
        >
          <ThumbsUpIcon className="w-4 h-4" />
          <span>I Know This (2 / K)</span>
        </button>
      </div>

      {/* Bottom Navigation Toolbar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '1.25rem',
          paddingTop: '1rem',
          borderTop: '1px solid #e2e8f0',
        }}
      >
        <button
          type="button"
          onClick={handlePrev}
          disabled={currentIndex === 0}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            padding: '0.5rem 0.85rem',
            borderRadius: '0.375rem',
            border: '1px solid #cbd5e1',
            backgroundColor: currentIndex === 0 ? '#f8fafc' : '#ffffff',
            color: currentIndex === 0 ? '#94a3b8' : '#334155',
            fontWeight: 600,
            cursor: currentIndex === 0 ? 'not-allowed' : 'pointer',
          }}
        >
          <ChevronLeftIcon className="w-4 h-4" />
          <span>Previous (←)</span>
        </button>

        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <button
            type="button"
            onClick={handleRestart}
            title="Restart from beginning"
            style={{
              padding: '0.5rem 0.75rem',
              borderRadius: '0.375rem',
              border: '1px solid #cbd5e1',
              backgroundColor: '#ffffff',
              color: '#64748b',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.25rem',
              fontSize: '0.8rem',
            }}
          >
            <RotateCcwIcon className="w-3.5 h-3.5" />
            <span>Restart</span>
          </button>

          <button
            type="button"
            onClick={handleNext}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              padding: '0.5rem 1rem',
              borderRadius: '0.375rem',
              border: 'none',
              backgroundColor: '#0284c7',
              color: '#ffffff',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            <span>Next (→)</span>
            <ChevronRightIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlashcardDeck;
