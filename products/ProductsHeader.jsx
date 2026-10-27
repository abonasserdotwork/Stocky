import React from 'react';
import { Plus, Search } from 'lucide-react';

export default function ProductsHeader({ onOpenModal, searchTerm, setSearchTerm }) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-surface p-5 rounded-xl border border-border shadow-card">
      <div>
        <h1 className="text-xl font-bold text-ink">إدارة المنتجات</h1>
        <p className="text-xs text-muted mt-1">عرض وإضافة وتعديل بيانات المنتجات والمخزون</p>
      </div>

      <div className="flex items-center gap-3 w-full sm:w-auto">
        <div className="relative w-full sm:w-64">
          <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted" />
          <input
            type="text"
            placeholder="بحث عن منتج..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pr-9 pl-4 py-2 text-xs bg-page border border-border rounded-lg text-ink focus:outline-none focus:border-primary"
          />
        </div>

        <button
          onClick={onOpenModal}
          className="flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white text-xs px-4 py-2.5 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          <span>إضافة منتج</span>
        </button>
      </div>
    </div>
  );
}