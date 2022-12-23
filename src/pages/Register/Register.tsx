import React from "react";
import { useFormik,Form,Formik,Field,FormikHelpers } from "formik";
import * as yup from "yup";
import {useDispatch, useSelector} from 'react-redux';
import { DispatchType, RootState } from "../../store/store";
import {isLoadingState, registerUserApi} from '../../redux/configStore/userReducer'
import {motion} from 'framer-motion'
import {pageMotion} from '../../util/motion'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from "../../components/Loading";


type Props = {};

export interface UserRegister {
  email:    string;
  password: string;
  name:     string;
  gender:   boolean;
  phone:    string;
  confirmPassword?:string
}

export default function Register({}: Props) {
  const {registerUser,isLoading} = useSelector((state:RootState) => state.userReducer)

  const dispatch:DispatchType = useDispatch()

  return (
   <motion.div
   initial="initial"
   animate="animate"
   variants={pageMotion}
   className="bg-[#F5F5F5] dark:bg-zinc-800 dark:text-gray-400 px-12">
     <h1 className="text-4xl py-10">Register</h1>
      <hr className="py-3" /> 
    {/* <form onSubmit={registerFrm.handleSubmit}>
      
    </form> */}

<Formik
      initialValues={{
      email: '',
      password: '',
      confirmPassword:'',
      name: '',
      gender: true,
      phone: '',
        
      }}
      validationSchema={
        yup.object().shape({
          email: yup.string().email(  ),
          password: yup.string().required().min(3,'must be at least 3 charator'),
          name: yup.string().required(),
          confirmPassword:yup.string().label('confirm password').required().oneOf([yup.ref('password'), null], 'Passwords must match'),
          phone: yup.string().required(),
        })
      }
      onSubmit={async (values:UserRegister) => {
        if(typeof values.gender === 'string'){
          const gender2:boolean = values.gender === 'true' ? true : false;

          const {confirmPassword,...value} = {...values, gender: gender2}
          console.log(value)
          const action = await registerUserApi(value)
          await   dispatch(action)
          await dispatch(isLoadingState(false))
          alert(registerUser)
          
        }

     
      }}
    >
      {({ values,errors,touched }) => (
       
        <Form>
          <div className="grid grid-cols-1 md:grid-cols-12">
        <div className="col-span-6 px-2 md:px-12 my-5">
          <div className="form-group my-5">
            <p>email</p>
     < Field
              className="input dark:bg-gray-600/30 border-none dark:bg-gray-600/30 border-none"
              type="text"
              name="email"
              placeholder="Email..."
             
            />
             {errors.email && touched.email && <p className="text-red-600 text-xs">{errors.email}</p>}
          </div>
          <div className="form-group my-5">
            <p>password</p>
            <Field
              className="input dark:bg-gray-600/30 border-none"
              type="password"
              name="password"
              placeholder="password..."
             
            />
            {errors.password && touched.password && <p className="text-red-600 text-xs">{errors.password}</p>}
          </div>
          <div className="form-group my-5">
            <p>Confirm Password</p>
            <Field
              className="input dark:bg-gray-600/30 border-none"
              type="password"
              name="confirmPassword"
              placeholder="confirm password..."
             
            />
            {errors.confirmPassword && touched.confirmPassword && <p className="text-red-600 text-xs">{errors.confirmPassword}</p>}
          </div>
        </div>
        <div className="col-span-6 mx-2 md:px-12 my-5">
          <div className="form-group my-5">
            <p>Name</p>
            <Field
              className="input dark:bg-gray-600/30 border-none"
              type="text"
              name="name"
              placeholder="Name..."
             
            />
            {errors.name && touched.name && <p className="text-red-600 text-xs">{errors.name}</p>}
            <ToastContainer position="bottom-right"/>
          </div>

          <div className="form-group my-5">
            <p>Phone</p>
            <Field
              className="input dark:bg-gray-600/30 border-none"
              type="text"
              name="phone"
              placeholder="Phone..."
             
            />
            {errors.phone && touched.password && <p className="text-red-600 text-xs">{errors.phone}</p>}
          </div>

          <div className="form-group my-5">
            <div className="my-2">
              <p className="my-5">Gender</p>
              
              <label>
              <Field type="radio" name="gender" value='true' />
              Male
            </label>
            <label>
              <Field type="radio" name="gender" value='false' />
              Female
            </label>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="button"
            >
              
              SignUp
            </button>
          </div>
        </div>
      </div>
          
        </Form>
      )}
    </Formik>
        {isLoading && <Loading/>}
   </motion.div>
  );
}
