import React, { useState, useEffect } from "react";
import "./App.css"; 

const App = () => {
  const [wishList, setWishList] = useState([]);
  const [item, setItem] = useState("");
  const [selectedItemId, setSelectedItemId] = useState(null); 

  useEffect(() => {
    // Sort the wish list 
    sortItems();
  }, []);

  // Update priority for a wish item
  const updatePriority = (id, priority) => {
    const updatedWishList = wishList.map((item) =>
      item.id === id ? { ...item, priority } : item
    );
    setWishList(updatedWishList);
  };

  // Remove 
  const removeItem = (id) => {
    const updatedWishList = wishList.filter((item) => item.id !== id);
    setWishList(updatedWishList);
  };

  // Sort 
  const sortItems = () => {
    const sortedWishList = [...wishList].sort((a, b) => a.priority - b.priority);
    setWishList(sortedWishList);
  };

  // Add
  const addItem = () => {
    if (item) {
      const newItem = { id: Date.now(), item: item, priority: 0 }; // Set initial priority to 0
      setWishList([...wishList, newItem]);
      setItem("");
    }
  };

  // Update 
  const handlePriorityChange = (id, priority) => {
    setSelectedItemId(id);
    updatePriority(id, priority);
  };

  // Move to top
  const moveToTop = (id) => {
    const itemToMove = wishList.find(item => item.id === id);
    if (itemToMove) {
      const updatedWishList = [itemToMove, ...wishList.filter(item => item.id !== id)];
      setWishList(updatedWishList);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Wish List Widget</h1>
      <div className="content-container">
        <div className="input-container">
          <input
            className="input"
            type="text"
            placeholder="Add Something to the wish list"
            value={item}
            onChange={(e) => setItem(e.target.value)}
          />
          <button className="add-button" onClick={addItem}>
            Add Item
          </button>
        </div>
        <ul className="wish-list">
          {wishList.map((item) => (
            <li key={item.id} className="wish-item">
              <span className="item-name">{item.item}</span>{" "}
              <input
                className="priority-input"
                type="number"
                min="0"
                max="100"

                value={item.priority}
                onChange={(e) => handlePriorityChange(item.id, parseInt(e.target.value))}
              />
              <button className="remove-button" onClick={() => removeItem(item.id)}>
                Remove
              </button>
              <button className="move-top-button" onClick={() => moveToTop(item.id)}>
                Move to Top
              </button>
            </li>
          ))}
        </ul>
        <div className="sort-container">
          <button className="sort-button" onClick={sortItems}>
            Sort
          </button>
        </div>
        </div>
      </div>
  );
};

export default App;