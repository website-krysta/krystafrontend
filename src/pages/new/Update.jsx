import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
// import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useNavigate,useParams,Link } from 'react-router-dom';



const Edituser = ({   inputs, title }) => {
  const navigate = useNavigate();
  const { userId } = useParams();

  const [userData, setUserdata] = useState({
        
        UserID: '',
        EmailID: '',
        Password: '',
        Role: '',
        UserStatus: true,
        ConfirmPassword:''
})
const handleChange = (event) => {
  setUserdata({
    ...userData,
    [event.target.name]: event.target.value
  });
};
const getUserdata = async ()=>{
    try{
     debugger
     let res = await axios.get(`api/userget/${userId}/`);
     setUserdata(res.data)
    
    }
    catch(error){
     console.log(error)
    }
 }

const handlUpdateuser = async (event) => {
    event.preventDefault();
        try{
          debugger;
          if (userData.Password !== userData.ConfirmPassword) {
            alert('Passwords do not match!');
          } else {
            let res = await axios.post(`api/userupdate/${userId}/`,userData );
            navigate('/users')
            alert('User information updated successfully.')
        }
      }
        catch(error){
            alert('Oops! Unable to update user information. Please check the provided details and try again later.')
        }
    };


useEffect (()=>{
    getUserdata();
    handlUpdateuser();
    
},{})

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top d-flex justify-content-between align-items-center ">
           <h1>Edit user </h1>
           <Link to="/users" className="link">
              <button className="btn btn-warning">
              Back
              </button>
          </Link>

        </div>
        <div className="bottom">
         
          <div className="right">
            <form>
            <div class="row">
              <div className="formInput">
              <label for="role">User Name</label>
              <input type="text" name="EmailID" value={userData.EmailID} onChange={handleChange} placeholder="user name"/>
              </div>
              <div className="formInput">
              <label for="role">User Role</label>
                  <select id="role"  name="Role" value={userData.Role} onChange={handleChange}>
                    <option value="admin">admin</option>
                    <option value="user">User</option>
                  </select>
              </div>
              <div className="formInput pt-5">
              <label for="role">Password</label>
              <input type="password" name="Password" value={userData.Password} onChange={handleChange} placeholder="password"/>
              </div>
              <div className="formInput pt-5">
              <label for="role">Confirm Password </label>
              <input type="password" name="ConfirmPassword"  onChange={handleChange} placeholder="Confirm Password"/>
              </div><br/>
              <div className="pt-5">
              <button onClick={handlUpdateuser} >Update</button>
              </div>
            </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edituser;
