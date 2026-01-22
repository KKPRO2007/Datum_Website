import React, { useState, useEffect } from 'react';
import { Search, Filter, X, Maximize2, Download, Trash2, Plus, Lock } from 'lucide-react';
import { galleryService, GalleryImage } from '../services/galleryService';
import { Link } from 'react-router-dom';

const Gallery: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categories, setCategories] = useState<string[]>(['All']);

  useEffect(() => {
    loadImages();
    loadCategories();
    checkAdminStatus();
  }, []);

  // Check if user is admin by checking localStorage
  const checkAdminStatus = () => {
    const adminToken = localStorage.getItem('admin_token');
    const adminMode = localStorage.getItem('admin_mode') === 'true';
    setIsAdmin(!!adminToken || adminMode);
  };

  const loadImages = async () => {
    const imagesData = await galleryService.getAllImages();
    setImages(imagesData);
  };

  const loadCategories = async () => {
    const categoriesData = await galleryService.getCategories();
    setCategories(['All', ...categoriesData]);
  };

  const filteredImages = images.filter(img => {
    const matchesSearch = img.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         img.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || img.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDeleteImage = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      await galleryService.deleteImage(id);
      loadImages();
    }
  };

  const handleUploadImage = () => {
    if (!isAdmin) {
      alert('Please login as admin to upload images');
      return;
    }
    // Implement image upload logic here
    console.log('Upload image clicked');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-500">
      <section className="relative py-20 overflow-hidden border-b border-slate-100 dark:border-slate-800">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-indigo-500/5 dark:bg-indigo-600/10 blur-3xl rounded-full translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-[10px] font-black tracking-widest uppercase mb-4 ring-1 ring-indigo-100 dark:ring-indigo-500/20">
                <Filter className="w-3 h-3" />
                <span>Visual Chronicle</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter mb-4">
                Datum <span className="text-indigo-600 dark:text-indigo-500">Gallery</span>
              </h1>
              <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl font-medium">
                Explore moments from our workshops, events, and community activities.
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Show admin status badge instead of toggle */}
              {isAdmin ? (
                <div className="flex items-center gap-3">
                  <div className="px-3 py-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-black rounded-full flex items-center gap-2">
                    <Lock className="w-3 h-3" />
                    ADMIN MODE
                  </div>
                  <button 
                    onClick={handleUploadImage}
                    className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-black rounded-xl transition-all shadow-lg shadow-indigo-500/20 active:scale-95"
                  >
                    <Plus className="w-4 h-4" />
                    Upload Image
                  </button>
                </div>
              ) : (
                <Link 
                  to="/admin"
                  className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-sm font-black rounded-xl transition-all border border-slate-200 dark:border-slate-700"
                >
                  <Lock className="w-4 h-4" />
                  Admin Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 bg-slate-50/50 dark:bg-slate-900/20 sticky top-0 z-20 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-2xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search images by title or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium shadow-sm"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-5 py-2.5 rounded-xl text-xs font-black tracking-wide transition-all duration-300 active:scale-95 ${
                    selectedCategory === category
                      ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/30 ring-2 ring-indigo-600/20'
                      : 'bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:border-indigo-500/50'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredImages.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredImages.map((image) => (
                <div
                  key={image.id}
                  className="group relative bg-white dark:bg-slate-900/50 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:border-indigo-500/50 transition-all duration-500"
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={image.url}
                      alt={image.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      onClick={() => setSelectedImage(image)}
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <span className="px-3 py-1 bg-indigo-600 text-white text-[10px] font-black rounded-full uppercase tracking-widest">
                            {image.category}
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setSelectedImage(image)}
                            className="p-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full transition-colors"
                          >
                            <Maximize2 className="w-4 h-4" />
                          </button>
                          {isAdmin && (
                            <button 
                              onClick={() => handleDeleteImage(image.id)}
                              className="p-2 bg-red-500/80 hover:bg-red-500 backdrop-blur-sm rounded-full transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                      <h3 className="text-lg font-black mb-1">{image.title}</h3>
                      <p className="text-sm text-slate-300 opacity-90">{image.uploadDate}</p>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-bold text-slate-900 dark:text-white text-sm truncate">{image.title}</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{image.uploadDate}</p>
                      </div>
                      <span className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-black rounded-full">
                        {image.category}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="mb-4 inline-block p-4 bg-slate-100 dark:bg-slate-800 rounded-full">
                <Search className="w-8 h-8 text-slate-400" />
              </div>
              <p className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest text-xs mb-2">
                No images found
              </p>
            </div>
          )}
          
          {/* Admin Notice */}
          {!isAdmin && (
            <div className="mt-12 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-500/10 dark:to-purple-500/10 border border-indigo-200 dark:border-indigo-500/20 rounded-3xl text-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white dark:bg-slate-800 rounded-full mb-4">
                <Lock className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span className="text-xs font-black text-indigo-600 dark:text-indigo-400">Admin Access</span>
              </div>
              <p className="text-slate-700 dark:text-slate-300 font-medium mb-3">
                Want to upload or manage images? Login as admin for full access.
              </p>
              <Link 
                to="/admin"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-black rounded-xl transition-all"
              >
                <Lock className="w-4 h-4" />
                Go to Admin Portal
              </Link>
            </div>
          )}
          
          <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800">
            <div className="flex flex-wrap justify-center gap-12 text-center">
              <div>
                <div className="text-3xl font-black text-indigo-600 dark:text-indigo-500">{images.length}+</div>
                <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Images</div>
              </div>
              <div>
                <div className="text-3xl font-black text-indigo-600 dark:text-indigo-500">{categories.length - 1}</div>
                <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Categories</div>
              </div>
              <div>
                <div className="text-3xl font-black text-indigo-600 dark:text-indigo-500">2023-Now</div>
                <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Timeline</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="relative w-full max-w-6xl animate-in zoom-in-95 duration-300">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-all"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-2xl">
              <div className="grid md:grid-cols-2">
                <div className="aspect-square md:aspect-auto">
                  <img
                    src={selectedImage.url}
                    alt={selectedImage.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8 md:p-12 flex flex-col">
                  <div className="mb-6">
                    <span className="px-3 py-1.5 bg-indigo-600 text-white text-[10px] font-black rounded-full uppercase tracking-widest inline-block mb-4">
                      {selectedImage.category}
                    </span>
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-3">
                      {selectedImage.title}
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">
                      Uploaded on {selectedImage.uploadDate}
                    </p>
                  </div>
                  <div className="space-y-6 flex-grow">
                    <div>
                      <h4 className="text-xs font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-2">
                        Description
                      </h4>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                        {selectedImage.description || `This image captures a memorable moment from our ${selectedImage.category.toLowerCase()} activities.`}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-2">
                        Tags
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedImage.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-bold rounded-full"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4 pt-8 mt-8 border-t border-slate-200 dark:border-slate-800">
                    <button className="flex-1 px-6 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-2xl transition-all flex items-center justify-center gap-2">
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                    {isAdmin && (
                      <button 
                        onClick={() => handleDeleteImage(selectedImage.id)}
                        className="px-6 py-3.5 bg-red-600 hover:bg-red-500 text-white font-black rounded-2xl transition-all"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;