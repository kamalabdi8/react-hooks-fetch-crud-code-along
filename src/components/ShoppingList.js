import React, { useState, useEffect } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/items")
      .then((r) => r.json())
      .then(setItems);
  }, []);

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  function handleAddItem(newItem) {
    setItems((prevItems) => [...prevItems, newItem]); // Add new item to items array
  }

  function handleDeleteItem(id) {
    fetch(`http://localhost:4000/items/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setItems((prevItems) => prevItems.filter((item) => item.id !== id));
      });
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;
    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleAddItem} />
      <Filter category={selectedCategory} onCategoryChange={handleCategoryChange} />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item
            key={item.id}
            item={item}
            onUpdateItem={(updatedItem) => {
              setItems((prevItems) =>
                prevItems.map((i) => (i.id === updatedItem.id ? updatedItem : i))
              );
            }}
            onDeleteItem={handleDeleteItem} // Pass down delete handler
          />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
