'use client';
import {useState} from 'react';
import Link from 'next/link';

export default function AdminPage() {
  const [formData, setFormData] = useState({
    adminToken: '',
    name: '',
    brand: 'EuroDolls',
    price: '',
    originalPrice: '',
    material: '',
    height: '',
    weight: '',
    cupSize: '',
    skinTone: '',
    style: 'realistic',
    tags: '',
    description: '',
    badge: '',
    images: null as FileList | null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [newProductId, setNewProductId] = useState<string | null>(null);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    // Validate image count
    if (!formData.images || formData.images.length === 0) {
      setMessage('Please select at least 1 image.');
      setIsSubmitting(false);
      return;
    }

    if (formData.images.length > 10) {
      setMessage('You can upload up to 10 images per product.');
      setIsSubmitting(false);
      return;
    }

    try {
      const submitData = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'images' && value) {
          Array.from(value as FileList).forEach(file => submitData.append('images', file));
        } else if (value !== null && value !== '') {
          submitData.append(key, value.toString());
        }
      });

      const res = await fetch('/api/admin/products', {
        method: 'POST',
        body: submitData,
      });

      if (res.ok) {
        const data = await res.json();
        setNewProductId(data.id);
        setMessage(`Success! Product added: ${data.id}`);
        setFormData({
          adminToken: '',
          name: '',
          brand: 'EuroDolls',
          price: '',
          originalPrice: '',
          material: '',
          height: '',
          weight: '',
          cupSize: '',
          skinTone: '',
          style: 'realistic',
          tags: '',
          description: '',
          badge: '',
          images: null,
        });
        setImagePreviews([]);
      } else {
        const error = await res.text();
        setMessage(`Error: ${error}`);
        setNewProductId(null);
      }
    } catch (error) {
      setMessage(`Error: ${error}`);
      setNewProductId(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const {name, value} = e.target;
    setFormData(prev => ({...prev, [name]: value}));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    // Check if more than 10 images selected
    if (files.length > 10) {
      setMessage('You can upload up to 10 images per product.');
      e.target.value = ''; // Clear the input
      setFormData(prev => ({ ...prev, images: null }));
      setImagePreviews([]);
      return;
    }

    // Check if no images selected
    if (files.length === 0) {
      setFormData(prev => ({ ...prev, images: null }));
      setImagePreviews([]);
      return;
    }

    setFormData(prev => ({ ...prev, images: files }));

    // Create image previews
    const previews: string[] = [];
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          previews.push(e.target.result as string);
          if (previews.length === files.length) {
            setImagePreviews([...previews]);
          }
        }
      };
      reader.readAsDataURL(file);
    });

    setMessage(''); // Clear any previous error messages
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Product Admin</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Admin PIN</label>
            <input
              type="password"
              name="adminToken"
              value={formData.adminToken}
              onChange={handleChange}
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-zinc-100 focus:border-amber-600 focus:outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Product name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-zinc-100 focus:border-amber-600 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Brand</label>
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-zinc-100 focus:border-amber-600 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Price</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-zinc-100 focus:border-amber-600 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Original price</label>
              <input
                type="number"
                name="originalPrice"
                value={formData.originalPrice}
                onChange={handleChange}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-zinc-100 focus:border-amber-600 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Height cm</label>
              <input
                type="number"
                name="height"
                value={formData.height}
                onChange={handleChange}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-zinc-100 focus:border-amber-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Weight kg</label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-zinc-100 focus:border-amber-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Cup size</label>
              <input
                type="text"
                name="cupSize"
                value={formData.cupSize}
                onChange={handleChange}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-zinc-100 focus:border-amber-600 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Skin tone</label>
              <input
                type="text"
                name="skinTone"
                value={formData.skinTone}
                onChange={handleChange}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-zinc-100 focus:border-amber-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Style</label>
              <select
                name="style"
                value={formData.style}
                onChange={handleChange}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-zinc-100 focus:border-amber-600 focus:outline-none"
              >
                <option value="realistic">Realistic</option>
                <option value="anime">Anime</option>
                <option value="torso">Torso</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Material</label>
            <input
              type="text"
              name="material"
              value={formData.material}
              onChange={handleChange}
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-zinc-100 focus:border-amber-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Tags (comma separated)</label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="e.g., realistic, european, bbw"
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-zinc-100 focus:border-amber-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-zinc-100 focus:border-amber-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Badge</label>
            <input
              type="text"
              name="badge"
              value={formData.badge}
              onChange={handleChange}
              placeholder="e.g., NEW, HOT, 10% OFF"
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-zinc-100 focus:border-amber-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Images <span className="text-zinc-500">({formData.images?.length || 0} / 10 selected)</span>
            </label>
            <input
              type="file"
              name="images"
              onChange={handleFileChange}
              accept="image/*"
              multiple
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-zinc-100 focus:border-amber-600 focus:outline-none"
              required
            />
            <p className="text-xs text-zinc-500 mt-1">
              Upload 1-10 images. The first image will be used as the main product image.
            </p>

            {/* Image Previews */}
            {imagePreviews.length > 0 && (
              <div className="mt-4">
                <p className="text-sm font-medium text-zinc-300 mb-2">Image Previews:</p>
                <div className="grid grid-cols-5 gap-2">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative">
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full aspect-square object-cover rounded-lg border border-zinc-700"
                      />
                      {index === 0 && (
                        <span className="absolute top-1 left-1 bg-amber-600 text-zinc-950 text-xs px-2 py-0.5 rounded font-bold">
                          Main
                        </span>
                      )}
                      <span className="absolute bottom-1 right-1 bg-zinc-900 text-zinc-300 text-xs px-1 py-0.5 rounded">
                        {index + 1}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-amber-600 hover:bg-amber-500 disabled:bg-zinc-700 text-zinc-950 font-bold py-3 px-6 rounded-lg transition-colors"
          >
            {isSubmitting ? 'Adding Product...' : 'Add Product'}
          </button>

          {message && (
            <div className={`p-4 rounded-lg ${message.startsWith('Success') ? 'bg-emerald-900/50 text-emerald-400' : 'bg-rose-900/50 text-rose-400'}`}>
              <p className="mb-3">{message}</p>
              {newProductId && (
                <div className="space-y-2 text-sm">
                  <div>
                    <Link href={`/en/product/${newProductId}`} className="inline-block bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded mr-2">
                      View Product
                    </Link>
                    <Link href={`/en/shop`} className="inline-block bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded">
                      Back to Shop
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}