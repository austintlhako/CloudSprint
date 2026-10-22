import { Link } from 'react-router-dom';

interface FeatureCardProps {
  to: string;
  icon: string;
  title: string;
  description: string;
  color: string;       // Tailwind gradient "from" color class
  stat?: string;       // e.g. "12 quizzes taken"
  statLabel?: string;
}

export default function FeatureCard({
  to,
  icon,
  title,
  description,
  color,
  stat,
  statLabel,
}: FeatureCardProps) {
  return (
    <Link
      to={to}
      className="focus-ring hover-lift group glass-card flex flex-col gap-4 p-6 no-underline transition-all"
      id={`feature-card-${title.toLowerCase().replace(/\s+/g, '-')}`}
    >
      {/* Icon badge */}
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br ${color} text-2xl shadow-lg`}
      >
        {icon}
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-white">{title}</h3>

      {/* Description */}
      <p className="text-sm leading-relaxed text-slate-400">{description}</p>

      {/* Optional stat */}
      {stat && (
        <div className="mt-auto border-t border-white/5 pt-3">
          <span className="text-xl font-bold text-white">{stat}</span>
          {statLabel && (
            <span className="ml-2 text-xs text-slate-500">{statLabel}</span>
          )}
        </div>
      )}

      {/* Hover arrow */}
      <div className="flex items-center gap-1 text-sm font-medium text-azure-400 opacity-0 transition-opacity group-hover:opacity-100">
        Get started
        <span aria-hidden="true">→</span>
      </div>
    </Link>
  );
}
