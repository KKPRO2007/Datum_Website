
import React from 'react';
import { Achievement, Event } from './types';
import { 
  Code2, 
  Users, 
  Lightbulb, 
  TrendingUp, 
  BookOpen, 
  Trophy 
} from 'lucide-react';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  photoUrl: string;
  linkedin: string;
  github: string;
  bio: string;
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: '1',
    name: 'Om Lakshkar',
    role: 'Technical Head',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    bio: 'Dedicated to building scalable systems and fostering a culture of technical excellence within the student community.'
  },
  {
    id: '2',
    name: 'Raj Mayank',
    role: 'Technical Director',
    photoUrl: 'https://images.unsplash.com/photo-1615109398623-88346a601842?q=80&w=400&auto=format&fit=crop', // Updated with a portrait matching the provided vibe
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    bio: 'Expert in machine learning pipelines and helping students navigate the complexities of modern data science.'
  },
  {
    id: '3',
    name: 'Sparsh Shukla',
    role: 'Head of Research',
    photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    bio: 'Passionate about deep learning and exploring the frontiers of artificial intelligence through peer-led research.'
  },
  {
    id: '4',
    name: 'Dev Kumar Jadaun',
    role: 'Community Lead',
    photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    bio: 'Bridging the gap between students and industry leaders through high-impact networking and collaborative events.'
  }
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: '1',
    year: '2023',
    title: '500+ Active Members',
    description: 'Reached a milestone of half a thousand passionate data enthusiasts across campuses.'
  },
  {
    id: '2',
    year: '2023',
    title: 'Industry Partnership',
    description: 'Collaborated with Top Tech firms for direct mentorship programs.'
  },
  {
    id: '3',
    year: '2024',
    title: 'Annual Datathon Success',
    description: 'Hosted the largest student-run datathon with over 50 projects submitted.'
  }
];

export const UPCOMING_EVENTS: Event[] = [
  {
    id: 'u1',
    title: 'Advanced LLM Fine-tuning Sprint',
    date: 'March 22, 2025 • 10:00 AM',
    category: 'Workshop',
    description: 'Master the art of LoRA and QLoRA for efficient large language model adaptation. This session covers everything from environment setup to deploying your first fine-tuned model.',
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'u2',
    title: 'Spring Networking Mixer',
    date: 'April 10, 2025 • 6:00 PM',
    category: 'Networking',
    description: 'Connect with senior data scientists from FAANG and high-growth startups. A perfect opportunity to ask questions about career paths and get portfolio advice.',
    imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800&auto=format&fit=crop'
  }
];

export const PAST_EVENTS: Event[] = [
  {
    id: 'p1',
    title: 'Deep Learning Sprint 2024',
    date: 'Feb 05, 2025',
    category: 'Project',
    description: 'A 48-hour challenge to build an image classification model for medical imaging.',
    imageUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 'p2',
    title: 'Resume Building Workshop',
    date: 'Jan 10, 2025',
    category: 'Networking',
    description: 'Collaborative session on building data portfolios that stand out in 2025.',
    imageUrl: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 'p3',
    title: 'ML Fundamentals 101',
    date: 'Dec 15, 2024',
    category: 'Workshop',
    description: 'Our core workshop covering linear models and the basics of statistical learning.',
    imageUrl: 'https://images.unsplash.com/photo-1527474305487-b87b222841cc?q=80&w=400&auto=format&fit=crop'
  }
];

export const FEATURES = [
  {
    icon: <Code2 className="w-6 h-6 text-indigo-400" />,
    title: 'Hands-on Projects',
    description: 'Work on real-world applications with industry-standard tools and datasets.'
  },
  {
    icon: <BookOpen className="w-6 h-6 text-blue-400" />,
    title: 'Expert Workshops',
    description: 'Exclusive learning opportunities to expand your knowledge with field experts.'
  },
  {
    icon: <Users className="w-6 h-6 text-emerald-400" />,
    title: 'Professional Network',
    description: 'Connect with industry professionals and like-minded peers globally.'
  },
  {
    icon: <TrendingUp className="w-6 h-6 text-rose-400" />,
    title: 'Career Growth',
    description: 'Build skills that make your resume stand out in a competitive market.'
  }
];
