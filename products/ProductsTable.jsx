import React from 'react';
import { Edit, Trash2, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function ProductsTable({ products, onDelete, onEdit }) {
  return (
    <div className="bg-surface rounded-xl border border-border shadow-card overflow-hidden scroll-thin">
      <table className="w-full text-right text-xs">
        <thead className="bg-page border-b border-border text-muted font-semibold">
          <tr>
            <th className="p-4">المنتج</th>
            <th className="p-4">التصنيف</th>
            <th className="p-4">السعر</th>
            <th className="p-4">الكمية بالمخزن</th>
            <th className="p-4">الحالة</th>
            <th className="p-4 text-center">الإجراءات</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border text-ink">
          {products.map((product) => (
            <tr key={product.id} className="hover:bg-page/50 transition-colors">
              <td className="p-4 font-semibold">{product.name}</td>
              <td className="p-4 text-muted">{product.category}</td>
              <td className="p-4 font-bold">{product.price} ج.م</td>
              <td className="p-4">{product.stock} قطعة</td>
              <td className="p-4">
                {product.stock <= 5 ? (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-warning-soft text-warning border border-warning/30">
                    <AlertTriangle className="w-3 h-3" /> مخزون منخفض
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-success-soft text-success border border-success/30">
                    <CheckCircle2 className="w-3 h-3" /> متوفر
                  </span>
                )}
              </td>
              <td className="p-4">
                <div className="flex items-center justify-center gap-2">
                  <button onClick={() => onEdit(product)} className="p-1.5 hover:bg-page text-primary rounded-md transition-colors">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button onClick={() => onDelete(product.id)} className="p-1.5 hover:bg-page text-danger rounded-md transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}