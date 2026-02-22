import type { LucideIcon } from 'lucide-react';
import {
  Play,
  Download,
  Users,
  Gift,
  Shield,
  Clock,
  CalendarDays,
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  Play,
  Download,
  Users,
  Gift,
  Shield,
  Clock,
  CalendarDays,
};

export function resolveIcon(
  name: string,
  fallback: LucideIcon = Download,
): LucideIcon {
  return iconMap[name] || fallback;
}
