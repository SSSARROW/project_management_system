import { useState, useEffect } from "react"
import { FaEdit, FaTrash, FaEye, FaPlus } from "react-icons/fa"

const Expenses = () => {
  const [expenses, setExpenses] = useState([])
  const [totalExpenses, setTotalExpenses] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState("add") // "add", "edit", "view"
  const [currentExpense, setCurrentExpense] = useState({
    id: "",
    date: "",
    amount: "",
    description: "",
    category: "Inventory",
  })
  const [searchDate, setSearchDate] = useState("")
  const [searchAmount, setSearchAmount] = useState("")

  useEffect(() => {
    updateSummary()
  }, [expenses]) 
  
  const updateSummary = () => {
    const total = expenses.reduce((sum, expense) => sum + Number.parseFloat(expense.amount), 0)
    setTotalExpenses(total)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (modalMode === "add") {
      const newExpenseItem = {
        ...currentExpense,
        id: Date.now().toString(),
        date: new Date().toISOString().split("T")[0],
      }
      setExpenses((prevExpenses) => [...prevExpenses, newExpenseItem])
    } else if (modalMode === "edit") {
      setExpenses((prevExpenses) => 
        prevExpenses.map((exp) => (exp.id === currentExpense.id ? currentExpense : exp))
      )
    }
    setIsModalOpen(false)
    setCurrentExpense({ id: "", date: "", amount: "", description: "", category: "Inventory" })
  }

  const handleDelete = (id) => {
    setExpenses((prevExpenses) => prevExpenses.filter((exp) => exp.id !== id))
  }

  const openModal = (mode, expense = null) => {
    setModalMode(mode)
    if (expense) {
      setCurrentExpense(expense)
    } else {
      setCurrentExpense({ id: "", date: "", amount: "", description: "", category: "Inventory" })
    }
    setIsModalOpen(true)
  }

  const filteredExpenses = expenses.filter((expense) => 
    (searchDate ? expense.date.includes(searchDate) : true) &&
    (searchAmount ? expense.amount.includes(searchAmount) : true)
  )

  return (
    <div className="container mx-auto mt-5 p-4">
      <h1 className="text-3xl font-bold mb-4">Expense Management</h1>
      <p className="mb-4">Manage and track your expenses efficiently.</p>

      <div className="flex justify-between items-center mb-4">
        <button
          className="additembutton bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded flex items-center"
          onClick={() => openModal("add")}
        >
          <FaPlus className="mr-2" /> Add Expense
        </button>
        <div className="flex items-center">
          <label htmlFor="dateSearch" className="mr-2">
            Search by Date:
          </label>
          <input
            type="date"
            id="dateSearch"
            className="border-2 border-blue-200 rounded py-2 px-3"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
          />
        </div>
        <div className="flex items-center">
          <label htmlFor="amountSearch" className="mr-2">
            Search by Amount:
          </label>
          <input
            type="number"
            id="amountSearch"
            placeholder="Enter amount"
            className=" rounded py-2 px-3 border-2 border-blue-200"
            value={searchAmount}
            onChange={(e) => setSearchAmount(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-4 mb-4">
        <h3 className="text-lg font-semibold mb-2">Total Expenses</h3>
        <p className="text-2xl font-bold">Rs {totalExpenses.toFixed(2)}</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow rounded-lg border-2 border-blue-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">ID</th>
              <th className="p-2 text-left">Date</th>
              <th className="p-2 text-left">Amount</th>
              <th className="p-2 text-left">Description</th>
              <th className="p-2 text-left">Category</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredExpenses.map((expense) => (
              <tr key={expense.id} className="border-t">
                <td className="p-2">{expense.id}</td>
                <td className="p-2">{expense.date}</td>
                <td className="p-2">Rs {Number.parseFloat(expense.amount).toFixed(2)}</td>
                <td className="p-2">{expense.description}</td>
                <td className="p-2">{expense.category}</td>
                <td className="p-2">
                  <button onClick={() => openModal("view", expense)} className="text-blue-500 hover:text-blue-700 mr-2">
                    <FaEye />
                  </button>
                  <button
                    onClick={() => openModal("edit", expense)}
                    className="text-yellow-500 hover:text-yellow-700 mr-2"
                  >
                    <FaEdit />
                  </button>
                  <button onClick={() => handleDelete(expense.id)} className="text-red-500 hover:text-red-700">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/*add and view expenses*/}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg w-full max-w-md border-2 border-blue-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-center">
                {modalMode === "add" ? "Add Expense" : modalMode === "edit" ? "Edit Expense" : "View Expense"}
              </h2>
              <button className="text-gray-500 hover:text-gray-700" onClick={() => setIsModalOpen(false)}>
                &times;
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="expenseDate" className="block mb-2">
                  Date
                </label>
                <input
                  type="date"
                  id="expenseDate"
                  className="w-full p-2 border-2 border-blue-200 rounded"
                  value={currentExpense.date}
                  onChange={(e) => setCurrentExpense({ ...currentExpense, date: e.target.value })}
                  required
                  readOnly={modalMode === "view"}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="expenseAmount" className="block mb-2">
                  Amount
                </label>
                <input
                  type="number"
                  id="expenseAmount"
                  className="w-full p-2 border-2 border-blue-200 rounded"
                  value={currentExpense.amount}
                  onChange={(e) => setCurrentExpense({ ...currentExpense, amount: e.target.value })}
                  required
                  readOnly={modalMode === "view"}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="expenseDescription" className="block mb-2">
                  Description
                </label>
                <input
                  type="text"
                  id="expenseDescription"
                  className="w-full p-2 border-2 border-blue-200 rounded"
                  value={currentExpense.description}
                  onChange={(e) => setCurrentExpense({ ...currentExpense, description: e.target.value })}
                  required
                  readOnly={modalMode === "view"}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="expenseCategory" className="block mb-2">
                  Category
                </label>
                <select
                  id="expenseCategory"
                  className="w-full p-2 border-2 border-blue-200 rounded"
                  value={currentExpense.category}
                  onChange={(e) => setCurrentExpense({ ...currentExpense, category: e.target.value })}
                  required
                  disabled={modalMode === "view"}
                >
                  <option value="Inventory">Inventory</option>
                  <option value="site">Site</option>
                  <option value="Salary">Salary</option>
                  <option value="Others">Others</option>
                </select>
              </div>
              {modalMode !== "view" && (
                <button type="submit" className="addbutton bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                  {modalMode === "add" ? "Add Expense" : "Update Expense"}
                </button>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Expenses
