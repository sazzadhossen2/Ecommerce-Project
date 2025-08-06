import toast from 'react-hot-toast'
import UserSubmitButton from './UserSubmitButton'
import UserStore from '../../store/UserStore.js'
import ValidationHelper from '../../utility/ValidationHelper.js'
import { Navigate } from 'react-router-dom';
function Loginform() {

  const {LoginFormData,LoginFormOnChange,UserOTPRequest}=UserStore();
  const onFormSubmit=async()=>{
    if(!ValidationHelper.IsEmail(LoginFormData.email)){
      toast.error('Please enter a valid email address');
    }else{
let res =await UserOTPRequest(LoginFormData.email);
res?Navigate("/otp"):toast.error("Something went wrong, please try again later");
    }
  }
  return (
    <div className="container section">  
<div className="row d-flex justify-content-center">  
<div className="col-md-5">  
<div className="card p-5">  
<h4>Enter Your Email</h4>  
<p>A verification code will be sent to the email address you provide</p>  
<input 
value={LoginFormData.email}
onChange={(e)=>{
  LoginFormOnChange('email',e.target.value)
}}
placeholder="Email Address" type="email" className="form-control"/>  
<UserSubmitButton 
// submit={false} 
onClick={onFormSubmit}
className="btn mt-3 btn-success" text="Next"/>  
</div>  
</div>  
</div>  
</div>
  )
}

export default Loginform


// 1.10