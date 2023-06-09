import "./productlist.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Invoice from "../../pages/invoiceData/Invoice"
const InvoiceDatalist = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <Invoice/>

      </div>
    </div>
  )
}

export default InvoiceDatalist;