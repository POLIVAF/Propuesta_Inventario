const { Inventory } = require('../models');

// Get all inventory items for logged in user
exports.getAllItems = async (req, res) => {
  try {
    const items = await Inventory.findAll({
      where: { userId: req.userId },
      order: [['createdAt', 'DESC']]
    });
    res.json(items);
  } catch (error) {
    console.error('Error fetching inventory:', error);
    res.status(500).json({ message: 'Error al obtener inventario' });
  }
};

// Create a new item
exports.createItem = async (req, res) => {
  try {
    const { product_name, quantity, price } = req.body;
    
    if (!product_name || quantity === undefined || price === undefined) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    const newItem = await Inventory.create({
      product_name,
      quantity,
      price,
      userId: req.userId // Set by authMiddleware
    });

    res.status(201).json(newItem);
  } catch (error) {
    console.error('Error creating item:', error);
    res.status(500).json({ message: 'Error al crear producto' });
  }
};

// Update an item
exports.updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { product_name, quantity, price } = req.body;

    const item = await Inventory.findOne({
      where: { id, userId: req.userId }
    });

    if (!item) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    item.product_name = product_name !== undefined ? product_name : item.product_name;
    item.quantity = quantity !== undefined ? quantity : item.quantity;
    item.price = price !== undefined ? price : item.price;

    await item.save();

    res.json(item);
  } catch (error) {
    console.error('Error updating item:', error);
    res.status(500).json({ message: 'Error al actualizar producto' });
  }
};

// Delete an item
exports.deleteItem = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Inventory.destroy({
      where: { id, userId: req.userId }
    });

    if (!deleted) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    res.json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({ message: 'Error al eliminar producto' });
  }
};
