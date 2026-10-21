import { useMemo, useState } from "react";
import InventoryHeader from "../../components/sections/inventory/InventoryHeader";
import InventorySummary from "../../components/sections/inventory/InventorySummary";
import StockAdjustmentModal from "../../components/sections/inventory/StockAdjustmentModal";
import StockLevels from "../../components/sections/inventory/StockLevels";
import StockMovementHistory from "../../components/sections/inventory/StockMovementHistory";
import { initialMovements, initialProducts } from "../../components/sections/inventory/inventoryData";

function Inventory() {
  const [products, setProducts] = useState(initialProducts);
  const [movements, setMovements] = useState(initialMovements);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All categories");
  const [stockFilter, setStockFilter] = useState("All stock");
  const [adjustingProduct, setAdjustingProduct] = useState(null);
  const [notice, setNotice] = useState("");

  const lowStockProducts = useMemo(
    () => products.filter((product) => product.quantity <= product.reorderLevel),
    [products],
  );

  const filteredProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return products.filter((product) => {
      const matchesSearch =
        !normalizedSearch ||
        product.name.toLowerCase().includes(normalizedSearch) ||
        product.sku.toLowerCase().includes(normalizedSearch);
      const matchesCategory =
        categoryFilter === "All categories" || product.category === categoryFilter;
      const isLowStock = product.quantity <= product.reorderLevel;
      const matchesStock =
        stockFilter === "All stock" ||
        (stockFilter === "Low stock" && isLowStock) ||
        (stockFilter === "In stock" && !isLowStock) ||
        (stockFilter === "Out of stock" && product.quantity === 0);

      return matchesSearch && matchesCategory && matchesStock;
    });
  }, [categoryFilter, products, search, stockFilter]);

  const totalUnits = products.reduce((total, product) => total + product.quantity, 0);

  function openAdjustment(product) {
    setAdjustingProduct(product);
    setNotice("");
  }

  function closeAdjustment() {
    setAdjustingProduct(null);
  }

  function saveAdjustment({ productId, change, reason }) {
    const product = products.find((item) => item.id === productId);
    if (!product) {
      throw new Error(`Cannot adjust stock: product "${productId}" was not found.`);
    }

    const movement = {
      id: `mov-${Date.now()}`,
      productId,
      change,
      reason,
      createdAt: Date.now(),
    };

    setProducts((currentProducts) =>
      currentProducts.map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity + change }
          : item,
      ),
    );
    setMovements((currentMovements) => [movement, ...currentMovements]);
    setNotice(`Stock updated for ${product.name}.`);
    closeAdjustment();
  }

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-7 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <InventoryHeader onAdjustStock={() => openAdjustment(products[0])} />

      {notice && (
        <p className="rounded-xl border border-success/30 bg-success-soft px-4 py-3 text-sm font-medium text-ink" role="status">
          {notice}
        </p>
      )}

      <InventorySummary
        products={products}
        lowStockCount={lowStockProducts.length}
        totalUnits={totalUnits}
      />

      <StockLevels
        products={products}
        filteredProducts={filteredProducts}
        lowStockProducts={lowStockProducts}
        search={search}
        onSearchChange={setSearch}
        categoryFilter={categoryFilter}
        onCategoryChange={setCategoryFilter}
        stockFilter={stockFilter}
        onStockFilterChange={setStockFilter}
        onAdjustStock={openAdjustment}
      />

      <StockMovementHistory movements={movements} products={products} />

      {adjustingProduct && (
        <StockAdjustmentModal
          products={products}
          initialProduct={adjustingProduct}
          onClose={closeAdjustment}
          onSave={saveAdjustment}
        />
      )}
    </div>
  );
}

export default Inventory;
