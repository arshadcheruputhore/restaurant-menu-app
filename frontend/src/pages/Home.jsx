import { useEffect, useState } from "react";
import {
  getMenus,
  createMenu,
  addMenuItem,
  getMenu,
  deleteMenuItem,
  updateMenuItem,
} from "../services/api";
import toast, { Toaster } from "react-hot-toast";
import MenuList from "../components/MenuList";
import MenuFormModal from "../components/MenuFormModal";
import ItemFormModal from "../components/ItemFormModal";
import ItemCard from "../components/ItemCard";
import { deleteMenu } from "../services/api";
import { motion } from "framer-motion";

function Home() {
  const [menus, setMenus] = useState([]);
  const [active, setActive] = useState(null);
  const [loading, setLoading] = useState(true);

  // Menu modal states
  const [menuModalOpen, setMenuModalOpen] = useState(false);
  const [menuFormData, setMenuFormData] = useState({
    name: "",
    description: "",
  });

  // Item modal states
  const [itemModalOpen, setItemModalOpen] = useState(false);
  const [itemFormData, setItemFormData] = useState({
    itemName: "",
    description: "",
    price: "",
  });
  const [editItemId, setEditItemId] = useState(null);

  const fetchMenus = async () => {
    try {
      setLoading(true);
      const res = await getMenus();
      setMenus(res.data);
      setActive(res.data[0]?._id);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load menus");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenus();
  }, []);

  const handleCreateMenu = async (e) => {
    e.preventDefault();
    try {
      await createMenu(menuFormData);
      toast.success("Menu created successfully");
      setMenuModalOpen(false);
      setMenuFormData({ name: "", description: "" });
      await fetchMenus();
    } catch (err) {
      console.error(err);
      toast.error("Error creating menu");
    }
  };

  const handleAddOrUpdateItem = async (e) => {
    e.preventDefault();
    try {
      if (editItemId) {
        await updateMenuItem(active, editItemId, itemFormData);
        toast.success("Item updated successfully");
      } else {
        await addMenuItem(active, itemFormData);
        toast.success("Item added successfully");
      }
      const res = await getMenu(active);
      const updatedMenus = menus.map((m) => (m._id === active ? res.data : m));
      setMenus(updatedMenus);
      setItemFormData({ itemName: "", description: "", price: "" });
      setEditItemId(null);
      setItemModalOpen(false);
    } catch (err) {
      console.error(err);
      toast.error("Operation failed");
    }
  };

  const handleDeleteItem = async (itemId) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    
    try {
      await deleteMenuItem(active, itemId);
      toast.success("Item deleted");
      const res = await getMenu(active);
      const updatedMenus = menus.map((m) => (m._id === active ? res.data : m));
      setMenus(updatedMenus);
    } catch (err) {
      console.error(err);
      toast.error("Delete failed");
    }
  };

  const activeMenu = menus.find((m) => m._id === active);

  const handleDeleteMenu = async (menuId) => {
    if (!window.confirm("Are you sure you want to delete this menu and all its items?")) return;
    
    try {
      await deleteMenu(menuId);
      toast.success("Menu deleted");
      if (menuId === active) setActive(null);
      await fetchMenus();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete menu");
    }
  };

  const openEditItemModal = (item) => {
    setItemFormData({
      itemName: item.itemName,
      description: item.description,
      price: item.price,
    });
    setEditItemId(item._id);
    setItemModalOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 bg-blue-500 rounded-full mb-4"></div>
          <div className="h-4 w-32 bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-4 md:p-8">
      <Toaster 
        position="top-center"
        toastOptions={{
          style: {
            background: '#1F2937',
            color: '#fff',
            borderRadius: '0.5rem',
            border: '1px solid #374151'
          }
        }}
      />
      
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Menu Manager
        </h1>

        {/* Menu Navigation */}
        <MenuList
          menus={menus}
          active={active}
          setActive={setActive}
          onAddMenu={() => setMenuModalOpen(true)}
          onDeleteMenu={handleDeleteMenu}
          onAddItem={() => {
            setItemFormData({ itemName: "", description: "", price: "" });
            setEditItemId(null);
            setItemModalOpen(true);
          }}
        />

        {/* Menu Content */}
        {activeMenu ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-2xl md:text-3xl font-bold">
                {activeMenu.name}
                {activeMenu.description && (
                  <span className="block text-sm text-gray-400 font-normal mt-1">
                    {activeMenu.description}
                  </span>
                )}
              </h2>
              <div className="flex items-center gap-4">
                <span className="text-sm bg-gray-700 px-3 py-1 rounded-full">
                  {activeMenu.items?.length || 0} items
                </span>
                <button
                  onClick={() => {
                    setItemFormData({ itemName: "", description: "", price: "" });
                    setEditItemId(null);
                    setItemModalOpen(true);
                  }}
                  className="px-4 py-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  + Add Item
                </button>
              </div>
            </div>

            {activeMenu.items?.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {activeMenu.items.map((item) => (
                  <ItemCard
                    key={item._id}
                    item={item}
                    onEdit={() => openEditItemModal(item)}
                    onDelete={() => handleDeleteItem(item._id)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-800/50 rounded-xl">
                <p className="text-gray-400 mb-4">No items in this menu yet</p>
                <button
                  onClick={() => {
                    setItemFormData({ itemName: "", description: "", price: "" });
                    setItemModalOpen(true);
                  }}
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  Add Your First Item
                </button>
              </div>
            )}
          </motion.div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-gray-400 mb-6">No menu selected</p>
            <button
              onClick={() => setMenuModalOpen(true)}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-medium hover:opacity-90 transition-opacity shadow-lg"
            >
              Create Your First Menu
            </button>
          </div>
        )}

        {/* Menu Form Modal */}
        <MenuFormModal
          isOpen={menuModalOpen}
          onClose={() => setMenuModalOpen(false)}
          formData={menuFormData}
          setFormData={setMenuFormData}
          onSubmit={handleCreateMenu}
        />

        {/* Item Form Modal */}
        <ItemFormModal
          isOpen={itemModalOpen}
          onClose={() => {
            setItemModalOpen(false);
            setEditItemId(null);
          }}
          formData={itemFormData}
          setFormData={setItemFormData}
          onSubmit={handleAddOrUpdateItem}
          isEdit={!!editItemId}
        />
      </motion.div>
    </div>
  );
}

export default Home;