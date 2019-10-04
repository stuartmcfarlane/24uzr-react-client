import ACTIONS from "./action";

const defaultState = {
  items: []
};

const todoReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ACTIONS.Types.CREATE_ITEM: {
      console.log(action);

      let item = action.payload;
      let newItem = { id: state.items.length + 1, description: item };
      let newState = {...state};
      newState.items.push(newItem);
      return newState;
    }

    case ACTIONS.Types.DELETE_ITEM: {
      let newState = {...state};
      let item = action.payload;
      newState.items.filter(i => i.id !== item.id);
      return newState;
    }

    default:
      return state;
  }
};

export default todoReducer;