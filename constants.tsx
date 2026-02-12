import { Achievement, Event } from './types';
import {
  Code2,
  Users,
  TrendingUp,
  BookOpen
} from 'lucide-react';

/* ================= TEAM INTERFACE ================= */

export interface TeamMember {
  id: number; // ✅ Must be number to match Team.tsx
  name: string;
  role: string;
  photoUrl: string;
  linkedin: string;
  github: string;
  bio: string;
  skills: string[];
}

/* ================= TEAM MEMBERS ================= */

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 1,
    name: 'Om Lakshkar',
    role: 'Technical Head',
    photoUrl:
      'https://images.unsplash.com/photo-1615109398623-88346a601842?q=80&w=400&auto=format&fit=crop',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    bio: 'Dedicated to building scalable systems and fostering technical excellence.',
    skills: ['React', 'System Design', 'Cloud', 'Leadership']
  },
  {
    id: 2,
    name: 'Raj Mayank',
    role: 'Full Stack Developer',
    photoUrl:
      'https://images.unsplash.com/photo-1601233749202-95d04d5b3c00?q=80&w=1438&auto=format&fit=crop',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    bio: 'Expert in machine learning pipelines and mentoring students.',
    skills: ['Machine Learning', 'Python', 'TensorFlow', 'Data Science']
  },
  {
    id: 3,
    name: 'Sparsh Shukla',
    role: 'AI Specialist',
    photoUrl:
      'https://plus.unsplash.com/premium_photo-1672239496290-5061cfee7ebb?q=80&w=687&auto=format&fit=crop',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    bio: 'Exploring deep learning and AI research.',
    skills: ['Deep Learning', 'PyTorch', 'NLP', 'Research']
  },
  {
    id: 4,
    name: 'Dev Thakur',
    role: 'Frontend Developer',
    photoUrl:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    bio: 'Connecting students with industry leaders.',
    skills: ['Communication', 'Event Management', 'Public Speaking', 'Networking']
  }
];

/* ================= ACHIEVEMENTS ================= */

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: '1',
    year: '2023',
    title: '500+ Active Members',
    description: 'Reached half a thousand community members.'
  },
  {
    id: '2',
    year: '2024',
    title: 'Industry Collaboration',
    description: 'Partnered with tech firms for mentorship.'
  }
];

/* ================= FEATURES (ABOUT PAGE) ================= */

export const FEATURES = [
  {
    icon: <Code2 className="w-6 h-6 text-indigo-400" />,
    title: 'Hands-on Projects',
    description: 'Work on real-world datasets and industry-level problems.'
  },
  {
    icon: <BookOpen className="w-6 h-6 text-blue-400" />,
    title: 'Expert Workshops',
    description: 'Learn directly from professionals and mentors.'
  },
  {
    icon: <Users className="w-6 h-6 text-emerald-400" />,
    title: 'Strong Community',
    description: 'Grow together with like-minded learners.'
  },
  {
    icon: <TrendingUp className="w-6 h-6 text-rose-400" />,
    title: 'Career Growth',
    description: 'Build skills that make your profile stand out.'
  }
];

/* ================= PAST EVENTS ================= */

export const PAST_EVENTS: Event[] = [
  {
    id: 'p1',
    title: 'Deep Learning Sprint 2024',
    date: 'Feb 05, 2025',
    category: 'Project',
    description: '48-hour ML challenge for medical image classification.',
    imageUrl:
      'https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 'p2',
    title: 'Resume Building Workshop',
    date: 'Jan 10, 2025',
    category: 'Workshop',
    description: 'Hands-on resume and portfolio building session.',
    imageUrl:
      'https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=400&auto=format&fit=crop'
  }
];

/* ================= UPCOMING EVENTS ================= */

export const UPCOMING_EVENTS: Event[] = [
  {
    id: 'u1',
    title: 'Advanced LLM Fine-tuning Sprint',
    date: 'March 22, 2025 • 10:00 AM',
    category: 'Workshop',
    description: 'Learn LoRA and QLoRA techniques for efficient LLM fine-tuning.',
    imageUrl:
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'u2',
    title: 'Spring Networking Mixer',
    date: 'April 10, 2025 • 6:00 PM',
    category: 'Networking',
    description: 'Meet data scientists and industry professionals.',
    imageUrl:
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800&auto=format&fit=crop'
  }
];
