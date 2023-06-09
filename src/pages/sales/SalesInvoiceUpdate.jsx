
import '../products/addproduct.css' 
import "../labour/labour.css"
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import {useParams, useNavigate } from 'react-router-dom';


const SalesInvoiceUpdate = () => {

 const navigate = useNavigate();
 const { invoiceid } = useParams();
 
  // start main function
  const [invoiceData, setinvoiceData] = useState({
    InvoiceID :0,
    InvoiceNumber :'',
    InwardNumber  :'',
    InvoiceDate :'',
    RecievedDate :'',
    VendorID :'',
    AddedTimeStamp :'',
    updatedTimeStamp :'',
  });
  
  const handleChange = (event) => {
    setinvoiceData({
      ...invoiceData,
      [event.target.name]: event.target.value
    });
  };
  
  
  const handlUpedateInvoice= async (event) => {
    event.preventDefault();

    try{
        debugger
        let res = await axios.post('api/salesInvoiceupdate/',invoiceData );
        debugger;
        const jsonString = JSON.stringify(res.data);
        navigate('/sales/');
        alert("Sucessfully update Sales invoice Record")
    }
    catch(error){
        alert("Oops! Unable to Update Sales invoice. Please check the provided details and try again later.")
    }
  }
  
  // get invoice data based on id  form data
//   const [inoiceData, setInvoiceData] = useState([]);
  const getinvoiceData = async ()=>{
    try{
        debugger
     let res = await  axios.get(`api/salesinvoice/${invoiceid}/`);
     setinvoiceData(res.data)
    }
    catch(error){
     console.log(error)
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
    axios.get(`/api/vendor/${invoiceData.VendorID}/`)
    .then((res)=>{
        setvendorData(res.data)
    }).catch((error)=>{
        console.log(error)
    })
  }, [invoiceData.VendorID]);
    
  
  useEffect (()=>{
    handlUpedateInvoice();
    getvendordata();
    getinvoiceData();

  },{})

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="bottom" >
          <div className="right" >
            <div className="row invoice_sales_list">
              <div className="datatable">
                <div className="datatableTitle">
                Update Invoice
                </div>
                <div>
                  <form className="labourform ">
                    <div class="row ">
                      <div className="col-md-6">
                        <h1 className="text-center text-primary pt-4"></h1>
                        <label>Vendor Name</label>
                        <div class="input-group mb-3">
                            <select class="form-select" name="VendorID" value={invoiceData.VendorID} onChange={handleChange} id="inputGroupSelect04" aria-label="Example select with button addon" disabled>
                            <option >--- select vendor ---</option>
                            {voptions.map((voption) => (
                                <option key={voption.VendorID} value={voption.VendorID}>{voption.VendorName}</option>
                              ))}
                            </select>
                          </div>
                    
                        <div className="col-md-12">
                        <div className="formInput1 mb-3 mt-4">
                            <label>Inward Number</label>
                            <input type="text" value={invoiceData.InwardNumber} name="InwardNumber" onChange={handleChange} className="form-control" id="InvoiceNumber" placeholder="Invoice Number" disabled />
                          </div>
                          <div className="formInput1 mb-3 mt-4">
                            <label> Invoice Number</label>
                            <input type="text" value={invoiceData.InvoiceNumber} name="InvoiceNumber" onChange={handleChange} className="form-control" id="InvoiceNumber" placeholder="Invoice Number" disabled />
                          </div>
                         

                          <div className="formInput1 mb-3">
                          <label>Invoice Date</label>
                            <input type="date" value={invoiceData.InvoiceDate} name="InvoiceDate" onChange={handleChange} className="form-control" id="InvoiceDate" placeholder="Invoice Date"  disabled />
                          </div>
                          <div className="mb-3">
                          <label>Recieved Date</label>
                            <input type="date" value={invoiceData.RecievedDate} name="RecievedDate" onChange={handleChange} className="form-control" id="RecievedDate" placeholder="RecievedDate" required />
                          </div>
                          <div className="">
                            <button onClick={handlUpedateInvoice} >Update Invoice</button>
                          </div>

                        </div>
                      </div>
                      <div className="col-md-6 showvendor_info">
                     
                        <div className="formInput1 mb-3 mt-4 ">
                        <label>Vendor Code</label>
                          <input type="text" value={vendorData.VendorCode} name="VendorCode" onChange={handleChange} className="form-control " id="code" placeholder="vendor code" required />
                        </div>
                        <div className="formInput1 mb-3">
                        <label>Vendor VendorName</label>
                          <input type="text" value={vendorData.VendorName} name="VendorName" onChange={handleChange} className="form-control " id="name" placeholder="Name" required />
                        </div>
                        <div className="mb-3">
                        <label>Vendor EmailID</label>
                          <input type="email" value={vendorData.EmailID} name="EmailID" onChange={handleChange} className="form-control " id="email1" placeholder="Email" required />
                        </div>
                        <div className="mb-3">
                        <label>Vendor Code</label>
                          <input type="Phone" value={vendorData.Phone} name="Phone" onChange={handleChange} className="form-control " id="exampleInputphone" placeholder="Phone" required />
                        </div>
                        <div className="mb-3">
                        <label>Vendor RegisteredName</label>
                          <input type="text" value={vendorData.RegisteredName} name="RegisteredName" onChange={handleChange} className="form-control " id="RegisteredName" placeholder="RegisteredName" required />
                        </div>
                        <div className="mb-3">
                        <label>Vendor Address</label>
                          <input type="text" value={vendorData.Address} name="Address" onChange={handleChange} className="form-control " id="exampleInputaddress" placeholder="Address" required />
                        </div>
                        <div className="mb-3">
                        <label>Vendor City</label>
                          <input type="text" value={vendorData.City} name="City" onChange={handleChange} className="form-control " id="city" placeholder="City" required />
                        </div>
                        <div className="mb-3">
                        <label>Vendor State</label>
                          <input type="text" value={vendorData.State} name="State" onChange={handleChange} className="form-control " id="examplestate" placeholder="State" required />
                        </div>
                        <div className="mb-3">
                        <label>Vendor Zip</label>
                          <input type="text" value={vendorData.Zip} name="Zip" onChange={handleChange} className="form-control " id="Zip" placeholder="Zip Code" required />
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

export default SalesInvoiceUpdate;
