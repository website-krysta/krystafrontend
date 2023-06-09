import "./datatable.scss";
import CreateIcon from '@mui/icons-material/Create';
import PreviewIcon from '@mui/icons-material/Preview';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useNavigate } from 'react-router-dom';


const Datatable = () => {

  const navigate = useNavigate();
  let [mydata , setmydata] = useState([]);
  const getApidata = async ()=>{
     try{
      
      let res = await axios.get('/api/user/');
      setmydata(res.data)
      console.log(mydata )
     }
     catch(error){
      console.log(error)
     }
  }
  const handleuserDelete =  async(id) => {
   
     try{
      const confirmed = window.confirm('Are you sure you want to delete this user?');
        if (confirmed) { 
          await axios.post(`/api/deleteuser/${id}/`)
        const updateuser = mydata.filter(user => user.UserID !== id);
        setmydata(updateuser);
        } 
     }
     catch(error){
      console.log(error);
      
     }
   
  
  };

// delet record 



useEffect(() =>{
  getApidata();
 
},{});

const userData = JSON.parse(localStorage.getItem('userData'));
let Role = 'user'
  return (
    <div className="datatable">
      <div className="datatableTitle">
        All Users

        <Link to="/users/new" className="link">Add New User</Link>
       
       
      </div>
     
 
      <div>
        <div className="main">
        <table class="table">
            <thead>
              <tr>
                <th scope="col">EmailID</th>
                <th scope="col">Password</th>
                <th scope="col">Role</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            {mydata.map((post)=>{
                 return (
            <tbody>
              <tr key={post.UserID}>
                <td>{post.EmailID}</td>
                <td>{post.Password}</td>
                <td>{post.Role}</td>
                <td>
                  <div className="actions-btns useraction-btns">
                    <div
                    onClick={() => navigate(`/users/viewuser/${post.UserID}`)}
                    className='view'><PreviewIcon />
                    </div>
                    <div
                    onClick={() => navigate(`/users/edituser/${post.UserID}`)}
                    className='edit'><CreateIcon/>
                    </div>
                    <div
                     onClick={() => handleuserDelete(post.UserID)}
                     className='delete'><RestoreFromTrashIcon />
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>);
            })}
        </table>
        </div>
      </div>
    </div>
  );
};

export default Datatable;
