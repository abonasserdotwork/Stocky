export const initialProducts = [
  { id: "prd-001", name: "Arabica Coffee Beans", sku: "BEV-001", category: "Beverages", quantity: 18, reorderLevel: 20 },
  { id: "prd-002", name: "Oat Milk 1L", sku: "BEV-014", category: "Beverages", quantity: 42, reorderLevel: 15 },
  { id: "prd-003", name: "Reusable Cup 12oz", sku: "ACC-008", category: "Accessories", quantity: 7, reorderLevel: 10 },
  { id: "prd-004", name: "Dark Chocolate Bar", sku: "SNK-023", category: "Snacks", quantity: 0, reorderLevel: 12 },
  { id: "prd-005", name: "Vanilla Syrup", sku: "BEV-031", category: "Beverages", quantity: 26, reorderLevel: 10 },
  { id: "prd-006", name: "Paper Filter Pack", sku: "ACC-012", category: "Accessories", quantity: 9, reorderLevel: 9 },
];

export const initialMovements = [
  { id: "mov-001", productId: "prd-002", change: 24, reason: "Supplier delivery", createdAt: Date.now() - 1000 * 60 * 18 },
  { id: "mov-002", productId: "prd-004", change: -3, reason: "Damaged goods", createdAt: Date.now() - 1000 * 60 * 60 * 2 },
  { id: "mov-003", productId: "prd-001", change: -6, reason: "Stock correction", createdAt: Date.now() - 1000 * 60 * 60 * 5 },
  { id: "mov-004", productId: "prd-003", change: 12, reason: "Supplier delivery", createdAt: Date.now() - 1000 * 60 * 60 * 24 },
];
