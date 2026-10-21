import "./Suppliers.css"
import SupplierToolbar from "../components/Suppliers/SupplierToolbar/SupplierToolbar"
import SupplierTable from "../components/Suppliers/SupplierTable/SupplierTable";
   import { suppliers as initialSuppliers } from "../components/Suppliers/suppliers.data";

import { useState } from "react";
import EmptyState from "../components/Suppliers/EmptyState/EmptyState";
import Pagination from "../components/Suppliers/Pagintation/Pagination";
import AddSupplierModal from "../components/Suppliers/AddSupplierModal/AddSupplierModal";
import SupplierDetailsModal from "../components/Suppliers/SupplierDetailsModal/SupplierDetailsModal";


export default function Suppliers(){
    
const [search, setSearch] =useState("");

const [status, setStatus] = useState("all");

const [page, setPage] = useState(1);

const [isModalOpen, setIsModalOpen] = useState(false);

  const [suppliers, setSuppliers] = useState(initialSuppliers);



   const [editingSupplier, setEditingSupplier] = useState(null);

   const [viewingSupplier, setViewingSupplier] = useState(null);

const handleSearchChange = (value) => {
  setSearch(value); 
  setPage(1);         
};

const handleStatusChange = (value) => {
  setStatus(value);
  setPage(1);
};

const filtered = suppliers.filter((s) => {
  const q = search.toLowerCase();

  const matchesSearch =
    s.name.toLowerCase().includes(q) ||
    s.phone.includes(q) ||
    s.email.toLowerCase().includes(q);

  const matchesStatus = status === "all" || s.status === status;



  return matchesSearch && matchesStatus;
});
const PAGE_SIZE = 6;
const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
const start = (page - 1) * PAGE_SIZE;
const end = page * PAGE_SIZE;
const paginated = filtered.slice(start, end);

const showingFrom  = filtered.length === 0 ? 0 : start + 1;
const showingTo = Math.min(end, filtered.length);

const handleSave = (formData) => {
  if (editingSupplier) {

    setSuppliers(
      suppliers.map((s) =>
        s.id === editingSupplier.id ? { ...s, ...formData } : s
      )
    );
  } else {

const newSupplier = {
  id: Date.now(),
  code: `SUP-${String(suppliers.length + 1).padStart(3, "0")}`,
  ...formData,
  status: "active",
};
    setSuppliers([newSupplier, ...suppliers]);
    setPage(1);
  }
  handleCloseModal();
}
const handleDelete = (id) => {
  if (!window.confirm("Are you sure you want to delete this supplier?")) return;
  const remaining = suppliers.filter((s) => s.id !== id);
  setSuppliers(remaining);

  const newTotalPages = Math.max(1, Math.ceil(remaining.length / PAGE_SIZE));
  if (page > newTotalPages) {
    setPage(newTotalPages);
  }
};

  const handleEditClick = (supplier) => {
  setEditingSupplier(supplier);
  setIsModalOpen(true);
}; 
const handleCloseModal = () => {
  setIsModalOpen(false);
  setEditingSupplier(null);
};



return(
    <div className="suppliers-page">
    
<SupplierToolbar
  search={search}
  onSearchChange={handleSearchChange}
  status={status}
  onStatusChange={handleStatusChange}
  onAddClick={() => {
  setEditingSupplier(null);
  setIsModalOpen(true);
} }

/>

{filtered.length === 0 ? (
  <EmptyState></EmptyState>
) : (
  <SupplierTable suppliers={paginated} onDelete={handleDelete}  onEdit={handleEditClick} onView={setViewingSupplier}/>
)}
<div className="pagination-container">

<p id="last-p">Showing <span >{showingFrom}</span> to <span>{showingTo} </span>of <span>{filtered.length} </span>suppliers</p>
<Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
</div>

{isModalOpen && (
  <AddSupplierModal
    onClose={handleCloseModal}
    onSave={handleSave}
    supplier={editingSupplier}
  />
)}

{viewingSupplier && (
  <SupplierDetailsModal
    supplier={viewingSupplier}
    onClose={() => setViewingSupplier(null)}
    onEdit={() => {
      handleEditClick(viewingSupplier);
      setViewingSupplier(null);
    }}
    onDelete={() => {
      handleDelete(viewingSupplier.id);
      setViewingSupplier(null);
    }}
  />
)}

    </div>
)



}