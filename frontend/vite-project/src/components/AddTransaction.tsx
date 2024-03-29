import Modal from "react-bootstrap/Modal";
import { submitTransaction } from "../service/transactions";

function AddTransaction(props: any) {
  const {
    formData,
    setFormData,
    transactions,
    setTransactions,
    formattedDate,
    userId,
    ...rest
  } = props;

  async function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();

    try {
      const response = await submitTransaction(formData);
      // Upon successful submission, update local state with the newly created transaction
      setTransactions((prevTransactions: any) => [
        ...prevTransactions,
        response,
      ]);
    } catch (e) {
      console.error("Error submitting", e);
    }
    // close modal
    rest.onHide();
    // clear form
    setFormData({
      ...formData,

      date: formattedDate,
      type: "",
      category: "",
      amount: 0,
      note: "",
    });
  }

  return (
    <Modal
      {...rest}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add a transaction
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form
          className="flex flex-col w-full max-w-sm mx-auto space-y-4 p-4 bg-white shadow-md rounded-md"
          onSubmit={handleSubmit}
        >
          <label className="text-gray-700">Date</label>
          <input
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            type="date"
            value={formData.date} // controlled by defining the state right from the start
            placeholder="Today"
            required
            onChange={(e) => {
              setFormData({
                ...formData,
                date: e.target.value,
              });
            }}
          />

          <label className="text-gray-700">Type</label>
          <select
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            value={formData.type || ""}
            required
            onChange={(e) => {
              setFormData({
                ...formData,
                type: e.target.value,
                category: "",
              });
            }}
          >
            <option value="" disabled>
              Select a type
            </option>
            <option>Expense</option>
            <option>Income</option>
          </select>

          <label className="text-gray-700">Category</label>
          <select
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            value={formData.category || ""}
            required
            onChange={(e) => {
              setFormData({
                ...formData,
                category: e.target.value,
              });
            }}
          >
            {formData.type === "Income" ? (
              <>
                <option value="" disabled>
                  Select a category
                </option>
                <option>Salary</option>
                <option>Investment</option>
                <option>Part-Time</option>
              </>
            ) : (
              <>
                <option value="" disabled>
                  Select a category
                </option>
                <option>Food</option>
                <option>Shopping</option>
                <option>Entertainment</option>
                <option>Transport</option>
                <option>Utilities</option>
              </>
            )}
          </select>

          <label className="text-gray-700">Amount</label>
          <input
            type="number"
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            value={formData.amount || ""}
            required
            autoFocus
            min="0"
            step=".01"
            onChange={(e) => {
              // const inputValue = e.target.value;
              // if (/^\d*\.?\d*$/.test(inputValue)) {
              setFormData({
                ...formData,
                amount: parseFloat(parseFloat(e.target.value).toFixed(2)), // toFixed returns a string
              });

              // }
            }}
          />

          <label className="text-gray-700">Note</label>
          <input
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            value={formData.note || ""}
            onChange={(e) => {
              setFormData({
                ...formData,
                note: e.target.value,
              });
            }}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            type="submit"
          >
            Add
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default AddTransaction;
