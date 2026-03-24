import { useState, useEffect, useRef, ChangeEvent } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import {
  Plus, Pencil, Trash2, Save, X, LogOut, Package,
  Image, Video, FileText, Info, Mail, Layout, Eye, EyeOff,
  Upload, ChevronRight, ChevronDown, Menu, Bell, Search, Settings,
  Globe, Users, Building, Phone, MapPin, Check, AlertCircle,
  ArrowLeft, ArrowRight, Move, MoreVertical, Download, Star
} from 'lucide-react';
import { supabase, uploadFile, deleteFile, STORAGE_BUCKETS } from '../lib/supabase';

// Types


interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  features: string[];
  image_url: string;
  video_url: string;
  gallery: string[];
  icon: string;
  featured: boolean;
  specifications: Record<string, string>;
}

interface News {
  id: number;
  title: string;
  category: string;
  content: string;
  image_url: string;
  published_at: string;
  author: string;
  active: boolean;
}

interface PageContent {
  id: number;
  page_key: string;
  title: string;
  content: string;
  meta_description: string;
}

interface ContactInfo {
  id: number;
  key: string;
  value: string;
  label: string;
  icon: string;
}

const iconOptions = [
  { value: 'Camera', label: 'Camera' },
  { value: 'Lightbulb', label: 'Lightbulb' },
  { value: 'Wind', label: 'Wind (CO2)' },
  { value: 'Droplets', label: 'Droplets' },
  { value: 'Monitor', label: 'Monitor' },
  { value: 'ShoppingCart', label: 'ShoppingCart' },
  { value: 'Package', label: 'Package' },
  { value: 'Settings', label: 'Settings' },
  { value: 'Users', label: 'Users' },
  { value: 'Building', label: 'Building' },
];

// Check if logged in
function useAuth() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsAuthenticated(true);
    } else {
      navigate('/admin');
    }
    setLoading(false);
  }, [navigate]);

  return { isAuthenticated, loading };
}

// Admin Layout Component
function AdminLayout({ children, activeModule, onModuleChange }: {
  children: React.ReactNode;
  activeModule: string;
  onModuleChange: (module: string) => void;
}) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin');
  };

  const modules = [
    { id: 'dashboard', label: '仪表盘', icon: Layout },
    { id: 'featured', label: '首页精选', icon: Star },
    { id: 'products', label: '产品管理', icon: Package },
    { id: 'news', label: '新闻动态', icon: FileText },
    { id: 'about', label: '关于我们', icon: Info },
    { id: 'contact', label: '联系我们', icon: Mail },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-slate-900 to-slate-800 text-white shadow-lg fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-teal-600 rounded-xl flex items-center justify-center">
                <Package className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold">内容管理系统</h1>
                <p className="text-slate-400 text-xs">上海视音内镜</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                target="_blank"
                className="flex items-center space-x-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
              >
                <Eye className="w-4 h-4" />
                <span>预览网站</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>退出</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex pt-16">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-lg fixed left-0 top-16 bottom-0 overflow-y-auto">
          <nav className="p-4">
            {modules.map((module) => {
              const Icon = module.icon;
              const isActive = activeModule === module.id;
              return (
                <button
                  key={module.id}
                  onClick={() => onModuleChange(module.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl mb-2 transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{module.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Content */}
        <main className="ml-64 flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}


// Product Manager Component
function ProductManager() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [specInput, setSpecInput] = useState('');
  const [featureInput, setFeatureInput] = useState('');

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    const { data } = await supabase
      .from('products')
      .select('*')
      .order('id');

    if (data) {
      setProducts(data);
      const cats = [...new Set(data.map(p => p.category))];
      setCategories(cats);
    }
    setLoading(false);
  }

  async function handleSave() {
    if (!editForm) return;
    setUploading(true);

    const productData = {
      name: editForm.name,
      category: editForm.category,
      description: editForm.description,
      features: editForm.features || [],
      image_url: editForm.image_url || '',
      video_url: editForm.video_url || '',
      gallery: editForm.gallery || [],
      icon: editForm.icon || 'Camera',
      featured: editForm.featured ?? false,
      specifications: editForm.specifications || {},
    };

    if (editingId) {
      await supabase.from('products').update(productData).eq('id', editingId);
    } else {
      await supabase.from('products').insert(productData);
    }

    await loadProducts();
    setEditingId(null);
    setEditForm(null);
    setUploading(false);
  }

  async function handleDelete(id: number) {
    if (confirm('确定要删除这个产品吗？')) {
      await supabase.from('products').delete().eq('id', id);
      await loadProducts();
    }
  }

  async function handleImageUpload(e: any, field: string) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const url = await uploadFile(STORAGE_BUCKETS.IMAGES, file, 'products');
    if (url) {
      setEditForm({ ...editForm, [field]: url });
    }
    setUploading(false);
  };

  async function handleVideoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 100 * 1024 * 1024) {
      alert('视频文件不能超过100MB');
      return;
    }

    setUploading(true);
    const url = await uploadFile(STORAGE_BUCKETS.VIDEOS, file, 'products');
    if (url) {
      setEditForm({ ...editForm, video_url: url });
    }
    setUploading(false);
  }

  async function handleGalleryUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files) return;

    setUploading(true);
    const newGallery = [...(editForm.gallery || [])];

    for (let i = 0; i < files.length; i++) {
      const url = await uploadFile(STORAGE_BUCKETS.IMAGES, files[i], 'products/gallery');
      if (url) {
        newGallery.push(url);
      }
    }

    setEditForm({ ...editForm, gallery: newGallery });
    setUploading(false);
  }

  function addFeature() {
    if (featureInput.trim()) {
      setEditForm({
        ...editForm,
        features: [...(editForm.features || []), featureInput.trim()]
      });
      setFeatureInput('');
    }
  }

  function removeFeature(index: number) {
    const newFeatures = [...(editForm.features || [])];
    newFeatures.splice(index, 1);
    setEditForm({ ...editForm, features: newFeatures });
  }

  function addSpec() {
    if (specInput.includes(':')) {
      const [key, value] = specInput.split(':').map(s => s.trim());
      setEditForm({
        ...editForm,
        specifications: { ...(editForm.specifications || {}), [key]: value }
      });
      setSpecInput('');
    } else {
      alert('请按 "键:值" 格式输入');
    }
  }

  function removeSpec(key: string) {
    const newSpecs = { ...editForm.specifications };
    delete newSpecs[key];
    setEditForm({ ...editForm, specifications: newSpecs });
  }

  function removeGalleryImage(index: number) {
    const newGallery = [...(editForm.gallery || [])];
    newGallery.splice(index, 1);
    setEditForm({ ...editForm, gallery: newGallery });
  }

  const handleEdit = (product?: any) => {
    if (product) {
      setEditingId(product.id);
      setEditForm({ ...product });
    } else {
      setEditingId(0);
      setEditForm({
        name: '',
        category: '',
        description: '',
        features: [],
        image_url: '',
        video_url: '',
        gallery: [],
        icon: 'Camera',
        featured: false,
        specifications: {},
      });
    }
  };

  if (loading) return <div className="text-center py-12">加载中...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">产品管理</h2>
        <button
          onClick={() => handleEdit()}
          className="flex items-center space-x-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
        >
          <Plus className="w-5 h-5" />
          <span>添加产品</span>
        </button>
      </div>

      {/* Edit Form */}
      {editForm && (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border-2 border-teal-500 max-h-[80vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-4 sticky top-0 bg-white pb-4 border-b">
            <h3 className="text-lg font-bold">{editingId ? '编辑产品' : '添加产品'}</h3>
            <button onClick={() => { setEditingId(null); setEditForm(null); }} className="p-2 hover:bg-gray-100 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            {/* Basic Info */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">产品名称 *</label>
                <input
                  type="text"
                  value={editForm.name || ''}
                  onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">类别 *</label>
                <input
                  type="text"
                  value={editForm.category || ''}
                  onChange={(e) => setEditForm({...editForm, category: e.target.value})}
                  list="categories"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <datalist id="categories">
                  {categories.map(cat => <option key={cat} value={cat} />)}
                </datalist>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">产品描述</label>
              <textarea
                value={editForm.description || ''}
                onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                rows={3}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            {/* Main Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">产品主图</label>
              <div className="flex items-center space-x-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'image_url')}
                  className="hidden"
                  id="product-image"
                />
                <label htmlFor="product-image" className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer">
                  <Upload className="w-4 h-4" />
                  <span>上传主图</span>
                </label>
                {editForm.image_url && (
                  <div className="relative">
                    <img src={editForm.image_url} alt="Preview" className="w-24 h-24 object-cover rounded-lg" />
                    <button
                      onClick={() => setEditForm({...editForm, image_url: ''})}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Video */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">产品视频 (MP4, 最大100MB)</label>
              <div className="flex items-center space-x-4">
                <input
                  type="file"
                  accept="video/mp4,video/webm"
                  onChange={handleVideoUpload}
                  className="hidden"
                  id="product-video"
                />
                <label htmlFor="product-video" className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer">
                  <Video className="w-4 h-4" />
                  <span>上传视频</span>
                </label>
                {editForm.video_url && (
                  <div className="relative">
                    <video src={editForm.video_url} className="w-32 h-20 object-cover rounded-lg" controls />
                    <button
                      onClick={() => setEditForm({...editForm, video_url: ''})}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
              <input
                type="text"
                value={editForm.video_url || ''}
                onChange={(e) => setEditForm({...editForm, video_url: e.target.value})}
                placeholder="或输入视频链接"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 mt-2"
              />
            </div>

            {/* Gallery */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">产品图集</label>
              <div className="flex items-center space-x-4">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleGalleryUpload}
                  className="hidden"
                  id="product-gallery"
                />
                <label htmlFor="product-gallery" className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer">
                  <Image className="w-4 h-4" />
                  <span>上传图集</span>
                </label>
              </div>
              {editForm.gallery && editForm.gallery.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {editForm.gallery.map((img: string, idx: number) => (
                    <div key={idx} className="relative">
                      <img src={img} alt={`Gallery ${idx}`} className="w-20 h-20 object-cover rounded-lg" />
                      <button
                        onClick={() => removeGalleryImage(idx)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Icon */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">图标</label>
              <select
                value={editForm.icon || 'Camera'}
                onChange={(e) => setEditForm({...editForm, icon: e.target.value})}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                {iconOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            {/* Features */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">产品特点</label>
              <div className="flex space-x-2 mb-2">
                <input
                  type="text"
                  value={featureInput}
                  onChange={(e) => setFeatureInput(e.target.value)}
                  placeholder="输入特点后点击添加"
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  onKeyPress={(e) => e.key === 'Enter' && addFeature()}
                />
                <button
                  onClick={addFeature}
                  className="px-4 py-2 bg-teal-100 text-teal-700 rounded-lg hover:bg-teal-200"
                >
                  添加
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {(editForm.features || []).map((feature: string, idx: number) => (
                  <span key={idx} className="inline-flex items-center space-x-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-full">
                    <span>{feature}</span>
                    <button onClick={() => removeFeature(idx)} className="hover:text-red-500">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Specifications */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">技术规格 (格式: 键:值)</label>
              <div className="flex space-x-2 mb-2">
                <input
                  type="text"
                  value={specInput}
                  onChange={(e) => setSpecInput(e.target.value)}
                  placeholder="例如: 分辨率: 4K"
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  onKeyPress={(e) => e.key === 'Enter' && addSpec()}
                />
                <button
                  onClick={addSpec}
                  className="px-4 py-2 bg-teal-100 text-teal-700 rounded-lg hover:bg-teal-200"
                >
                  添加
                </button>
              </div>
              <div className="space-y-1">
                {Object.entries(editForm.specifications || {}).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between px-3 py-2 bg-gray-50 rounded-lg">
                    <span><strong>{key}:</strong> {value as string}</span>
                    <button onClick={() => removeSpec(key)} className="text-red-500 hover:text-red-700">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Featured */}
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={editForm.featured ?? false}
                  onChange={(e) => setEditForm({...editForm, featured: e.target.checked})}
                  className="w-5 h-5 text-teal-600 rounded"
                />
                <span className="text-sm font-medium">设为精选产品</span>
              </label>
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6 sticky bottom-0 bg-white pt-4 border-t">
            <button
              onClick={() => { setEditingId(null); setEditForm(null); }}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              取消
            </button>
            <button
              onClick={handleSave}
              disabled={uploading || !editForm.name || !editForm.category}
              className="flex items-center space-x-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{uploading ? '保存中...' : '保存'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Product List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="h-40 bg-gray-100 relative">
              {product.image_url ? (
                <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Package className="w-12 h-12 text-gray-300" />
                </div>
              )}
              {product.video_url && (
                <div className="absolute bottom-2 right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                  <Video className="w-4 h-4 text-white" />
                </div>
              )}
              {product.featured && (
                <span className="absolute top-2 left-2 px-2 py-1 bg-teal-500 text-white text-xs rounded-full">精选</span>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-bold text-gray-900">{product.name}</h3>
              <p className="text-sm text-gray-500">{product.category}</p>
              <p className="text-sm text-gray-600 mt-2 line-clamp-2">{product.description}</p>
              <div className="flex space-x-2 mt-4">
                <button
                  onClick={() => handleEdit(product)}
                  className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
                >
                  <Pencil className="w-4 h-4" />
                  <span>编辑</span>
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {products.length === 0 && !editForm && (
        <div className="text-center py-12 text-gray-500">
          <Package className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p>暂无产品，点击上方按钮添加</p>
        </div>
      )}
    </div>
  );
}

// News Manager Component
function NewsManager() {
  const [news, setNews] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    loadNews();
  }, []);

  async function loadNews() {
    const { data } = await supabase
      .from('news')
      .select('*')
      .order('published_at', { ascending: false });

    if (data) setNews(data);
    setLoading(false);
  }

  async function handleSave() {
    if (!editForm) return;
    setUploading(true);

    const newsData = {
      title: editForm.title,
      category: editForm.category,
      content: editForm.content,
      image_url: editForm.image_url || '',
      published_at: editForm.published_at || new Date().toISOString(),
      author: editForm.author || '管理员',
      active: editForm.active ?? true,
    };

    if (editingId) {
      await supabase.from('news').update(newsData).eq('id', editingId);
    } else {
      await supabase.from('news').insert(newsData);
    }

    await loadNews();
    setEditingId(null);
    setEditForm(null);
    setUploading(false);
  }

  async function handleDelete(id: number) {
    if (confirm('确定要删除这条新闻吗？')) {
      await supabase.from('news').delete().eq('id', id);
      await loadNews();
    }
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const url = await uploadFile(STORAGE_BUCKETS.IMAGES, file, 'news');
    if (url) {
      setEditForm({ ...editForm, image_url: url });
    }
    setUploading(false);
  }

  async function handleToggleActive(id: number, currentActive: boolean) {
    await supabase.from('news').update({ active: !currentActive }).eq('id', id);
    await loadNews();
  }

  const handleEdit = (item?: any) => {
    if (item) {
      setEditingId(item.id);
      setEditForm({ ...item });
    } else {
      setEditingId(0);
      setEditForm({
        title: '',
        category: '公司动态',
        content: '',
        image_url: '',
        published_at: new Date().toISOString().split('T')[0],
        author: '管理员',
        active: true,
      });
    }
  };

  if (loading) return <div className="text-center py-12">加载中...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">新闻动态管理</h2>
        <button
          onClick={() => handleEdit()}
          className="flex items-center space-x-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
        >
          <Plus className="w-5 h-5" />
          <span>添加新闻</span>
        </button>
      </div>

      {/* Edit Form */}
      {editForm && (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border-2 border-teal-500 max-h-[80vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-4 sticky top-0 bg-white pb-4 border-b">
            <h3 className="text-lg font-bold">{editingId ? '编辑新闻' : '添加新闻'}</h3>
            <button onClick={() => { setEditingId(null); setEditForm(null); }} className="p-2 hover:bg-gray-100 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">标题 *</label>
                <input
                  type="text"
                  value={editForm.title || ''}
                  onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">分类</label>
                <select
                  value={editForm.category || '公司动态'}
                  onChange={(e) => setEditForm({...editForm, category: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="公司动态">公司动态</option>
                  <option value="行业新闻">行业新闻</option>
                  <option value="技术文章">技术文章</option>
                  <option value="展会活动">展会活动</option>
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">发布日期</label>
                <input
                  type="date"
                  value={editForm.published_at?.split('T')[0] || ''}
                  onChange={(e) => setEditForm({...editForm, published_at: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">作者</label>
                <input
                  type="text"
                  value={editForm.author || ''}
                  onChange={(e) => setEditForm({...editForm, author: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">封面图片</label>
              <div className="flex items-center space-x-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="news-image"
                />
                <label htmlFor="news-image" className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer">
                  <Upload className="w-4 h-4" />
                  <span>上传图片</span>
                </label>
                {editForm.image_url && (
                  <img src={editForm.image_url} alt="Preview" className="w-24 h-24 object-cover rounded-lg" />
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">内容</label>
              <textarea
                value={editForm.content || ''}
                onChange={(e) => setEditForm({...editForm, content: e.target.value})}
                rows={10}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="输入新闻详细内容..."
              />
            </div>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={editForm.active ?? true}
                onChange={(e) => setEditForm({...editForm, active: e.target.checked})}
                className="w-5 h-5 text-teal-600 rounded"
              />
              <span className="text-sm font-medium">发布</span>
            </label>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={() => { setEditingId(null); setEditForm(null); }}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              取消
            </button>
            <button
              onClick={handleSave}
              disabled={uploading || !editForm.title}
              className="flex items-center space-x-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{uploading ? '保存中...' : '保存'}</span>
            </button>
          </div>
        </div>
      )}

      {/* News List */}
      <div className="space-y-4">
        {news.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow-sm p-4 flex items-center">
            <div className="w-24 h-16 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
              {item.image_url && <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />}
            </div>
            <div className="flex-1 ml-4">
              <h3 className="font-bold text-gray-900">{item.title}</h3>
              <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                <span>{item.category}</span>
                <span>{item.published_at?.split('T')[0]}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs ${item.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                  {item.active ? '已发布' : '草稿'}
                </span>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleToggleActive(item.id, item.active)}
                className={`p-2 rounded-lg ${item.active ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}
              >
                {item.active ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
              <button onClick={() => handleEdit(item)} className="p-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200">
                <Pencil className="w-4 h-4" />
              </button>
              <button onClick={() => handleDelete(item.id)} className="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
        {news.length === 0 && !editForm && (
          <div className="text-center py-12 text-gray-500">
            <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>暂无新闻，点击上方按钮添加</p>
          </div>
        )}
      </div>
    </div>
  );
}

// About Page Manager
function AboutManager() {
  const [content, setContent] = useState<any>({
    title: '',
    subtitle: '',
    description: '',
    vision: '',
    features: {},
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadContent();
  }, []);

  async function loadContent() {
    const { data } = await supabase
      .from('page_contents')
      .select('*')
      .eq('page_key', 'about')
      .single();

    if (data) {
      setContent(JSON.parse(data.content || '{}'));
    }
  }

  async function handleSave() {
    setSaving(true);
    const { error } = await supabase
      .from('page_contents')
      .upsert({
        page_key: 'about',
        title: '关于我们',
        content: JSON.stringify(content),
        meta_description: content.description?.substring(0, 160) || '',
      }, { onConflict: 'page_key' });

    if (!error) {
      alert('保存成功！');
    }
    setSaving(false);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">关于我们管理</h2>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center space-x-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50"
        >
          <Save className="w-5 h-5" />
          <span>{saving ? '保存中...' : '保存'}</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">页面标题</label>
          <input
            type="text"
            value={content.title || ''}
            onChange={(e) => setContent({...content, title: e.target.value})}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">副标题</label>
          <input
            type="text"
            value={content.subtitle || ''}
            onChange={(e) => setContent({...content, subtitle: e.target.value})}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">公司简介</label>
          <textarea
            value={content.description || ''}
            onChange={(e) => setContent({...content, description: e.target.value})}
            rows={6}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">企业愿景</label>
          <textarea
            value={content.vision || ''}
            onChange={(e) => setContent({...content, vision: e.target.value})}
            rows={3}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
      </div>
    </div>
  );
}

// Contact Manager
function ContactManager() {
  const [contact, setContact] = useState<any>({
    company_name: '',
    address: '',
    phone: '',
    email: '',
    website: '',
    wechat: '',
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadContact();
  }, []);

  async function loadContact() {
    const { data } = await supabase
      .from('page_contents')
      .select('*')
      .eq('page_key', 'contact')
      .single();

    if (data) {
      setContact(JSON.parse(data.content || '{}'));
    }
  }

  async function handleSave() {
    setSaving(true);
    await supabase
      .from('page_contents')
      .upsert({
        page_key: 'contact',
        title: '联系我们',
        content: JSON.stringify(contact),
        meta_description: '联系我们 - ' + contact.company_name,
      }, { onConflict: 'page_key' });

    alert('保存成功！');
    setSaving(false);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">联系我们管理</h2>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center space-x-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50"
        >
          <Save className="w-5 h-5" />
          <span>{saving ? '保存中...' : '保存'}</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">公司名称</label>
          <input
            type="text"
            value={contact.company_name || ''}
            onChange={(e) => setContact({...contact, company_name: e.target.value})}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">地址</label>
          <input
            type="text"
            value={contact.address || ''}
            onChange={(e) => setContact({...contact, address: e.target.value})}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">电话</label>
            <input
              type="text"
              value={contact.phone || ''}
              onChange={(e) => setContact({...contact, phone: e.target.value})}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">邮箱</label>
            <input
              type="email"
              value={contact.email || ''}
              onChange={(e) => setContact({...contact, email: e.target.value})}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">网址</label>
            <input
              type="text"
              value={contact.website || ''}
              onChange={(e) => setContact({...contact, website: e.target.value})}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">微信</label>
            <input
              type="text"
              value={contact.wechat || ''}
              onChange={(e) => setContact({...contact, wechat: e.target.value})}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Dashboard Stats
function DashboardStats() {
  const [stats, setStats] = useState({
    products: 0,
    featured: 0,
    news: 0,
  });

  useEffect(() => {
    async function loadStats() {
      const [products, featured, news] = await Promise.all([
        supabase.from('products').select('id', { count: 'exact', head: true }),
        supabase.from('homepage_featured').select('id', { count: 'exact', head: true }),
        supabase.from('news').select('id', { count: 'exact', head: true }),
      ]);

      setStats({
        products: products.count || 0,
        featured: featured.count || 0,
        news: news.count || 0,
      });
    }
    loadStats();
  }, []);

  const statCards = [
    { label: '产品数量', value: stats.products, icon: Package, color: 'bg-blue-500' },
    { label: '首页精选', value: stats.featured, icon: Star, color: 'bg-purple-500' },
    { label: '新闻动态', value: stats.news, icon: FileText, color: 'bg-green-500' },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">仪表盘</h2>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {statCards.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="font-bold text-gray-900 mb-4">使用说明</h3>
        <div className="space-y-3 text-sm text-gray-600">
          <p>• <strong>首页精选：</strong>管理网站首页的精选产品展示区域</p>
          <p>• <strong>产品管理：</strong>添加、编辑、删除产品，支持上传主图、视频和图集</p>
          <p>• <strong>新闻动态：</strong>发布公司新闻、行业动态等内容</p>
          <p>• <strong>关于我们：</strong>编辑公司简介、企业愿景等内容</p>
          <p>• <strong>联系我们：</strong>管理公司联系方式信息</p>
        </div>
      </div>
    </div>
  );
}

// Homepage Featured Product Manager
function FeaturedManager() {
  const [featured, setFeatured] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    loadFeatured();
    loadProducts();
  }, []);

  async function loadFeatured() {
    const { data } = await supabase
      .from('homepage_featured')
      .select('*')
      .order('sort_order');

    if (data) setFeatured(data);
    setLoading(false);
  }

  async function loadProducts() {
    const { data } = await supabase
      .from('products')
      .select('id, name, category')
      .order('name');
    if (data) setProducts(data);
  }

  async function handleSave() {
    if (!editForm) return;
    setUploading(true);

    const featuredData = {
      product_id: editForm.product_id || null,
      title: editForm.title || '',
      subtitle: editForm.subtitle || '',
      description: editForm.description || '',
      image_url: editForm.image_url || '',
      link_url: editForm.link_url || '',
      button_text: editForm.button_text || '了解更多',
      active: editForm.active ?? true,
      sort_order: editForm.sort_order || 1,
      updated_at: new Date().toISOString(),
    };

    if (editingId) {
      await supabase.from('homepage_featured').update(featuredData).eq('id', editingId);
    } else {
      await supabase.from('homepage_featured').insert(featuredData);
    }

    await loadFeatured();
    setEditingId(null);
    setEditForm(null);
    setUploading(false);
  }

  async function handleDelete(id: number) {
    if (confirm('确定要删除这个精选产品吗？')) {
      await supabase.from('homepage_featured').delete().eq('id', id);
      await loadFeatured();
    }
  }

  async function handleImageUpload(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const url = await uploadFile(STORAGE_BUCKETS.IMAGES, file, 'featured');
    if (url) {
      setEditForm({ ...editForm, image_url: url });
    }
    setUploading(false);
  }

  const handleEdit = (item?: any) => {
    if (item) {
      setEditingId(item.id);
      setEditForm({ ...item });
    } else {
      setEditingId(0);
      setEditForm({
        product_id: null,
        title: '',
        subtitle: '',
        description: '',
        image_url: '',
        link_url: '',
        button_text: '了解更多',
        active: true,
        sort_order: featured.length + 1,
      });
    }
  };

  if (loading) return <div className="text-center py-12">加载中...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">首页精选产品管理</h2>
        <button
          onClick={() => handleEdit()}
          className="flex items-center space-x-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
        >
          <Plus className="w-5 h-5" />
          <span>添加精选</span>
        </button>
      </div>

      {/* Edit Form */}
      {editForm && (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border-2 border-teal-500 max-h-[80vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-4 sticky top-0 bg-white pb-4 border-b">
            <h3 className="text-lg font-bold">{editingId ? '编辑精选' : '添加精选'}</h3>
            <button onClick={() => { setEditingId(null); setEditForm(null); }} className="p-2 hover:bg-gray-100 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            {/* Product Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">关联产品（可选）</label>
              <select
                value={editForm.product_id || ''}
                onChange={(e) => setEditForm({...editForm, product_id: e.target.value ? parseInt(e.target.value) : null})}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="">-- 不关联产品 --</option>
                {products.map(p => (
                  <option key={p.id} value={p.id}>{p.name} ({p.category})</option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">选择产品后会自动使用产品名称和图片</p>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">标题</label>
              <input
                type="text"
                value={editForm.title || ''}
                onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                placeholder="例如：医用内窥镜系统"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            {/* Subtitle */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">副标题</label>
              <input
                type="text"
                value={editForm.subtitle || ''}
                onChange={(e) => setEditForm({...editForm, subtitle: e.target.value})}
                placeholder="例如：高清成像精准诊断"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">描述</label>
              <textarea
                value={editForm.description || ''}
                onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                rows={3}
                placeholder="输入产品描述..."
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            {/* Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">展示图片</label>
              <div className="flex items-center space-x-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="featured-image"
                />
                <label htmlFor="featured-image" className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer">
                  <Upload className="w-4 h-4" />
                  <span>上传图片</span>
                </label>
                {editForm.image_url && (
                  <img src={editForm.image_url} alt="Preview" className="w-24 h-24 object-cover rounded-lg" />
                )}
              </div>
            </div>

            {/* Link */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">链接地址</label>
              <input
                type="text"
                value={editForm.link_url || ''}
                onChange={(e) => setEditForm({...editForm, link_url: e.target.value})}
                placeholder="/product/1"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            {/* Button Text */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">按钮文字</label>
              <input
                type="text"
                value={editForm.button_text || '了解更多'}
                onChange={(e) => setEditForm({...editForm, button_text: e.target.value})}
                placeholder="了解更多"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            {/* Sort Order */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">排序顺序</label>
              <input
                type="number"
                value={editForm.sort_order || 1}
                onChange={(e) => setEditForm({...editForm, sort_order: parseInt(e.target.value) || 1})}
                min={1}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            {/* Active */}
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={editForm.active ?? true}
                onChange={(e) => setEditForm({...editForm, active: e.target.checked})}
                className="w-5 h-5 text-teal-600 rounded"
              />
              <span className="text-sm font-medium">启用</span>
            </label>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={() => { setEditingId(null); setEditForm(null); }}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              取消
            </button>
            <button
              onClick={handleSave}
              disabled={uploading}
              className="flex items-center space-x-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{uploading ? '保存中...' : '保存'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Featured List */}
      <div className="space-y-4">
        {featured.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow-sm p-4 flex items-center">
            <div className="w-24 h-16 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
              {item.image_url ? (
                <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Star className="w-6 h-6 text-gray-300" />
                </div>
              )}
            </div>
            <div className="flex-1 ml-4">
              <h3 className="font-bold text-gray-900">{item.title || '未设置标题'}</h3>
              <p className="text-sm text-gray-500">{item.subtitle || '未设置副标题'}</p>
              <div className="flex items-center space-x-4 mt-1 text-xs text-gray-400">
                {item.product_id && <span>关联产品: ID {item.product_id}</span>}
                <span>排序: {item.sort_order}</span>
                <span className={`px-2 py-0.5 rounded-full ${item.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                  {item.active ? '已启用' : '已禁用'}
                </span>
              </div>
            </div>
            <div className="flex space-x-2">
              <button onClick={() => handleEdit(item)} className="p-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200">
                <Pencil className="w-4 h-4" />
              </button>
              <button onClick={() => handleDelete(item.id)} className="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
        {featured.length === 0 && !editForm && (
          <div className="text-center py-12 text-gray-500">
            <Star className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>暂无精选产品，点击上方按钮添加</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Main Admin Component
export default function AdminProducts() {
  const { isAuthenticated, loading } = useAuth();
  const [activeModule, setActiveModule] = useState('dashboard');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const renderModule = () => {
    switch (activeModule) {
      case 'dashboard':
        return <DashboardStats />;
      case 'featured':
        return <FeaturedManager />;
      case 'products':
        return <ProductManager />;
      case 'news':
        return <NewsManager />;
      case 'about':
        return <AboutManager />;
      case 'contact':
        return <ContactManager />;
      default:
        return <DashboardStats />;
    }
  };

  return (
    <AdminLayout activeModule={activeModule} onModuleChange={setActiveModule}>
      {renderModule()}
    </AdminLayout>
  );
}
