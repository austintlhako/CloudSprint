interface ProgressBarProps {
  value: number;       // 0–100
  label?: string;
  color?: string;      // Tailwind bg-color class, default azure
  size?: 'sm' | 'md' | 'lg';
  showPercent?: boolean;
}

export default function ProgressBar({
  value,
  label,
  color = 'bg-azure-500',
  size = 'md',
  showPercent = true,
}: ProgressBarProps) {
  const clampedValue = Math.min(100, Math.max(0, value));

  const heightMap = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  return (
    <div className="w-full">
      {(label || showPercent) && (
        <div className="mb-1.5 flex items-center justify-between">
          {label && (
            <span className="text-xs font-medium text-slate-400">{label}</span>
          )}
          {showPercent && (
            <span className="text-xs font-semibold text-slate-300">
              {Math.round(clampedValue)}%
            </span>
          )}
        </div>
      )}
      <div
        className={`w-full overflow-hidden rounded-full bg-white/5 ${heightMap[size]}`}
        role="progressbar"
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label ?? 'Progress'}
      >
        <div
          className={`progress-fill ${heightMap[size]} rounded-full ${color}`}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
    </div>
  );
}
