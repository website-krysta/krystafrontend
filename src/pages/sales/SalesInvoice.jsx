// import "../products/productlist.scss";
import '../products/addproduct.css' 
import "../labour/labour.css"
// import "./invoice.css"
import Newvendor from "../products/Newvendor"
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { Link, useNavigate } from 'react-router-dom';


const SalesInvoice = () => {

 const navigate = useNavigate();

  //  start main function
  const [invoiceData, setinvoiceData] = useState({
    InvoiceID :0,
    InvoiceNumber :'',
    BatchNo:'',
    InwardNumber  :'',
    InvoiceDate :'',
    RecievedDate :'',
    VendorID :'',
    AddedTimeStamp :'',
    UpdatedTimeStamp :'',
  });
  
  const handleChange = (event) => {
    setinvoiceData({
      ...invoiceData,
      [event.target.name]: event.target.value
    });
  };
  
  
  const handlAddInvoice= async (event) => {
    event.preventDefault();

    try{
      debugger;
      let res = await axios.post('api/salesinvoice/add/',invoiceData );
      if (res.status === 226) {
        alert('Sales Invoice number already exists');
      } else {
        navigate('/sales/Productsale', { state: { data: res.data } });
        alert('Successfully added new sales invoice record');
      }
    }
    catch(error){
        alert("Oops! Unable to create Sales Invoice. Please check the provided details and try again later.")
    }
  }
  

  // get vendor form data
const [voptions, setvOptions] = useState([]);
const getvendordata = async ()=>{
  try{
   let res = await  axios.get('/api/vendor/list/');
   setvOptions(res.data)
  }
  catch(error){
   console.log(error)
  }
}
 
  

const vid = invoiceData.VendorID
const [vendorData, setvendorData] = useState({})
useEffect(() => {
    axios.get(`/api/vendor/${vid}/`)
    .then((res)=>{
        setvendorData(res.data)
    }).catch((error)=>{
        console.log(error)
    })
  }, [vid]);
  
  useEffect (()=>{
    handlAddInvoice();
    getvendordata();
  },{})

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="bottom" >
          <div className="right" >
            <div className="row">
              <div className="datatable">
                <div className="datatableTitle formtitle">
                 Sales Invoice 
                </div>
                <div>
                  <form className="labourform invoice_sales_list">
                    <div class="row">
                      <div className="col-md-6">
                        <h1 className="text-center text-primary pt-3"></h1>
                        <div class="input-group">
                            <select class="form-select" name="VendorID" value={invoiceData.VendorID} onChange={handleChange} id="inputGroupSelect04" aria-label="Example select with button addon">
                            <option >--- select vendor ---</option>
                            {voptions.map((voption) => (
                                <option key={voption.VendorID} value={voption.VendorID}>{voption.VendorName}</option>
                              ))}
                            </select>
                            <div class="input-group-append">
                              <Newvendor />
                            </div>
                          </div>
                        <div className="col-md-12">
                          <div className="formInput1 mb-3 mt-2">
                            <label> Invoice Number</label>
                            <input type="text" name="InvoiceNumber" onChange={handleChange}  className="form-control pt-3" id="InvoiceNumber" placeholder="Invoice Number" required />
                          </div>
                          <div className="col-12 mb-3">
                          <label>Batch Number</label>
                            <input type="text" name="BatchNo"  onChange={handleChange} className="form-control pt-3" placeholder="Batch no" />
                          </div>
                          <div className="formInput1 mb-3">
                          <label>Invoice Date</label>
                            <input type="date" name="InvoiceDate" onChange={handleChange} className="form-control pt-3" id="InvoiceDate" placeholder="Invoice Date" required />
                          </div>
                          <div className="mb-3">
                          <label>Recieved Date</label>
                            <input type="date" name="RecievedDate" onChange={handleChange} className="form-control pt-3" id="RecievedDate" placeholder="RecievedDate" required />
                          </div>
                          <div className="">
                            <button onClick={handlAddInvoice} >Add Invoice</button>
                          </div>

                        </div>
                      </div>
                      <div className="col-md-6">
                     
                        <div className="formInput1 mb-3 mt-4">
                          <input type="text" value={vendorData.VendorCode} name="VendorCode" onChange={handleChange} className="form-control pt-3" id="code" placeholder="vendor code" required />
                        </div>
                        <div className="formInput1 mb-3">
                          <input type="text" value={vendorData.VendorName} name="VendorName" onChange={handleChange} className="form-control pt-3" id="name" placeholder="Name" required />
                        </div>
                        <div className="mb-3">
                          <input type="email" value={vendorData.EmailID} name="EmailID" onChange={handleChange} className="form-control pt-3" id="email1" placeholder="Email" required />
                        </div>
                        <div className="mb-3">
                          <input type="phone" value={vendorData.Phone} name="Phone" onChange={handleChange} className="form-control pt-3" id="exampleInputphone" placeholder="Phone" required />
                        </div>
                        <div className="mb-3">
                          <input type="text" value={vendorData.RegisteredName} name="RegisteredName" onChange={handleChange} className="form-control pt-3" id="RegisteredName" placeholder="RegisteredName" required />
                        </div>
                        <div className="mb-3">
                          <input type="text" value={vendorData.Address} name="Address" onChange={handleChange} className="form-control pt-3" id="exampleInputaddress" placeholder="Address" required />
                        </div>
                        <div className="mb-3">
                          <input type="text" value={vendorData.City} name="City" onChange={handleChange} className="form-control pt-3" id="city" placeholder="City" required />
                        </div>
                        <div className="mb-3">
                          <input type="text" value={vendorData.State} name="State" onChange={handleChange} className="form-control pt-3" id="examplestate" placeholder="State" required />
                        </div>
                        <div className="mb-3">
                          <input type="text" value={vendorData.Zip} name="Zip" onChange={handleChange} className="form-control pt-3" id="Zip" placeholder="Zip Code" required />
                        </div>

                        
                      </div>
                    </div>
                  </form>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
     
  );
};

export default SalesInvoice;
