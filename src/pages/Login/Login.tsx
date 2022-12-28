import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  isLoadingState,
  loginAsyncApiFb,
  loginAsyncApit,
} from "../../redux/configStore/userReducer";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { DispatchType, RootState } from "../../store/store";

import { motion } from "framer-motion";
import { pageMotion } from "../../util/motion";
import Loading from "../../components/Loading";
import FacebookLogin from "react-facebook-login";
import { USER_LOGIN, getStoreJson } from "../../util/config";
import { toast,ToastContainer } from "react-toastify";
import { history } from "../..";

type Props = {};
export type UserFormikModel = {
  email: String;
  password: String;
};
export default function Login({}: Props) {
  const dispatch: DispatchType = useDispatch();
  const { isLoading,userLogin } = useSelector((state: RootState) => state.userReducer);


  const userLoginForm = useFormik<UserFormikModel>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object().shape({
      email: yup.string().required("Email cant not be blank").email(),
      password: yup
        .string()
        .required("Password cant not be blank")
        .max(10, "6 - 10 character")
        .min(3, "3 - 10 character"),
    }),
    onSubmit: (values: any) => {
      
      const action = loginAsyncApit(values);
      dispatch(action);
      dispatch(isLoadingState(false));
     
     if(getStoreJson('userLogin') === null) {
      history.push('/login')
        toast.error('login fail')
     }
      
   
    },
  });
 
  const responseFacebook = (response) => {
    console.log(response.accessToken)
   dispatch(loginAsyncApiFb(response.accessToken));
  };
 
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={pageMotion}
      className="bg-[#F5F5F5] dark:bg-zinc-800 p-0 md:p-12 dark:text-gray-400"
    >
      {isLoading && <Loading />}
      <h1 className="text-4xl py-10">Login</h1>
      <hr className="py-3" />

      <form
        className="md:w-1/3 w-full px-4 mx-auto "
        onSubmit={userLoginForm.handleSubmit}
      >
        <div className="flex flex-col ">
          <div className="form-group my-3">
            <p>Email</p>
            <input
              type="text"
              name="email"
              className="input dark:bg-gray-600/30 border-none"
              placeholder="email..."
              onBlur={userLoginForm.handleBlur}
              onChange={userLoginForm.handleChange}
            />
            {userLoginForm.errors.email && (
              <p className="text-red-600 text-xs">something wrong</p>
            )}
          </div>
          <div className="form-group my-3">
            <p>Password</p>
            <input
              type="text"
              name="password"
              className="input dark:bg-gray-600/30 border-none"
              placeholder="password..."
              onBlur={userLoginForm.handleBlur}
              onChange={userLoginForm.handleChange}
            />
            {userLoginForm.errors.password && (
              <p className="text-red-600  00 text-xs">something wrong</p>
            )}
          </div>
          <div className="flex my-3 justify-end align-center ">
            <NavLink to="/register">
              <p className="mx-5 leading-10 mt-2 text-[#6200EE]">
                register now ?
              </p>
            </NavLink>
            <button className="button">Login</button>
          </div>
        </div>
        <div className="text-center rounded-xl">
        <FacebookLogin
          appId="571714300951148"
          fields="name,email,picture"
          callback={responseFacebook}
          cssClass='rounded-3xl bg-[#0576e7] text-white py-2 px-5'
        />
        </div>
      </form>
      <ToastContainer/>
    </motion.div>
  );
}
