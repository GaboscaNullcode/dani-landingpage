import type { LucideIcon } from 'lucide-react';
import {
  Play,
  Download,
  Users,
  Gift,
  Shield,
  Clock,
  CalendarDays,
  BookOpen,
  Ticket,
  Crown,
  Star,
  Zap,
  Heart,
  Headphones,
  Globe,
  Award,
  Sparkles,
  Rocket,
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  Play,
  Download,
  Users,
  Gift,
  Shield,
  Clock,
  CalendarDays,
  BookOpen,
  Ticket,
  Crown,
  Star,
  Zap,
  Heart,
  Headphones,
  Globe,
  Award,
  Sparkles,
  Rocket,
};

export function resolveIcon(
  name: string,
  fallback: LucideIcon = Download,
): LucideIcon {
  return iconMap[name] || fallback;
}
