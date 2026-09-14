import {
  Activity,
  BarChart3,
  BookOpen,
  Box,
  Check,
  ChevronDown,
  CircleAlert,
  FileText,
  Layers,
  Moon,
  PanelRight,
  Ruler,
  Save,
  SlidersHorizontal,
  Sun,
  TriangleAlert,
} from 'lucide-react';

export const Icon = {
  Activity,
  BarChart3,
  BookOpen,
  Box,
  Check,
  ChevronDown,
  CircleAlert,
  FileText,
  Layers,
  Moon,
  PanelRight,
  Ruler,
  Save,
  SlidersHorizontal,
  Sun,
  TriangleAlert,
};

export function ConcreteSectionGlyph({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" aria-hidden="true">
      <rect x="11" y="7" width="26" height="34" rx="2" fill="none" />
      <circle cx="17" cy="14" r="2" />
      <circle cx="31" cy="14" r="2" />
      <circle cx="17" cy="34" r="2" />
      <circle cx="31" cy="34" r="2" />
      <path d="M13 11h22M13 37h22" />
    </svg>
  );
}

export function BeamGlyph({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" aria-hidden="true">
      <path d="M8 20h32v8H8z" fill="none" />
      <path d="M12 28v9M36 28v9M8 38h8M32 38h8" />
      <path d="M14 34l-4 4M34 34l4 4" />
    </svg>
  );
}

export function EvidenceGlyph({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" aria-hidden="true">
      <rect x="12" y="7" width="24" height="34" rx="3" fill="none" />
      <path d="M18 15h12M18 22h12M18 29h8M18 35h9" />
      <circle cx="34" cy="35" r="4" fill="none" />
    </svg>
  );
}
