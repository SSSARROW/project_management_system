import { useState } from "react"
import { FaPlus, FaEdit, FaTrashAlt, FaCheck, FaHistory, FaList, FaSearch } from "react-icons/fa"

// Inventory Table component (unchanged)
const InventoryTable = ({ items, onUpdate, onDelete }) => (
  <div className="bg-white shadow-md rounded-lg overflow-hidden border-2 border-blue-200">
     <h3 className="px-6 py-3 text-lg font-medium text-gray-800">Inventory List</h3>
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
            Item ID
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
            Item Name
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
            Quantity
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
            Minimum Stock Level
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
            Status
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {items.map((item) => (
          <tr key={item.id}>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.id}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.quantity}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.minimumStockLevel}</td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span
                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  item.status === "In Stock"
                    ? "bg-green-100 text-green-800"
                    : item.status === "Out of Stock"
                      ? "bg-red-100 text-red-800"
                      : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {item.status}
              </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <button className="text-blue-600 hover:text-blue-900 mr-3" onClick={() => onUpdate(item)}>
                <FaEdit />
              </button>
              <button className="text-red-600 hover:text-red-900" onClick={() => onDelete(item.id)}>
                <FaTrashAlt />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

// Activity Log component (unchanged)
const ActivityLogTable = ({ logs }) => (
  <div className="bg-white shadow-md rounded-lg overflow-hidden mt-8 border-2 border-blue-200">
    <h3 className="px-6 py-3 text-lg font-medium text-gray-800">Activity Log</h3>
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
            Date
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
            Action
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
            Item ID
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
            Item Name
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {logs.map((log, index) => (
          <tr key={index}>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.date}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.action}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.itemId}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.itemName}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

// Issue Log component (unchanged)
const IssueLogTable = ({ logs }) => (
  <div className="bg-white shadow-md rounded-lg overflow-hidden mt-8 border-2 border-blue-200">
    <h3 className="px-6 py-3 text-lg font-medium text-gray-800">Issue Log</h3>
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
            Date
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
            Item ID
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
            Item Name
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
            Quantity Issued
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {logs.map((log, index) => (
          <tr key={index}>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.date}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.itemId}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.itemName}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.quantity}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

// Inventory item add form (updated with scroll bar)
const ItemForm = ({ item, onSubmit, buttonText, onClose }) => {
  const [formData, setFormData] = useState(item || { id: "", name: "", quantity: 0, minimumStockLevel: 0 })
  const [preview, setPreview] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const updatedItem = {
      ...formData,
      status: formData.quantity >= formData.minimumStockLevel ? "In Stock" : "Out of Stock",
    }
    onSubmit(updatedItem)
  }

  const handlePreview = () => {
    setPreview(true)
  }

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md relative border-2 border-blue-200 max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit} className="space-y-2">
          <div>
            <label htmlFor="form" className="block text-center text-lg text-blue-900">
              Add Item
            </label>

            <label htmlFor="id" className="block text-md font-medium text-black">
              Item ID
            </label>
            <input
              type="text"
              id="id"
              name="id"
              value={formData.id}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-2 border-blue-200 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="name" className="block text-md font-medium text-black">
              Item Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-2 border-blue-200 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="quantity" className="block text-md font-medium text-black">
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-2 border-blue-200 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="minimumStockLevel" className="block text-md font-medium text-black">
              Minimum Stock Level
            </label>
            <input
              type="number"
              id="minimumStockLevel"
              name="minimumStockLevel"
              value={formData.minimumStockLevel}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-2 border-blue-200 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>

          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={handlePreview}
              className="previewbutton w-full bg-green-500 hover:bg-green-800 text-black font-bold py-2 px-4 rounded-md"
            >
              Preview
            </button>
          </div>
          {preview && (
            <div className="w-full bg-gray-100 p-4 mt-4 border-t">
              <p>
                <strong>Preview:</strong>
              </p>
              <p>Item ID: {formData.id}</p>
              <p>Item Name: {formData.name}</p>
              <p>Quantity: {formData.quantity}</p>
              <p>Minimum Stock Level: {formData.minimumStockLevel}</p>
              <p>Status: {formData.quantity >= formData.minimumStockLevel ? "In Stock" : "Out of Stock"}</p>
            </div>
          )}
          <button
            type="submit"
            className="addbutton w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md mt-4"
          >
            {buttonText}
          </button>
          <button
            onClick={onClose}
            className="closebutton w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md mt-4"
          >
            Close
          </button>
        </form>
      </div>
    </div>
  )
}

// Issue Form (updated with scroll bar)
const IssueForm = ({ onSubmit, onClose, items }) => {
  const [selectedItems, setSelectedItems] = useState([])
  const [preview, setPreview] = useState(false)

  const handleItemChange = (index, e) => {
    const updatedItems = [...selectedItems]
    updatedItems[index][e.target.name] = e.target.value
    setSelectedItems(updatedItems)
  }

  const handleAddItem = () => {
    setSelectedItems([...selectedItems, { id: "", name: "", quantity: 0 }])
  }

  const handlePreview = () => {
    setPreview(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(selectedItems)
  }

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md relative border-2 border-blue-200 max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <label htmlFor="form" className="block text-center text-lg text-blue-900">
            Issue Item
          </label>
          {selectedItems.map((item, index) => (
            <div key={index} className="space-y-4">
              <div>
                <label htmlFor={`item-id-${index}`} className="block text-md font-medium text-black">
                  Item ID
                </label>
                <select
                  id={`item-id-${index}`}
                  name="id"
                  value={item.id}
                  onChange={(e) => handleItemChange(index, e)}
                  className="mt-1 block w-full rounded-md border-2 border-blue-200 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                >
                  <option value="">Select Item</option>
                  {items.map((inventoryItem) => (
                    <option key={inventoryItem.id} value={inventoryItem.id}>
                      {inventoryItem.name} (ID: {inventoryItem.id})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor={`quantity-${index}`} className="block text-md font-medium text-black">
                  Quantity to Issue
                </label>
                <input
                  type="number"
                  id={`quantity-${index}`}
                  name="quantity"
                  value={item.quantity}
                  onChange={(e) => handleItemChange(index, e)}
                  required
                  className="mt-1 block w-full rounded-md border-2 border-blue-200 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddItem}
            className="addbutton w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md mt-4"
          >
            Add Item
          </button>

          <div className="flex justify-between mt-4 w-full">
            <button
              type="button"
              onClick={handlePreview}
              className="previewbutton bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md"
            >
              Preview
            </button>
            <button
              type="button"
              onClick={onClose}
              className="closebutton bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md"
            >
              Close
            </button>
          </div>

          {preview && (
            <div className="w-full bg-gray-100 p-4 mt-4 border-t">
              <p>
                <strong>Issue Preview:</strong>
              </p>
              {selectedItems.map((item, index) => (
                <div key={index}>
                  <p>ID: {item.id}</p>
                  <p>Name: {items.find((i) => i.id === item.id)?.name || "N/A"}</p>
                  <p>Quantity: {item.quantity}</p>
                </div>
              ))}
              <button
                type="submit"
                className="addbutton w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md mt-4"
              >
                Issue Items
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

// Inventory System
const InventorySystem = () => {
  const [items, setItems] = useState([])
  const [activityLogs, setActivityLogs] = useState([])
  const [issueLogs, setIssueLogs] = useState([])
  const [currentItem, setCurrentItem] = useState(null)
  const [activeForm, setActiveForm] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")

  const handleAddItem = (item) => {
    setItems([...items, item])
    setActivityLogs([
      ...activityLogs,
      {
        date: new Date().toLocaleString(),
        action: "Added",
        itemId: item.id,
        itemName: item.name,
      },
    ])
    setActiveForm(null)
  }

  const handleUpdateItem = (updatedItem) => {
    const updatedItems = items.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    setItems(updatedItems)
    setActivityLogs([
      ...activityLogs,
      {
        date: new Date().toLocaleString(),
        action: "Updated",
        itemId: updatedItem.id,
        itemName: updatedItem.name,
      },
    ])
    setActiveForm(null)
  }

  const handleDeleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id))
    setActivityLogs([
      ...activityLogs,
      {
        date: new Date().toLocaleString(),
        action: "Deleted",
        itemId: id,
        itemName: items.find((item) => item.id === id)?.name || "",
      },
    ])
  }

  const handleOpenAddModal = () => {
    setCurrentItem(null)
    setActiveForm("add")
  }

  const handleOpenEditModal = (item) => {
    setCurrentItem(item)
    setActiveForm("edit")
  }

  const handleOpenIssueModal = () => {
    setActiveForm("issue")
  }

  const handleCloseModal = () => {
    setActiveForm(null)
  }

  const handleIssueItems = (itemsToIssue) => {
    const updatedItems = items.map((item) => {
      const issuedItem = itemsToIssue.find((issued) => issued.id === item.id)
      if (issuedItem) {
        const newQuantity = item.quantity - issuedItem.quantity
        if (newQuantity < 0) {
          alert(`Cannot issue more than available quantity for item ${item.name}.`)
          return item // Skip updating this item
        }
        return {
          ...item,
          quantity: newQuantity,
          status: newQuantity >= item.minimumStockLevel ? "In Stock" : "Out of Stock",
        }
      }
      return item
    })

    setItems(updatedItems)

    itemsToIssue.forEach((item) => {
      setIssueLogs((prevLogs) => [
        ...prevLogs,
        {
          date: new Date().toLocaleString(),
          itemId: item.id,
          itemName: items.find((i) => i.id === item.id)?.name || "N/A",
          quantity: item.quantity,
        },
      ])
    })

    setActiveForm(null)
  }

  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="container mx-auto p-1 mt-2">
      <div className="mb-6 flex flex-wrap items-center gap-2">
        <button
          onClick={handleOpenAddModal}
          className="addbutton inline-flex items-center px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
        >
          <FaPlus className="mr-2" />
          Add New Item
        </button>
        <button
          onClick={handleOpenIssueModal}
          className="previewbutton inline-flex items-center px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600"
        >
          <FaCheck className="mr-2" />
          Issue Items
        </button>
        <button
          onClick={() => setActiveForm(activeForm === "activity" ? null : "activity")}
          className="showbutton inline-flex items-center px-4 py-2 bg-purple-500 text-white font-semibold rounded-lg hover:bg-purple-600"
        >
          <FaHistory className="mr-2" />
          {activeForm === "activity" ? "Hide Activity Log" : "Show Activity Log"}
        </button>
        <button
          onClick={() => setActiveForm(activeForm === "issuelog" ? null : "issuelog")}
          className="issuebtn inline-flex items-center px-4 py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600"
        >
          <FaList className="mr-2" />
          {activeForm === "issuelog" ? "Hide Issue Log" : "Show Issue Log"}
        </button>
        <div className="flex items-center bg-white  rounded-lg px-2 w-full md:w-auto border-2 border-blue-200">
          <FaSearch className="text-gray-400" />
          <input
            type="text"
            placeholder="Search items..."
            className="p-2 focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {activeForm !== "activity" && activeForm !== "issuelog" && (
        <InventoryTable items={filteredItems} onUpdate={handleOpenEditModal} onDelete={handleDeleteItem} />
      )}

      {activeForm === "add" && (
        <ItemForm item={currentItem} onSubmit={handleAddItem} buttonText="Add Item" onClose={handleCloseModal} />
      )}
      {activeForm === "edit" && (
        <ItemForm item={currentItem} onSubmit={handleUpdateItem} buttonText="Update Item" onClose={handleCloseModal} />
      )}
      {activeForm === "issue" && <IssueForm onSubmit={handleIssueItems} onClose={handleCloseModal} items={items} />}

      {activeForm === "activity" && <ActivityLogTable logs={activityLogs} />}
      {activeForm === "issuelog" && <IssueLogTable logs={issueLogs} />}
    </div>
  )
}

export default InventorySystem

