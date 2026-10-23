import React from 'react';
import type { Flashcard, FlashcardStatus } from '../../types';

export interface FlashCardProps {
  card: Flashcard;
  isFlipped: boolean;
  onFlip: () => void;
  topicName?: string;
  status?: FlashcardStatus;
}

// Built-in crisp SVG icons
function CheckIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function BookmarkIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
    </svg>
  );
}

function ExternalLinkIcon({ className = 'w-3.5 h-3.5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function RotateCcwIcon({ className = 'w-3.5 h-3.5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
    </svg>
  );
}

export const FlashCard: React.FC<FlashCardProps> = ({
  card,
  isFlipped,
  onFlip,
  topicName,
  status = 'unseen',
}) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      onFlip();
    }
  };

  // Helper to render back text cleanly (supporting bullet points and paragraphs)
  const renderBackContent = (text: string) => {
    const lines = text.split('\n').filter((l) => l.trim().length > 0);
    return lines.map((line, idx) => {
      const isBullet = line.trim().startsWith('•') || line.trim().startsWith('-');
      return (
        <p
          key={idx}
          style={{
            margin: '0 0 0.5rem 0',
            paddingLeft: isBullet ? '1rem' : 0,
            textIndent: isBullet ? '-0.75rem' : 0,
            lineHeight: '1.6',
            color: '#1e293b',
            fontSize: '1rem',
          }}
        >
          {line}
        </p>
      );
    });
  };

  return (
    <div
      style={{
        perspective: '1000px',
        width: '100%',
        maxWidth: '680px',
        height: '380px',
        margin: '0 auto',
      }}
    >
      <div
        role="button"
        tabIndex={0}
        aria-label={`Flashcard: ${card.front}. Press space or enter to flip.`}
        onClick={onFlip}
        onKeyDown={handleKeyDown}
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          cursor: 'pointer',
          outline: 'none',
        }}
      >
        {/* ═════════════════════════════════════════════════════════════════ */}
        {/* FRONT FACE */}
        {/* ═════════════════════════════════════════════════════════════════ */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            backgroundColor: '#ffffff',
            borderRadius: '1.25rem',
            border: '1.5px solid #cbd5e1',
            boxShadow: '0 10px 25px -5px rgba(2, 132, 199, 0.1), 0 8px 10px -6px rgba(2, 132, 199, 0.05)',
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxSizing: 'border-box',
          }}
        >
          {/* Top Bar: Topic Badge + Status Indicator */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span
              style={{
                fontSize: '0.8rem',
                fontWeight: 700,
                color: '#0284c7',
                backgroundColor: '#f0f9ff',
                border: '1px solid #bae6fd',
                padding: '0.25rem 0.65rem',
                borderRadius: '9999px',
                textTransform: 'uppercase',
                letterSpacing: '0.025em',
              }}
            >
              {topicName || card.topicId}
            </span>

            {/* Status Indicator */}
            {status === 'know' && (
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: '#059669',
                  backgroundColor: '#ecfdf5',
                  padding: '0.2rem 0.5rem',
                  borderRadius: '9999px',
                  border: '1px solid #a7f3d0',
                }}
              >
                <CheckIcon className="w-3.5 h-3.5" />
                <span>Known</span>
              </span>
            )}
            {status === 'review' && (
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: '#d97706',
                  backgroundColor: '#fffbeb',
                  padding: '0.2rem 0.5rem',
                  borderRadius: '9999px',
                  border: '1px solid #fde68a',
                }}
              >
                <BookmarkIcon className="w-3.5 h-3.5" />
                <span>Needs Review</span>
              </span>
            )}
          </div>

          {/* Center Question / Term */}
          <div style={{ textAlign: 'center', padding: '1rem 0' }}>
            <h2
              style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                color: '#0f172a',
                lineHeight: 1.4,
                margin: 0,
              }}
            >
              {card.front}
            </h2>
          </div>

          {/* Bottom Flip Hint */}
          <div
            style={{
              textAlign: 'center',
              fontSize: '0.825rem',
              color: '#64748b',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.4rem',
            }}
          >
            <span>💡 Click or press Space to reveal answer</span>
          </div>
        </div>

        {/* ═════════════════════════════════════════════════════════════════ */}
        {/* BACK FACE */}
        {/* ═════════════════════════════════════════════════════════════════ */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            backgroundColor: '#f8fafc',
            borderRadius: '1.25rem',
            border: '1.5px solid #38bdf8',
            boxShadow: '0 10px 25px -5px rgba(2, 132, 199, 0.15)',
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxSizing: 'border-box',
          }}
        >
          {/* Top Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span
              style={{
                fontSize: '0.8rem',
                fontWeight: 700,
                color: '#0369a1',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              Answer & Key Concept
            </span>

            {/* Microsoft Learn Docs Link (with stopPropagation) */}
            <a
              href={card.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem',
                fontSize: '0.8rem',
                fontWeight: 600,
                color: '#0284c7',
                textDecoration: 'none',
                padding: '0.2rem 0.5rem',
                borderRadius: '0.375rem',
                backgroundColor: '#ffffff',
                border: '1px solid #cbd5e1',
                transition: 'background-color 0.15s',
              }}
            >
              <span>Azure Docs</span>
              <ExternalLinkIcon className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Body Content */}
          <div
            style={{
              overflowY: 'auto',
              maxHeight: '220px',
              padding: '0.5rem 0',
            }}
          >
            {renderBackContent(card.back)}
          </div>

          {/* Bottom Flip Back Hint */}
          <div
            style={{
              textAlign: 'center',
              fontSize: '0.825rem',
              color: '#64748b',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.4rem',
            }}
          >
            <RotateCcwIcon className="w-3.5 h-3.5 text-sky-600" />
            <span>Click or press Space to flip back</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashCard;
