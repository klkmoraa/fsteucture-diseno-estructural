import type { ProductStatus } from '../domain/design';

const labels: Record<ProductStatus, string> = {
  available: 'Disponible',
  experimental: 'Experimental',
  review: 'Revisión',
  planned: 'Planeado',
};

export function StatusBadge({
  status,
  compact = false,
}: {
  status: ProductStatus;
  compact?: boolean;
}) {
  return (
    <span className={`status-badge status-badge--${status}${compact ? ' is-compact' : ''}`}>
      <span className="status-badge__dot" aria-hidden="true" />
      {labels[status]}
    </span>
  );
}

