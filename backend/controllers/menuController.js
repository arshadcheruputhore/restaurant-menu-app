const Menu = require('../models/Menu');

// Get all menus
exports.getMenus = async (req, res) => {
  const menus = await Menu.find();
  res.json(menus);
};

// Get single menu by ID
exports.getMenu = async (req, res) => {
  const menu = await Menu.findById(req.params.id);
  res.json(menu);
};

// Create new menu
exports.createMenu = async (req, res) => {
  const { name, description } = req.body;
  const menu = new Menu({ name, description });
  await menu.save();
  res.status(201).json(menu);
};

// Add item to a menu
exports.addMenuItem = async (req, res) => {
  const { itemName, description, price } = req.body;
  const menu = await Menu.findById(req.params.id);
  menu.items.push({ itemName, description, price });
  await menu.save();
  res.status(201).json(menu);
};

// DELETE menu item
exports.deleteMenuItem = async (req, res) => {
  const { menuId, itemId } = req.params;

  try {
    const menu = await Menu.findById(menuId);
    if (!menu) return res.status(404).json({ message: "Menu not found" });

    menu.items = menu.items.filter((item) => item._id.toString() !== itemId);
    await menu.save();

    res.status(200).json({ message: "Menu item deleted successfully" });
  } catch (error) {
    console.error("Error deleting menu item:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// UPDATE menu item
exports.updateMenuItem = async (req, res) => {
  const { menuId, itemId } = req.params;
  const { itemName, description, price } = req.body;

  try {
    const menu = await Menu.findById(menuId);
    if (!menu) return res.status(404).json({ message: "Menu not found" });

    const item = menu.items.id(itemId);
    if (!item) return res.status(404).json({ message: "Item not found" });

    item.itemName = itemName ?? item.itemName;
    item.description = description ?? item.description;
    item.price = price ?? item.price;

    await menu.save();

    res.status(200).json({ message: "Menu item updated successfully", item });
  } catch (error) {
    console.error("Error updating menu item:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// DELETE entire menu
exports.deleteMenu = async (req, res) => {
  const { menuId } = req.params;

  try {
    const menu = await Menu.findByIdAndDelete(menuId);
    if (!menu) return res.status(404).json({ message: "Menu not found" });

    res.status(200).json({ message: "Menu deleted successfully" });
  } catch (error) {
    console.error("Error deleting menu:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};