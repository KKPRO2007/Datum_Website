export interface GalleryImage {
  id: string;
  url: string;
  title: string;
  category: string;
  description?: string;
  uploadDate: string;
  tags: string[];
  uploadedBy: string;
}

const MOCK_GALLERY: GalleryImage[] = [
  {
    id: '1',
    url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800',
    title: 'Datathon 2024',
    category: 'Events',
    description: 'Annual datathon competition with 50+ participants',
    uploadDate: '2024-03-15',
    tags: ['competition', 'datathon', 'students'],
    uploadedBy: 'Admin'
  },
  {
    id: '2',
    url: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=800',
    title: 'ML Workshop',
    category: 'Workshops',
    description: 'Machine learning workshop for beginners',
    uploadDate: '2024-02-28',
    tags: ['workshop', 'ml', 'learning'],
    uploadedBy: 'Admin'
  },
  {
    id: '3',
    url: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?q=80&w=800',
    title: 'Core Team Meet',
    category: 'Team',
    description: 'Monthly core team planning session',
    uploadDate: '2024-01-20',
    tags: ['team', 'meeting', 'planning'],
    uploadedBy: 'Admin'
  }
];

export const galleryService = {
  getAllImages: async (): Promise<GalleryImage[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...MOCK_GALLERY]);
      }, 300);
    });
  },

  getImagesByCategory: async (category: string): Promise<GalleryImage[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filtered = MOCK_GALLERY.filter(img => img.category === category);
        resolve(filtered);
      }, 200);
    });
  },

  searchImages: async (query: string): Promise<GalleryImage[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filtered = MOCK_GALLERY.filter(img => 
          img.title.toLowerCase().includes(query.toLowerCase()) ||
          img.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
        );
        resolve(filtered);
      }, 200);
    });
  },

  uploadImage: async (imageData: Omit<GalleryImage, 'id'>): Promise<GalleryImage> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newImage: GalleryImage = {
          ...imageData,
          id: Date.now().toString()
        };
        MOCK_GALLERY.push(newImage);
        resolve(newImage);
      }, 500);
    });
  },

  deleteImage: async (id: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = MOCK_GALLERY.findIndex(img => img.id === id);
        if (index !== -1) {
          MOCK_GALLERY.splice(index, 1);
          resolve(true);
        }
        resolve(false);
      }, 300);
    });
  },

  getImageById: async (id: string): Promise<GalleryImage | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const image = MOCK_GALLERY.find(img => img.id === id);
        resolve(image || null);
      }, 200);
    });
  },

  getCategories: async (): Promise<string[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const categories = [...new Set(MOCK_GALLERY.map(img => img.category))];
        resolve(categories);
      }, 100);
    });
  }
};