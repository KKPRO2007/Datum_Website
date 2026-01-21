
export interface Achievement {
  id: string;
  year: string;
  title: string;
  description: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  category: 'Workshop' | 'Project' | 'Networking' | 'Competition';
  description: string;
  imageUrl: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
