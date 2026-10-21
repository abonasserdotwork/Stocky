import React, { useState } from 'react';
import { X, PackagePlus } from 'lucide-react';

export default function AddProductModal({ isOpen, onClose, onAddProduct }) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('إلكترونيات');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !price || !stock) return alert('برجاء ملء جميع الحقول المطلوبة');

    const newProduct = {
      id: Date.now(),
      name,
      category,
      price: Number(price),
      stock: Number(stock),
    };

    onAddProduct(newProduct);
    // إعادة تصفير الفورم وإغلاق النافذة
    setName('');
    setPrice('');
    setStock('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-surface w-full max-w-md rounded-2xl border border-border shadow-pop overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* الهيدر بتاع النافذة */}
        <div className="flex justify-between items-center p-5 border-b border-border bg-page">
          <div className="flex items-center gap-2 text-ink font-bold text-base">
            <PackagePlus className="w-5 h-5 text-primary" />
            <span>إضافة منتج جديد</span>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg text-muted hover:text-ink hover:bg-border transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* نموذج إدخال البيانات (Form) */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-ink mb-1">اسم المنتج *</label>
            <input
              type="text"
              required
              placeholder="مثال: شاشة سامسونج 27"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-page border border-border rounded-lg text-ink focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink mb-1">التصنيف</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-page border border-border rounded-lg text-ink focus:outline-none focus:border-primary"
            >
              <option value="إلكترونيات">إلكترونيات</option>
              <option value="شاشات">شاشات</option>
              <option value="أجهزة مكتبية">أجهزة مكتبية</option>
              <option value="ملحقات">ملحقات</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-ink mb-1">السعر (ج.م) *</label>
              <input
                type="number"
                required
                min="0"
                placeholder="0.00"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-page border border-border rounded-lg text-ink focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-ink mb-1">الكمية بالمخزن *</label>
              <input
                type="number"
                required
                min="0"
                placeholder="0"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-page border border-border rounded-lg text-ink focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          {/* أزرار الإجراءات */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-muted hover:text-ink hover:bg-page rounded-lg transition-colors"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-medium text-white bg-primary hover:bg-primary-hover rounded-lg transition-colors cursor-pointer"
            >
              حفظ المنتج
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}