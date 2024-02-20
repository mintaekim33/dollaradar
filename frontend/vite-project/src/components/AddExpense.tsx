import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { submitExpense } from "../service/expenses";

// define structure for FormData type
// interface FormData {
//   date?: string;
//   category?: string;
//   paymentMethod?: string;
//   amount?: number;
//   note?: string;
// }

function AddExpense(props: any) {
  const {
    formData,
    setFormData,
    expenses,
    setExpenses,
    events,
    setEvents,
    ...rest
  } = props;

  /**moved to app
   * 
  const splitDate = new Date().toLocaleDateString().split("/"); // "dd/MM/yyyy"
  const formattedDate = `${splitDate[2]}-${splitDate[1]}-${splitDate[0]}`; // "yyyy-MM-dd"

  const [formData, setFormData] = useState<FormData>({
    // date: new Date().toISOString().split("T")[0], // Get today's date in 'YYYY-MM-DD' format
    date: formattedDate, // Get today's date in 'YYYY-MM-DD' format
  });
   * 
   * 
   *  */

  // console.log("FOrm data, ", formData.date);
  // console.log("FOrmatted date, ", formattedDate);

  async function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();
    console.log("ADD BUTTON");

    try {
      const response = await submitExpense(formData);
      // Upon successful submission, update local state with the newly created expense
      // const newExpense = response; // Assuming the response contains the newly created expense object
      // console.log("NEW expense: ", newExpense);
      setExpenses((prevExpenses: any) => [...prevExpenses, response]);

      console.log("form response: ", response);
    } catch (e) {
      console.log("Error submitting", e);
    }
    // close modal
    rest.onHide();
    // clear amount
    setFormData({
      ...formData,
      amount: 0,
    });

    // Add expense record
    const fullCalendarApi = rest.calendar.current.getApi();
    const expense = {
      title: formData.amount,
      start: formData.date, // Set the start time of the event
      allDay: true, // Set to true if the event lasts all day
    };
    fullCalendarApi.addEvent(expense); // Add the event to the calendar

    // Update events state using the callback version of setEvents
    setEvents((prevEvents: any) => {
      const updatedEvents = [...prevEvents, expense];
      // Save updated events to localStorage
      localStorage.setItem("calendarEvents", JSON.stringify(updatedEvents));
      console.log("Updated events : ", updatedEvents);
      return updatedEvents;
    });

    console.log("FORM DATA: ", formData);
    console.log("EXPENSE DATA: ", expenses);
  }

  return (
    <Modal
      {...rest}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add an expense
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

          <label className="text-gray-700">Category</label>
          <select
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            value={formData.category || ""}
            onChange={(e) => {
              setFormData({
                ...formData,
                category: e.target.value,
              });
              console.log("category: ", formData.category);
            }}
          >
            <option>work</option>
            <option>home</option>
            <option>fun</option>
          </select>

          <label className="text-gray-700">Payment Method</label>
          <select
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            value={formData.paymentMethod || ""}
            onChange={(e) => {
              setFormData({
                ...formData,
                paymentMethod: e.target.value,
              });
            }}
          >
            <option>Cash</option>
            <option>credit card</option>
            <option>paylah</option>
            <option>paynow</option>
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
            // onClick={props.onHide}
          >
            Submit
          </button>
        </form>
      </Modal.Body>
      {/* <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer> */}
    </Modal>
  );
}

export default AddExpense;
