import React, { createContext, useContext, useEffect, useReducer } from "react";
import AppReducer from "../reducers/AppReducer";
import { useNavigate } from "react-router-dom";
import { api } from "../constants/Api";
import { toast } from "react-toastify";

const Context = createContext();
const initialState = {
  user: {},
  categories: [],
  transactions: [],
};

const AppContext = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  const navigate = useNavigate();

  /* AUTHENTICATION */
  const registerUser = async (details) => {
    try {
      const res = await fetch(`${api}/api/user/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(details),
      });

      const data = await res.json();
      return data;
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const loginUser = async ({ email, password }) => {
    try {
      const res = await fetch(`${api}/api/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      return data;
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const handleLogout = () => {
    dispatch({ type: "REMOVE_USER" });
    navigate("../auth");
    localStorage.removeItem("expense-tracker-user");
    toast.info("You have been logged out!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const updateUser = async (details, setEditProfile, setLoading) => {
    setLoading(true);
    try {
      const res = await fetch(`${api}/api/user/updateProfile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state?.user?.token}`,
        },
        body: JSON.stringify(details),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Profile Updated", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setEditProfile(false);
        dispatch({ type: "UPDATE_USER", payload: data.user });
      } else {
        toast.error(data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } finally {
      setLoading(false);
    }
  };

  /* CATEGORIES */
  const fetchCats = async () => {
    try {
      const res = await fetch(`${api}/api/category/getCategories`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state?.user?.token}`,
        },
      });

      const data = await res.json();
      if (data.success)
        dispatch({ type: "SET_CATEGORIES", payload: data.cats });
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const addCategory = async (details, setDetails, initialState) => {
    try {
      const res = await fetch(`${api}/api/category/addCategory`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state?.user?.token}`,
        },
        body: JSON.stringify({
          ...details,
          user: state?.user?.user?._id,
        }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Category Added", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        dispatch({ type: "ADD_CATEGORY", payload: data.cat });
        setDetails(initialState);
      } else {
        toast.error(data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const editCategory = async (
    details,
    setDetails,
    initialState,
    id,
    setEdit
  ) => {
    try {
      const res = await fetch(`${api}/api/category/editCategory/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state?.user?.token}`,
        },
        body: JSON.stringify(details),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Category Updated", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        dispatch({
          type: "EDIT_CATEGORY",
          payload: { details: data.cat, catId: id },
        });
        setDetails(initialState);
        setEdit(false);
      } else {
        toast.error(data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  /* TRANSACTIONS */
  const fetchTransactions = async () => {
    try {
      const res = await fetch(`${api}/api/transaction/getTransactions`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state?.user?.token}`,
        },
      });

      const data = await res.json();
      if (data.success)
        dispatch({ type: "SET_TRANSACTIONS", payload: data.trans });
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const addTransaction = async (
    details,
    setDetails,
    initialState,
    setLoading
  ) => {
    setLoading(true);
    try {
      const res = await fetch(`${api}/api/transaction/createTransaction`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state?.user?.token}`,
        },
        body: JSON.stringify({
          ...details,
          user: state?.user?.user?._id,
        }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Transaction Added", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        dispatch({ type: "ADD_TRANSACTION", payload: data.transaction });
        setDetails(initialState);
      } else {
        toast.error(data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteTransaction = async (id) => {
    try {
      const res = await fetch(
        `${api}/api/transaction/deleteTransaction/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${state?.user?.token}`,
          },
        }
      );

      const data = await res.json();
      if (data.success) {
        toast.success("Transaction Deleted", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        dispatch({ type: "DELETE_TRANSACTION", payload: id });
      } else {
        toast.error(data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  useEffect(() => {
    const authUser = JSON.parse(localStorage.getItem("expense-tracker-user"));
    if (authUser) dispatch({ type: "SET_USER", payload: authUser });
    else navigate("../auth");
  }, [navigate]);

  useEffect(() => {
    fetchCats();
    fetchTransactions();
  }, [state?.user]);

  return (
    <Context.Provider
      value={{
        ...state,
        registerUser,
        loginUser,
        handleLogout,
        updateUser,
        addCategory,
        editCategory,
        addTransaction,
        deleteTransaction,
      }}
    >
      {children}
    </Context.Provider>
  );
};

const useGlobalContext = () => useContext(Context);
export { AppContext, useGlobalContext };
