const AppReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };

    case "UPDATE_USER":
      return { ...state, user: { ...state.user, user: action.payload } };

    case "REMOVE_USER":
      return { ...state, user: {} };

    case "SET_CATEGORIES":
      return { ...state, categories: [...action.payload] };

    case "ADD_CATEGORY":
      return { ...state, categories: [...state.categories, action.payload] };

    case "EDIT_CATEGORY":
      const { details, catId } = action.payload;
      const tempCats = state.categories.map((item) => {
        if (item?._id === catId) return { ...details };
        return item;
      });

      return { ...state, categories: tempCats };

    case "SET_TRANSACTIONS":
      return { ...state, transactions: [...action.payload] };

    case "ADD_TRANSACTION":
      return {
        ...state,
        transactions: [...state.transactions, action.payload],
      };

    case "DELETE_TRANSACTION":
      return {
        ...state,
        transactions: state.transactions.filter(
          (item) => item?._id !== action.payload
        ),
      };

    default:
      return state;
  }
};

export default AppReducer;
