import React, { useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import ProductsHeader from '../components/sections/products/ProductsHeader';
import ProductsTable from '../components/sections/products/ProductsTable';
import AddProductModal from '../components/sections/products/AddProductModal';

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState([
    { id: 1, name: 'ماوس لاسلكي Logitech', category: 'إلكترونيات', price: 450, stock: 15 },
    { id: 2, name: 'لوحة مفاتيح ميكانيكية', category: 'إلكترونيات', price: 1200, stock: 3 },
    { id: 3, name: 'شاشة سامسونج 27 بوصة', category: 'شاشات', price: 6500, stock: 8 }
  ]);

  const filteredProducts = products.filter(p => p.name.includes(searchTerm));

  const handleAddProduct = (newProduct) => {
    setProducts([newProduct, ...products]);
  };

  const handleDelete = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <ProductsHeader 
          onOpenModal={() => setIsModalOpen(true)} 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
        />
        <ProductsTable 
          products={filteredProducts} 
          onDelete={handleDelete} 
          onEdit={(p) => alert(`تعديل ${p.name}`)} 
        />
        <AddProductModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          onAddProduct={handleAddProduct} 
        />
      </div>
    </DashboardLayout>
  );
}