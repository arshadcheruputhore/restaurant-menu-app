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
import MenuForm from "../components/MenuForm";
import ItemForm from "../components/ItemForm";
import ItemCard from "../components/ItemCard";
import { deleteMenu } from "../services/api";

function Home() {
  const [menus, setMenus] = useState([]);
  const [active, setActive] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const [menuName, setMenuName] = useState("");
  const [menuDescription, setMenuDescription] = useState("");

  const [item, setItem] = useState({
    itemName: "",
    description: "",
    price: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [editItemId, setEditItemId] = useState(null);

  const fetchMenus = async () => {
    try {
      const res = await getMenus();
      setMenus(res.data);
      setActive(res.data[0]?._id);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMenus();
  }, []);

  const handleCreateMenu = async (e) => {
    e.preventDefault();
    try {
      await createMenu({ name: menuName, description: menuDescription });
      toast.success("Menu created");
      setModalOpen(false);
      setMenuName("");
      setMenuDescription("");
      fetchMenus();
    } catch (err) {
      console.error(err);
      toast.error("Error creating menu");
    }
  };

  const handleAddOrUpdateItem = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await updateMenuItem(active, editItemId, item);
        toast.success("Item updated");
      } else {
        await addMenuItem(active, item);
        toast.success("Item added");
      }
      const res = await getMenu(active);
      const updatedMenus = menus.map((m) => (m._id === active ? res.data : m));
      setMenus(updatedMenus);
      setItem({ itemName: "", description: "", price: "" });
      setEditMode(false);
      setEditItemId(null);
    } catch (err) {
      console.error(err);
      toast.error("Operation failed");
    }
  };

  const handleDeleteItem = async (itemId) => {
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
    try {
      await deleteMenu(menuId);
      toast.success("Menu deleted");
      if (menuId === active) setActive(null);
      fetchMenus();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete menu");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-4">
      <Toaster />
      <h1 className="text-4xl font-bold text-center mb-6 tracking-widest">
        MENU
      </h1>

      {/* Menu Buttons */}
      <MenuList
        menus={menus}
        active={active}
        setActive={setActive}
        onAddMenu={() => setModalOpen(true)}
        onDeleteMenu={handleDeleteMenu}
        onEdit={() => {
          setItem({
            itemName: "",
            description: "",
            price: "",
          });
          setEditMode(false);
          setEditItemId(null);
        }}
      />

      {/* Menu Items */}
      {activeMenu && (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">{activeMenu.name} Items</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {activeMenu.items?.map((itm) => (
              <ItemCard
                key={itm._id}
                item={itm}
                onEdit={() => {
                  setItem(itm);
                  setEditMode(true);
                  setEditItemId(itm._id);
                }}
                onDelete={() => handleDeleteItem(itm._id)}
              />
            ))}
          </div>

          <ItemForm
            item={item}
            setItem={setItem}
            onSubmit={handleAddOrUpdateItem}
            editMode={editMode}
            onEdit={() => {
              setItem({
                itemName: "",
                description: "",
                price: "",
              });
              setEditMode(false);
              setEditItemId(null);
            }}
          />
        </div>
      )}

      {/* Add Menu Modal */}
      {modalOpen && (
        <MenuForm
          menuName={menuName}
          setMenuName={setMenuName}
          menuDescription={menuDescription}
          setMenuDescription={setMenuDescription}
          onClose={() => setModalOpen(false)}
          onSubmit={handleCreateMenu}
        />
      )}
    </div>
  );
}

export default Home;
