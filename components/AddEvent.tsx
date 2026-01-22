import React, { useState } from 'react';
import { 
  Calendar, 
  MapPin, 
  Upload, 
  X, 
  Save, 
  Clock, 
  Users,
  AlertCircle,
  CheckCircle,
  ChevronLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { eventService } from '../services/eventService';
import { Event } from '../types';

interface EventFormData {
  title: string;
  date: string;
  time: string;
  category: string;
  description: string;
  location: string;
  maxParticipants: string;
  imageUrl: string;
  isFeatured: boolean;
}

const AddEvent: React.FC = () => {
  const [eventData, setEventData] = useState<EventFormData>({
    title: '',
    date: '',
    time: '',
    category: 'Workshop',
    description: '',
    location: 'Remote',
    maxParticipants: '50',
    imageUrl: '',
    isFeatured: false
  });

  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const categories = ['Workshop', 'Project', 'Networking', 'Competition'];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setEventData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
        setEventData(prev => ({ ...prev, imageUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const newEventData: Omit<Event, 'id'> = {
      title: eventData.title,
      date: `${eventData.date} • ${eventData.time}`,
      category: eventData.category as Event['category'],
      description: eventData.description,
      imageUrl: eventData.imageUrl || 'https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?q=80&w=800'
    };

    try {
      await eventService.createEvent(newEventData);
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      setTimeout(() => {
        setEventData({
          title: '',
          date: '',
          time: '',
          category: 'Workshop',
          description: '',
          location: 'Remote',
          maxParticipants: '50',
          imageUrl: '',
          isFeatured: false
        });
        setUploadedImage(null);
        setSubmitSuccess(false);
      }, 2000);
    } catch (error) {
      console.error('Error creating event:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="sticky top-0 z-40 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-4">
              <Link to="/admin" className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors">
                <ChevronLeft className="w-6 h-6 text-slate-400" />
              </Link>
              <div>
                <h1 className="text-2xl font-black text-slate-900 dark:text-white">
                  Create New Event
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-bold tracking-widest">
                  ADD TO DATUM CALENDAR
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2.5 text-slate-600 dark:text-slate-400 font-bold border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                Preview
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {submitSuccess && (
          <div className="mb-6 p-6 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 rounded-3xl animate-in slide-in-from-top-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              <div>
                <p className="font-bold text-emerald-800 dark:text-emerald-300">
                  Event created successfully!
                </p>
                <p className="text-sm text-emerald-600 dark:text-emerald-400">
                  The event has been added to the calendar.
                </p>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800">
                <label className="block text-sm font-black text-slate-900 dark:text-white mb-3">
                  Event Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={eventData.title}
                  onChange={handleInputChange}
                  placeholder="e.g., Advanced ML Workshop with Industry Experts"
                  className="w-full px-4 py-3.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
                  required
                />
              </div>

              <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800">
                <label className="block text-sm font-black text-slate-900 dark:text-white mb-3">
                  Event Description
                </label>
                <textarea
                  name="description"
                  value={eventData.description}
                  onChange={handleInputChange}
                  placeholder="Describe the event in detail..."
                  rows={6}
                  className="w-full px-4 py-3.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium resize-none"
                  required
                />
              </div>

              <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800">
                <label className="block text-sm font-black text-slate-900 dark:text-white mb-3">
                  Date & Time
                </label>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="date"
                      name="date"
                      value={eventData.date}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
                      required
                    />
                  </div>
                  <div className="relative">
                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="time"
                      name="time"
                      value={eventData.time}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800">
                <label className="block text-sm font-black text-slate-900 dark:text-white mb-3">
                  Category
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setEventData(prev => ({ ...prev, category }))}
                      className={`px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                        eventData.category === category
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800">
                <label className="block text-sm font-black text-slate-900 dark:text-white mb-3">
                  Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <select
                    name="location"
                    value={eventData.location}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium appearance-none"
                  >
                    <option value="Remote">Remote / Virtual</option>
                    <option value="Campus Lab A">Campus Lab A</option>
                    <option value="Campus Lab B">Campus Lab B</option>
                    <option value="Auditorium">Main Auditorium</option>
                  </select>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800">
                <label className="block text-sm font-black text-slate-900 dark:text-white mb-3">
                  Max Participants
                </label>
                <div className="relative">
                  <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="number"
                    name="maxParticipants"
                    value={eventData.maxParticipants}
                    onChange={handleInputChange}
                    min="1"
                    max="500"
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
                  />
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-black text-slate-900 dark:text-white">Featured Event</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Highlight on homepage</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="isFeatured"
                      checked={eventData.isFeatured}
                      onChange={handleInputChange}
                      className="sr-only peer"
                    />
                    <div className="w-12 h-6 bg-slate-300 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800">
                <label className="block text-sm font-black text-slate-900 dark:text-white mb-3">
                  Event Image
                </label>
                {uploadedImage ? (
                  <div className="relative">
                    <img src={uploadedImage} alt="Preview" className="w-full h-48 object-cover rounded-2xl mb-4" />
                    <button
                      type="button"
                      onClick={() => {
                        setUploadedImage(null);
                        setEventData(prev => ({ ...prev, imageUrl: '' }));
                      }}
                      className="absolute top-2 right-2 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl cursor-pointer hover:border-indigo-500 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-12 h-12 text-slate-400 mb-3" />
                      <p className="text-sm font-bold text-slate-500 dark:text-slate-400">Upload Image</p>
                      <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">PNG, JPG up to 5MB</p>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>
          </div>

          <div className="sticky bottom-6 mt-12 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-2xl">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-amber-600 dark:text-amber-400">
                <AlertCircle className="w-5 h-5" />
                <p className="text-sm font-bold">All events are reviewed before publishing</p>
              </div>
              <div className="flex gap-4">
                <button
                  type="button"
                  className="px-8 py-3.5 text-slate-600 dark:text-slate-400 font-bold border border-slate-200 dark:border-slate-700 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  Save Draft
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-black rounded-2xl transition-all flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      PUBLISH EVENT
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEvent;