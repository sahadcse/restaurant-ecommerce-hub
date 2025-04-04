'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../../lib/authContext';
import { useRouter } from 'next/navigation';
import {
  getMenuItems,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  MenuItem,
} from '../../../lib/api';
import Image from 'next/image';

export default function MenuManagement() {
  const { token } = useAuth();
  const router = useRouter();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [restaurantId, setRestaurantId] = useState(3); // Hardcoded for now, fetch later
  const [newItem, setNewItem] = useState<Omit<MenuItem, 'id' | 'restaurant_id'>>({
    name: '',
    price: 0,
    description: '',
    image_url: '',
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchMenuItems = useCallback(async () => {
    try {
      const data = await getMenuItems(restaurantId);
      setMenuItems(data);
    } catch (err) {
      console.error('Error fetching menu items:', err);
    } finally {
      setLoading(false);
    }
  }, [restaurantId]);

  useEffect(() => {
    if (!token) {
      router.push('/login');
      return;
    }
    fetchMenuItems();
  }, [token, router, fetchMenuItems]);



  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    try {
      const created = await createMenuItem(restaurantId, newItem, token);
      setMenuItems([...menuItems, created]);
      setNewItem({ name: '', price: 0, description: '', image_url: '' });
    } catch (err) {
      console.error('Error creating menu item:', err);
    }
  };

  const handleUpdate = async (id: number) => {
    if (!token) return;
    try {
      const itemToUpdate = menuItems.find((item) => item.id === id);
      if (!itemToUpdate) return;
      const updated = await updateMenuItem(id, {
        name: itemToUpdate.name,
        price: itemToUpdate.price,
        description: itemToUpdate.description,
        image_url: itemToUpdate.image_url,
      }, token);
      setMenuItems(menuItems.map((item) => (item.id === id ? updated : item)));
      setEditingId(null);
    } catch (err) {
      console.error('Error updating menu item:', err);
    }
  };

  const handleDelete = async (id: number) => {
    if (!token) return;
    try {
      await deleteMenuItem(id, token);
      setMenuItems(menuItems.filter((item) => item.id !== id));
    } catch (err) {
      console.error('Error deleting menu item:', err);
    }
  };

  if (!token) return null; // Redirect handled by useEffect

  return (
    <div>
      <h2 className="text-3xl font-semibold mb-6 text-black">Menu Management</h2>

      {/* Add New Item Form */}
      <form onSubmit={handleCreate} className="mb-8 bg-gray-100 p-4 rounded-lg space-y-4">
        <div>
          <label className="block text-black mb-1">Name</label>
          <input
            type="text"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            className="w-full p-2 border rounded text-black"
            required
          />
        </div>
        <div>
          <label className="block text-black mb-1">Price</label>
          <input
            type="number"
            step="0.01"
            value={newItem.price}
            onChange={(e) => setNewItem({ ...newItem, price: parseFloat(e.target.value) })}
            className="w-full p-2 border rounded text-black"
            required
          />
        </div>
        <div>
          <label className="block text-black mb-1">Description</label>
          <textarea
            value={newItem.description}
            onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
            className="w-full p-2 border rounded text-black"
          />
        </div>
        <div>
          <label className="block text-black mb-1">Image URL</label>
          <input
            type="url"
            value={newItem.image_url}
            onChange={(e) => setNewItem({ ...newItem, image_url: e.target.value })}
            className="w-full p-2 border rounded text-black"
          />
        </div>
        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded hover:bg-teal-700 transition-colors"
        >
          Add Item
        </button>
      </form>

      {/* Menu Items List */}
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : menuItems.length === 0 ? (
        <p className="text-gray-500">No menu items yet.</p>
      ) : (
        <div className="space-y-4">
          {menuItems.map((item) => (
            <div
              key={item.id}
              className="border border-gray-200 rounded-lg p-4 flex items-center gap-4"
            >
              {item.image_url ? (
                <Image
                  src={item.image_url}
                  alt={item.name}
                  width={80}
                  height={80}
                  className="w-20 h-20 object-cover rounded-md"
                />
              ) : (
                <div className="w-20 h-20 bg-gray-200 rounded-md flex items-center justify-center">
                  <span className="text-gray-500">No Image</span>
                </div>
              )}
              <div className="flex-1">
                {editingId === item.id ? (
                  <>
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) =>
                        setMenuItems(
                          menuItems.map((i) =>
                            i.id === item.id ? { ...i, name: e.target.value } : i
                          )
                        )
                      }
                      className="w-full p-2 border rounded mb-2 text-black"
                    />
                    <input
                      type="number"
                      step="0.01"
                      value={item.price}
                      onChange={(e) =>
                        setMenuItems(
                          menuItems.map((i) =>
                            i.id === item.id ? { ...i, price: parseFloat(e.target.value) } : i
                          )
                        )
                      }
                      className="w-full p-2 border rounded mb-2 text-black"
                    />
                    <textarea
                      value={item.description}
                      onChange={(e) =>
                        setMenuItems(
                          menuItems.map((i) =>
                            i.id === item.id ? { ...i, description: e.target.value } : i
                          )
                        )
                      }
                      className="w-full p-2 border rounded mb-2 text-black"
                    />
                    <input
                      type="url"
                      value={item.image_url}
                      onChange={(e) =>
                        setMenuItems(
                          menuItems.map((i) =>
                            i.id === item.id ? { ...i, image_url: e.target.value } : i
                          )
                        )
                      }
                      className="w-full p-2 border rounded mb-2 text-black"
                    />
                    <button
                      onClick={() => handleUpdate(item.id)}
                      className="bg-primary text-white px-4 py-2 rounded hover:bg-teal-700"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="ml-2 text-gray-500 hover:text-black"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <h3 className="text-lg font-medium text-black">{item.name}</h3>
                    <p className="text-gray-600">${Number(item.price).toFixed(2)}</p>
                    <p className="text-gray-600">{item.description || 'No description'}</p>
                  </>
                )}
              </div>
              <div className="flex gap-2">
                {editingId !== item.id && (
                  <button
                    onClick={() => setEditingId(item.id)}
                    className="text-primary hover:text-teal-700"
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}