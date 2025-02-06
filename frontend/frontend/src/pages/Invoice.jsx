import React, { useState, useCallback, useEffect } from "react"
import { FaPlus, FaTrash, FaPrint, FaFileInvoiceDollar } from "react-icons/fa"
import { MdDateRange, MdLocationOn } from "react-icons/md"
import { BsFileEarmarkText, BsBuilding } from "react-icons/bs"

const Invoice = () => {
  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: "",
    invoiceDate: "",
    clientAddress: "",
    siteName: "",
    poNo: "",
    sdnNo: "",
    items: [{ itemNo: "1", description: "", qty: 1, unitPrice: 0, total: 0 }],
    secondPaymentPercentage: 10,
    secondPaymentAmount: 0,
    grandTotal: 0,
  })

  const [previewVisible, setPreviewVisible] = useState(false)

  const calculateTotals = useCallback(() => {
    const itemsTotal = invoiceData.items.reduce((sum, item) => sum + item.total, 0)
    const secondPaymentAmount = (itemsTotal * invoiceData.secondPaymentPercentage) / 100
    const grandTotal = itemsTotal - secondPaymentAmount
    return { secondPaymentAmount, grandTotal }
  }, [invoiceData.secondPaymentPercentage])

  const handleInputChange = (e) => {
    const { id, value } = e.target
    setInvoiceData((prev) => ({ ...prev, [id]: value }))
  }

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...invoiceData.items]
    updatedItems[index] = { ...updatedItems[index], [field]: value }
    if (field === "qty" || field === "unitPrice") {
      updatedItems[index].total = updatedItems[index].qty * updatedItems[index].unitPrice
    }
    const newInvoiceData = { ...invoiceData, items: updatedItems }
    const { secondPaymentAmount, grandTotal } = calculateTotals()
    setInvoiceData({ ...newInvoiceData, secondPaymentAmount, grandTotal })
  }

  const addItem = () => {
    setInvoiceData((prev) => {
      const newItems = [
        ...prev.items,
        { itemNo: `${prev.items.length + 1}`, description: "", qty: 1, unitPrice: 0, total: 0 },
      ]
      const { secondPaymentAmount, grandTotal } = calculateTotals()
      return { ...prev, items: newItems, secondPaymentAmount, grandTotal }
    })
  }

  const removeItem = (index) => {
    setInvoiceData((prev) => {
      const newItems = prev.items.filter((_, i) => i !== index)
      const { secondPaymentAmount, grandTotal } = calculateTotals()
      return { ...prev, items: newItems, secondPaymentAmount, grandTotal }
    })
  }

  const generateInvoice = () => {
    const { secondPaymentAmount, grandTotal } = calculateTotals()
    setInvoiceData((prev) => ({ ...prev, secondPaymentAmount, grandTotal }))
    setPreviewVisible(true)
  }

  const printInvoice = useCallback(() => {
    window.print()
  }, [])

  useEffect(() => {
    const { secondPaymentAmount, grandTotal } = calculateTotals()
    setInvoiceData((prev) => ({ ...prev, secondPaymentAmount, grandTotal }))
  }, [calculateTotals, invoiceData.secondPaymentPercentage])

  return (
    <div className="container mx-auto mt-5 p-6 bg-white">
      <div className="text-center mb-4 no-print">
        <h1 className="text-3xl font-bold flex items-center justify-center text-blue-800">
          <FaFileInvoiceDollar className="mr-2" />
          Invoice Generator
        </h1>
      </div>

      <form className="space-y-4 no-print">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* TO Section */}
          <div className="md:row-span-3">
            <div className="border-2 border-blue-200 rounded-lg p-4 bg-white shadow-sm">
              <label htmlFor="clientAddress" className="block text-lg font-medium text-blue-800 mb-2">
                <BsBuilding className="inline mr-2" />
                TO
              </label>
              <textarea
                id="clientAddress"
                rows={8}
                className="w-full rounded-md border-blue-200 shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                placeholder="Enter client address"
                value={invoiceData.clientAddress}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="border-2 border-blue-200 rounded-lg p-4 bg-white shadow-sm">
                <label htmlFor="invoiceNumber" className="block text-sm font-medium text-blue-800">
                  <BsFileEarmarkText className="inline mr-2" />
                  Invoice Number
                </label>
                <input
                  type="text"
                  id="invoiceNumber"
                  className="mt-1 block h-9 w-full rounded-md border-blue-200 shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  value={invoiceData.invoiceNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="border-2 border-blue-200 rounded-lg p-4 bg-white shadow-sm">
                <label htmlFor="invoiceDate" className="block text-sm font-medium text-blue-800">
                  <MdDateRange className="inline mr-2" />
                  Invoice Date
                </label>
                <input
                  type="date"
                  id="invoiceDate"
                  className="mt-1 block h-9 w-full rounded-md border-blue-200 shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  value={invoiceData.invoiceDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="border-2 border-blue-200 rounded-lg p-4 bg-white shadow-sm">
                <label htmlFor="siteName" className="block text-sm font-medium text-blue-800">
                  <MdLocationOn className="inline mr-2" />
                  Site Name
                </label>
                <input
                  type="text"
                  id="siteName"
                  className="mt-1 block h-9 w-full rounded-md border-blue-200 shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  value={invoiceData.siteName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="border-2 border-blue-200 rounded-lg p-4 bg-white shadow-sm">
                <label htmlFor="poNo" className="block text-sm font-medium text-blue-800">
                  <BsFileEarmarkText className="inline mr-2" />
                  PO No
                </label>
                <input
                  type="text"
                  id="poNo"
                  className="mt-1 block h-9 w-full rounded-md border-blue-200 shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  value={invoiceData.poNo}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="border-2 border-blue-200 rounded-lg p-4 bg-white shadow-sm">
                <label htmlFor="sdnNo" className="block text-sm font-medium text-blue-800">
                  <BsFileEarmarkText className="inline mr-2" />
                  SDN No
                </label>
                <input
                  type="text"
                  id="sdnNo"
                  className="mt-1 block h-9 w-full rounded-md border-blue-200 shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  value={invoiceData.sdnNo}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="border-2 border-blue-200 rounded-lg p-4 bg-white shadow-sm">
          <h4 className="text-lg font-semibold text-blue-800 mb-4">Items</h4>
          {invoiceData.items.map((item, index) => (
            <div key={index} className="grid grid-cols-12 gap-2 items-center mb-2">
              <div className="col-span-1">
                <label className="text-gray-600"
                htmlFor="itemno">Item NO</label>
                <input
                  type="text"
                  className="w-full h-9 text-center rounded-md border-blue-200 shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  placeholder="Item No"
                  value={item.itemNo}
                  onChange={(e) => handleItemChange(index, "itemNo", e.target.value)}
                  required
                />
              </div>
              <div className="col-span-5">
                <label htmlFor="des"
                className="text-gray-600"
                >Description</label>
                <input
                  type="text"
                  className="w-full h-9 rounded-md border-blue-200 shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  placeholder="Description"
                  value={item.description}
                  onChange={(e) => handleItemChange(index, "description", e.target.value)}
                  required
                />
              </div>
              <div className="col-span-2">
                <label htmlFor="quantity"
                className="text-gray-600"
                >quantity</label>
                <input
                  type="number"
                  className="w-full h-9 text-center rounded-md border-blue-200 shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  placeholder="Qty"
                  min="1"
                  value={item.qty}
                  onChange={(e) => handleItemChange(index, "qty", Number.parseInt(e.target.value, 10))}
                  required
                />
              </div>
              <div className="col-span-2">
                <label htmlFor="unit price"
                className="text-gray-600"
                >Unit Price</label>
                <input
                  type="number"
                  className="w-full h-9 text-center rounded-md border-blue-200 shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  placeholder="Unit Price"
                  step="0.01"
                  value={item.unitPrice}
                  onChange={(e) => handleItemChange(index, "unitPrice", Number.parseFloat(e.target.value))}
                  required
                />
              </div>
              <div className="col-span-1">
                <label htmlFor="total"
                className="text-gray-600"
                >Total</label>
                <input
                  type="number"
                  className="w-full h-9 text-center rounded-md border-blue-200 shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  placeholder="Total"
                  value={item.total.toFixed(2)}
                  readOnly
                />
              </div>
              <div className="col-span-1 text-center">
                <button
                  type="button"
                  className="text-red-600 hover:text-red-800"
                  onClick={() => removeItem(index)}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
          <div className="text-center mt-4">
            <button
              type="button"
              className="addbutton bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
              onClick={addItem}
            >
              <FaPlus className="mr-2" />
              Add Item
            </button>
          </div>
        </div>

        <div className="border-2 border-blue-200 rounded-lg p-4 bg-white shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="secondPaymentPercentage" className="block text-sm font-medium text-blue-800">
                claim Payment(%)
              </label>
              <input
                type="number"
                id="secondPaymentPercentage"
                className="mt-1 block w-full rounded-md border-blue-200 shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                placeholder="Enter percentage"
                step="0.01"
                value={invoiceData.secondPaymentPercentage}
                onChange={(e) => {
                  const newPercentage = Number.parseFloat(e.target.value)
                  setInvoiceData((prev) => ({
                    ...prev,
                    secondPaymentPercentage: newPercentage,
                  }))
                }}
              />
            </div>
            <div>
              <label htmlFor="secondPaymentAmount" className="block text-sm font-medium text-blue-800">
                claim Payment Amount
              </label>
              <input
                type="text"
                id="secondPaymentAmount"
                className="mt-1 block w-full rounded-md border-blue-200 shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                value={invoiceData.secondPaymentAmount.toFixed(2)}
                readOnly
              />
            </div>
            <div>
              <label htmlFor="grandTotal" className="block text-sm font-medium text-blue-800">
                Grand Total
              </label>
              <input
                type="text"
                id="grandTotal"
                className="mt-1 block w-full rounded-md border-blue-200 shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                value={invoiceData.grandTotal.toFixed(2)}
                readOnly
              />
            </div>
          </div>
        </div>

        <div className="text-center">
          <button
            type="button"
            className="additembutton bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={generateInvoice}
          >
            Generate Invoice
          </button>
        </div>
      </form>

      {previewVisible && (
        <div className="mt-8 print-break-inside-avoid">
          <h3 className="text-2xl font-bold text-center text-blue-800 mb-4 no-print">Invoice Preview</h3>
          <hr className="my-4 border-blue-200 no-print" />
          <div className="bg-white p-6 rounded-lg shadow-md border-2 border-blue-200">
            
            {/*details*/}

            
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-blue-800">SS Group</h2>
              <p className="text-gray-600">123 Business Street, City, Country</p>
              <p className="text-gray-600">Tel: 12345678 | Email: info@ssgroup.com</p>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div>
                <h4 className="text-lg font-semibold mb-2">TO:</h4>
                <p className="whitespace-pre-line">{invoiceData.clientAddress}</p>
              </div>
              <div>
                <p><strong>Invoice Number:</strong> {invoiceData.invoiceNumber}</p>
                <p><strong>Invoice Date:</strong> {invoiceData.invoiceDate}</p>
                <p><strong>Site Name:</strong> {invoiceData.siteName}</p>
                <p><strong>PO No:</strong> {invoiceData.poNo}</p>
                <p><strong>SDN No:</strong> {invoiceData.sdnNo}</p>
              </div>
            </div>
            <table className="w-full mb-8">
              <thead className="bg-blue-50">
                <tr>
                  <th className="px-4 py-2 border-2 border-blue-200 text-blue-800">Item No</th>
                  <th className="px-4 py-2 border-2 border-blue-200 text-blue-800">Description</th>
                  <th className="px-4 py-2 border-2 border-blue-200 text-blue-800">Qty</th>
                  <th className="px-4 py-2 border-2 border-blue-200 text-blue-800">Unit Price</th>
                  <th className="px-4 py-2 border-2 border-blue-200 text-blue-800">Total</th>
                </tr>
              </thead>
              <tbody>
                {invoiceData.items.map((item, index) => (
                  <tr key={index}>
                    <td className="border-2 border-blue-200 px-4 py-2">{item.itemNo}</td>
                    <td className="border-2 border-blue-200 px-4 py-2">{item.description}</td>
                    <td className="border-2 border-blue-200 px-4 py-2">{item.qty}</td>
                    <td className="border-2 border-blue-200 px-4 py-2">Rs.{item.unitPrice.toFixed(2)}</td>
                    <td className="border-2 border-blue-200 px-4 py-2">Rs.{item.total.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4">
              <p><strong>Second Payment ({invoiceData.secondPaymentPercentage}%):</strong> Rs.{invoiceData.secondPaymentAmount.toFixed(2)}</p>
              <p><strong>Grand Total:</strong> Rs.{invoiceData.grandTotal.toFixed(2)}</p>
            </div>
            <div className="mt-8 text-sm text-gray-600">
              <h4 className="font-bold text-blue-800 mb-2">Terms and Conditions:</h4>
              <ol className="list-decimal list-inside space-y-1">
                <li>Payment is due within 30 days</li>
                <li>Please include invoice number on your payment</li>
                <li>Make all checks payable to SS Group</li>
              </ol>
            </div>
          </div>
          <div className="text-center mt-4 no-print">
            <button
              className="addbutton bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
              onClick={printInvoice}
            >
              <FaPrint className="mr-2" />
              Print Invoice
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Invoice
