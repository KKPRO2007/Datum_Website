import { Event } from '../types';

const MOCK_EVENTS: Event[] = [
  {
    id: '1',
    title: 'Advanced ML Workshop',
    date: 'March 25, 2025 • 2:00 PM',
    category: 'Workshop',
    description: 'Deep dive into machine learning algorithms and practical applications.',
    imageUrl: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=800'
  },
  {
    id: '2',
    title: 'Data Visualization Challenge',
    date: 'April 5, 2025 • 10:00 AM',
    category: 'Competition',
    description: 'Create compelling data visualizations using real-world datasets.',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800'
  }
];

export const eventService = {
  getAllEvents: async (): Promise<Event[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...MOCK_EVENTS]);
      }, 300);
    });
  },

  getEventById: async (id: string): Promise<Event | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const event = MOCK_EVENTS.find(e => e.id === id);
        resolve(event || null);
      }, 200);
    });
  },

  createEvent: async (eventData: Omit<Event, 'id'>): Promise<Event> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newEvent: Event = {
          ...eventData,
          id: Date.now().toString()
        };
        MOCK_EVENTS.push(newEvent);
        resolve(newEvent);
      }, 500);
    });
  },

  updateEvent: async (id: string, eventData: Partial<Event>): Promise<Event | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = MOCK_EVENTS.findIndex(e => e.id === id);
        if (index !== -1) {
          MOCK_EVENTS[index] = { ...MOCK_EVENTS[index], ...eventData };
          resolve(MOCK_EVENTS[index]);
        }
        resolve(null);
      }, 400);
    });
  },

  deleteEvent: async (id: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = MOCK_EVENTS.findIndex(e => e.id === id);
        if (index !== -1) {
          MOCK_EVENTS.splice(index, 1);
          resolve(true);
        }
        resolve(false);
      }, 300);
    });
  },

  getEventsByCategory: async (category: Event['category']): Promise<Event[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filtered = MOCK_EVENTS.filter(e => e.category === category);
        resolve(filtered);
      }, 200);
    });
  }
};