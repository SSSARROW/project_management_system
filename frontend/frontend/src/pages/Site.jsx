import { useState, useEffect } from "react"
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaEye,
  FaRegClipboard,
  FaMoneyBillWave,
  FaSearch,
  FaTimes,
  FaClipboardList,
} from "react-icons/fa"

const initialSiteState = {
  po_no: "",
  site_name: "",
  po_amount: 0,
  payment_status: "Pending",
  project_status: "Planning",
  deadline: "",
  progress_updates: [],
  expenses: [],
}

const CountdownTimer = ({ deadline }) => {
  const [timeLeft, setTimeLeft] = useState("")

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      const target = new Date(deadline)
      const difference = target - now

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))

        setTimeLeft(`${days}d ${hours}h`)
      } else {
        setTimeLeft("Expired")
        clearInterval(timer)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [deadline])

  return <span className="font-mono">{timeLeft}</span>
}

const SiteDetails = ({ site, onClose, onUpdate }) => {
  const [editingProgress, setEditingProgress] = useState(null)
  const [editingExpense, setEditingExpense] = useState(null)
  const [updatedSite, setUpdatedSite] = useState(site)

  const calculateTotalExpenses = () => {
    return updatedSite.expenses.reduce((total, expense) => total + Number.parseFloat(expense.amount), 0)
  }

  const calculateProfit = () => {
    return updatedSite.po_amount - calculateTotalExpenses()
  }

  const handleEditProgress = (index) => {
    setEditingProgress(index)
  }

  const handleUpdateProgress = (index, updatedProgress) => {
    const newProgressUpdates = [...updatedSite.progress_updates]
    newProgressUpdates[index] = updatedProgress
    setUpdatedSite({ ...updatedSite, progress_updates: newProgressUpdates })
    setEditingProgress(null)
  }

  const handleDeleteProgress = (index) => {
    const newProgressUpdates = updatedSite.progress_updates.filter((_, i) => i !== index)
    setUpdatedSite({ ...updatedSite, progress_updates: newProgressUpdates })
  }

  const handleEditExpense = (index) => {
    setEditingExpense(index)
  }

  const handleUpdateExpense = (index, updatedExpense) => {
    const newExpenses = [...updatedSite.expenses]
    newExpenses[index] = updatedExpense
    setUpdatedSite({ ...updatedSite, expenses: newExpenses })
    setEditingExpense(null)
  }

  const handleDeleteExpense = (index) => {
    const newExpenses = updatedSite.expenses.filter((_, i) => i !== index)
    setUpdatedSite({ ...updatedSite, expenses: newExpenses })
  }

  const handleSaveChanges = () => {
    onUpdate(updatedSite)
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5  w-full max-w-4xl shadow-lg rounded-md bg-white border-2 border-blue-200">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
          <FaTimes size={24} />
        </button>
        <div className="mt-3">
          <h2 className="text-3xl font-bold mb-4 text-center text-blue-900">{updatedSite.site_name}</h2>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-gray-100 p-4 rounded-lg border-2 border-blue-200">
              <h3 className="text-xl font-semibold mb-2 text-black">Site Information</h3>
              <p>
                <strong>PO No:</strong> {updatedSite.po_no}
              </p>
              <p>
                <strong>PO Amount:</strong> Rs.{updatedSite.po_amount.toFixed(2)}
              </p>
              <p>
                <strong>Payment Status:</strong> {updatedSite.payment_status}
              </p>
              <p>
                <strong>Project Status:</strong> {updatedSite.project_status}
              </p>
              <p>
                <strong>Deadline:</strong> {updatedSite.deadline} (
                <CountdownTimer deadline={updatedSite.deadline} />)
              </p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg border-2 border-blue-200">
              <h3 className="text-xl font-semibold mb-2 text-black">Financial Summary</h3>
              <p>
                <strong>Total Expenses:</strong> Rs.{calculateTotalExpenses().toFixed(2)}
              </p>
              <p>
                <strong>Profit:</strong> Rs.{calculateProfit().toFixed(2)}
              </p>
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2 text-black flex items-center">
              <FaClipboardList className="mr-2" /> Progress Updates
            </h3>
            {updatedSite.progress_updates.length > 0 ? (
              <ul className="list-disc pl-5">
                {updatedSite.progress_updates.map((update, index) => (
                  <li key={index} className="mb-2">
                    {editingProgress === index ? (
                      <div className="flex items-center">
                        <input
                          type="date"
                          value={update.date}
                          onChange={(e) => handleUpdateProgress(index, { ...update, date: e.target.value })}
                          className="mr-2 px-2 py-1 border rounded"
                        />
                        <input
                          type="text"
                          value={update.description}
                          onChange={(e) => handleUpdateProgress(index, { ...update, description: e.target.value })}
                          className="mr-2 px-2 py-1 border rounded flex-grow"
                        />
                        <button
                          onClick={() => setEditingProgress(null)}
                          className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <span>
                          <strong>{update.date}:</strong> {update.description}
                        </span>
                        <button
                          onClick={() => handleEditProgress(index)}
                          className="ml-2 text-blue-500 hover:text-blue-700"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDeleteProgress(index)}
                          className="ml-2 text-red-500 hover:text-red-700"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 italic">No progress updates yet.</p>
            )}
          </div>
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2 text-black flex items-center">
              <FaMoneyBillWave className="mr-2" /> Expenses
            </h3>
            {updatedSite.expenses.length > 0 ? (
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left">Date</th>
                    <th className="text-left">Description</th>
                    <th className="text-right">Amount</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {updatedSite.expenses.map((expense, index) => (
                    <tr key={index}>
                      {editingExpense === index ? (
                        <>
                          <td>
                            <input
                              type="date"
                              value={expense.date}
                              onChange={(e) => handleUpdateExpense(index, { ...expense, date: e.target.value })}
                              className="px-2 py-1 border rounded"
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              value={expense.description}
                              onChange={(e) => handleUpdateExpense(index, { ...expense, description: e.target.value })}
                              className="px-2 py-1 border rounded w-full"
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              value={expense.amount}
                              onChange={(e) =>
                                handleUpdateExpense(index, { ...expense, amount: Number(e.target.value) })
                              }
                              className="px-2 py-1 border rounded w-full text-right"
                            />
                          </td>
                          <td className="text-center">
                            <button
                              onClick={() => setEditingExpense(null)}
                              className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                            >
                              Save
                            </button>
                          </td>
                        </>
                      ) : (
                        <>
                          <td>{expense.date}</td>
                          <td>{expense.description}</td>
                          <td className="text-right">Rs.{expense.amount.toFixed(2)}</td>
                          <td className="text-center">
                            <button
                              onClick={() => handleEditExpense(index)}
                              className="text-blue-500 hover:text-blue-700 mr-2"
                            >
                              <FaEdit />
                            </button>
                            <button
                              onClick={() => handleDeleteExpense(index)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <FaTrash />
                            </button>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-gray-500 italic">No expenses recorded yet.</p>
            )}
          </div>
        </div>
        <div className="  mt-6 text-center">
          <button onClick={handleSaveChanges} className=" addbutton bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}

export default function SiteManagement() {
  const [sites, setSites] = useState([])
  const [isCreateSiteOpen, setIsCreateSiteOpen] = useState(false)
  const [currentSite, setCurrentSite] = useState(initialSiteState)
  const [editingSiteIndex, setEditingSiteIndex] = useState(null)
  const [isProgressFormOpen, setIsProgressFormOpen] = useState(false)
  const [isExpenseFormOpen, setIsExpenseFormOpen] = useState(false)
  const [progressDate, setProgressDate] = useState("")
  const [progressDescription, setProgressDescription] = useState("")
  const [expenseDate, setExpenseDate] = useState("")
  const [expenseDescription, setExpenseDescription] = useState("")
  const [expenseAmount, setExpenseAmount] = useState(0)
  const [showSiteDetails, setShowSiteDetails] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setCurrentSite((prev) => ({ ...prev, [name]: name === "po_amount" ? Number.parseFloat(value) : value }))
  }

  const handleCreateSite = () => {
    if (editingSiteIndex !== null) {
      const updatedSites = [...sites]
      updatedSites[editingSiteIndex] = currentSite
      setSites(updatedSites)
      setEditingSiteIndex(null)
    } else {
      setSites((prev) => [...prev, currentSite])
    }
    setIsCreateSiteOpen(false)
    setShowSiteDetails(true)
  }

  const handleEditSite = (index) => {
    setCurrentSite(sites[index])
    setEditingSiteIndex(index)
    setIsCreateSiteOpen(true)
  }

  const handleDeleteSite = (index) => {
    setSites((prev) => prev.filter((_, i) => i !== index))
  }

  const handleAddProgressUpdate = () => {
    if (progressDate && progressDescription) {
      const newProgressUpdate = { date: progressDate, description: progressDescription }
      const updatedSite = {
        ...currentSite,
        progress_updates: [...currentSite.progress_updates, newProgressUpdate],
      }
      updateSite(updatedSite)
      setCurrentSite(updatedSite)
      setProgressDate("")
      setProgressDescription("")
      setIsProgressFormOpen(false)
    } else {
      alert("Please fill in both date and description.")
    }
  }

  const handleAddExpense = () => {
    if (expenseDate && expenseDescription && expenseAmount > 0) {
      const newExpense = {
        date: expenseDate,
        description: expenseDescription,
        amount: Number.parseFloat(expenseAmount),
      }
      const updatedSite = {
        ...currentSite,
        expenses: [...currentSite.expenses, newExpense],
      }
      updateSite(updatedSite)
      setCurrentSite(updatedSite)
      setExpenseDate("")
      setExpenseDescription("")
      setExpenseAmount(0)
      setIsExpenseFormOpen(false)
    } else {
      alert("Please fill in all fields.")
    }
  }

  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    console.log("Selected file:", file)
    setCurrentSite({ ...currentSite, po_file: file })
  }

  const updateSite = (updatedSite) => {
    setSites((prevSites) => prevSites.map((site) => (site.po_no === updatedSite.po_no ? updatedSite : site)))
  }

  const filteredSites = sites.filter(
    (site) =>
      site.site_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      site.po_no.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => {
            setCurrentSite(initialSiteState)
            setIsCreateSiteOpen(true)
          }}
          className="addbutton bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center"
        >
          <FaPlus className="mr-2" /> Create Site
        </button>
        <div className="relative ">
          <input
            type="text"
            placeholder="Search sites..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border-2 border-blue-200 rounded-lg"
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Site Name</th>
              <th className="px-4 py-2 text-left">PO No</th>
              <th className="px-4 py-2 text-left">PO Amount</th>
              <th className="px-4 py-2 text-left">Deadline</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSites.map((site, index) => (
              <tr key={site.po_no} className="border-t">
                <td className="px-4 py-2">{site.site_name}</td>
                <td className="px-4 py-2">{site.po_no}</td>
                <td className="px-4 py-2">Rs.{site.po_amount}</td>
                <td className="px-4 py-2">
                  <CountdownTimer deadline={site.deadline} />
                </td>
                <td className="px-4 py-2">
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => handleEditSite(index)}
                      className="text-yellow-500 p-2 rounded hover:bg-yellow-200"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteSite(index)}
                      className="text-red-500 p-2 rounded hover:bg-red-200"
                    >
                      <FaTrash />
                    </button>
                    <button
                      onClick={() => {
                        setCurrentSite(site)
                        setShowSiteDetails(true)
                      }}
                      className="text-blue-500 p-2 rounded hover:bg-blue-200"
                    >
                      <FaEye />
                    </button>
                    <button
                      onClick={() => {
                        setCurrentSite(site)
                        setIsProgressFormOpen(true)
                      }}
                      className="text-orange-500 p-2 rounded hover:bg-orange-200"
                    >
                      <FaRegClipboard />
                    </button>
                    <button
                      onClick={() => {
                        setCurrentSite(site)
                        setIsExpenseFormOpen(true)
                      }}
                      className="text-green-500 p-2 rounded hover:bg-green-200"
                    >
                      <FaMoneyBillWave />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Site Creation / Editing Modal */}

      {isCreateSiteOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5  w-full max-w-md shadow-lg rounded-md bg-white border-2 border-blue-200">
            <div className="mt-3 text-center">
              <h3 className="text-xl leading-6 font-medium text-blue-900">
                {editingSiteIndex !== null ? "Edit Site" : "Create Site"}
              </h3>
              <div className="mt-2 px-7 py-3 space-y-1">
                {/* Site Name */}
                <label htmlFor="site_name" className="block text-md font-medium text-black text-left mt-2">
                  Site Name
                </label>
                <input
                  id="site_name"
                  type="text"
                  name="site_name"
                  value={currentSite.site_name}
                  onChange={handleInputChange}
                  placeholder="Site Name"
                  className="mt-2 px-3 py-2 bg-white border shadow-sm border-blue-200 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                />

                {/* PO Number */}
                <label htmlFor="po_no" className="block text-md font-medium text-black text-left mt-2">
                  PO Number
                </label>
                <input
                  id="po_no"
                  type="text"
                  name="po_no"
                  value={currentSite.po_no}
                  onChange={handleInputChange}
                  placeholder="PO No"
                  className="mt-2 px-3 py-2 bg-white border shadow-sm border-blue-200 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                />

                {/* PO Amount */}
                <label htmlFor="po_amount" className="block text-md font-medium text-black text-left mt-2">
                  PO Amount
                </label>
                <input
                  id="po_amount"
                  type="number"
                  name="po_amount"
                  value={currentSite.po_amount}
                  onChange={handleInputChange}
                  placeholder="PO Amount"
                  className="mt-2 px-3 py-2 bg-white border shadow-sm border-blue-200 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                />

                {/* PO File Upload */}
                <label htmlFor="po_file" className="block text-md font-medium text-black text-left mt-2">
                  PO File Upload
                </label>
                <input
                  id="po_file"
                  type="file"
                  name="po_file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  className="mt-2 px-3 py-2 bg-white border shadow-sm border-blue-200 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                />

                {/* Payment Status */}
                <label htmlFor="payment_status" className="block text-md font-medium text-black text-left mt-2">
                  Payment Status
                </label>
                <select
                  id="payment_status"
                  name="payment_status"
                  value={currentSite.payment_status}
                  onChange={handleInputChange}
                  className="mt-2 px-3 py-2 bg-white border shadow-sm border-blue-200 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                >
                  <option value="Pending">Pending</option>
                  <option value="Paid">Paid</option>
                </select>

                {/* Project Status */}
                <label htmlFor="project_status" className="block text-md font-medium text-black text-left mt-2">
                  Project Status
                </label>
                <select
                  id="project_status"
                  name="project_status"
                  value={currentSite.project_status}
                  onChange={handleInputChange}
                  className="mt-2 px-3 py-2 bg-white border shadow-sm border-blue-200 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                >
                  <option value="Planning">Planning</option>
                  <option value="Ongoing">Ongoing</option>
                  <option value="On Hold">On Hold</option>
                  <option value="Completed">Completed</option>
                </select>

                {/* Deadline */}
                <label htmlFor="deadline" className="block text-md font-medium text-black text-left mt-2">
                  Deadline
                </label>
                <input
                  id="deadline"
                  type="date"
                  name="deadline"
                  value={currentSite.deadline}
                  onChange={handleInputChange}
                  className="mt-2 px-3 py-2 bg-white border shadow-sm border-blue-200 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                />
              </div>

              {/* Buttons */}
              <div className="mt-5">
                <button
                  onClick={handleCreateSite}
                  className="addbutton mr-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-blue-600"
                >
                  {editingSiteIndex !== null ? "Update Site" : "Create Site"}
                </button>
                <button
                  onClick={() => setIsCreateSiteOpen(false)}
                  className="closebutton px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Progress Update Form */}

      {isProgressFormOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5  w-full max-w-md shadow-lg rounded-md bg-white border-2 border-blue-200">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-blue-900">Add Progress Update</h3>
              <div className="mt-2">
                <label htmlFor="enterdate"
                className="block text-md font-medium text-black text-left mt-2">
                  Enter Date</label>
                <input
                  type="date"
                  value={progressDate}
                  onChange={(e) => setProgressDate(e.target.value)}
                  className="mt-2 px-3 py-2 bg-white border shadow-sm border-blue-200 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                />
                <label htmlFor="enterprogress"
                className="block text-md font-medium text-black text-left mt-2">
                  Enter Progress Description
                </label>
                <textarea
                  value={progressDescription}
                  onChange={(e) => setProgressDescription(e.target.value)}
                  placeholder="Progress Description"
                  className="mt-2 px-3 py-2 bg-white border border-blue-200 shadow-sm  placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                />
              </div>
              <div className="mt-5">
                <button
                  onClick={handleAddProgressUpdate}
                  className="addbutton mr-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Add Progress
                </button>
                <button
                  onClick={() => setIsProgressFormOpen(false)}
                  className="closebutton px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Expense Form */}


      {isExpenseFormOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5  w-full max-w-md shadow-lg rounded-md bg-white border-2 border-blue-200">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-blue-900">Add Expense</h3>
              <div className="mt-2">
                <label htmlFor="enterdate"
                className="block text-md font-medium text-black text-left mt-2">
                  Enter Date
                </label>
                <input
                  type="date"
                  value={expenseDate}
                  onChange={(e) => setExpenseDate(e.target.value)}
                  className="mt-2 px-3 py-2 bg-white border shadow-sm border-blue-200 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                />
                <label htmlFor="expensDes"
                className="block text-md font-medium text-black text-left mt-2">
                  Enter Expense Description
                </label>
                <input
                  type="text"
                  value={expenseDescription}
                  onChange={(e) => setExpenseDescription(e.target.value)}
                  placeholder="Expense Description"
                  className="mt-2 px-3 py-2 bg-white border shadow-sm border-blue-200 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                />
                <label htmlFor="enteraount"
                className="block text-md font-medium text-black text-left mt-2">
                  Enter Amount
                </label>
                <input
                  type="number"
                  value={expenseAmount}
                  onChange={(e) => setExpenseAmount(Number(e.target.value))}
                  placeholder="Amount"
                  className="mt-2 px-3 py-2 bg-white border shadow-sm border-blue-200 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                />
              </div>
              <div className="mt-5">
                <button
                  onClick={handleAddExpense}
                  className="addbutton mr-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Add Expense
                </button>
                <button
                  onClick={() => setIsExpenseFormOpen(false)}
                  className="closebutton px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Site Details Modal */}
      {showSiteDetails && (
        <SiteDetails
          site={currentSite}
          onClose={() => setShowSiteDetails(false)}
          onUpdate={(updatedSite) => {
            updateSite(updatedSite)
            setShowSiteDetails(false)
          }}
        />
      )}
    </div>
  )
}