import config from '../config';

export const parseJSON = response => response.json();

export const getFromLocalStorage = key => {
    try {
      const serializedState = localStorage.getItem(key);
      if (serializedState === null) {
        return undefined;
      }
      return JSON.parse(serializedState);
    } catch (err) {
      return undefined;
    }
  };

export const deleteFromLocalStorage = p => {
    try {
        p.forEach(item => {
        const serializedState = localStorage.getItem(item);
        if (serializedState !== null) {
            localStorage.removeItem(item);
        }
        });
    } catch (err) {
        throw new Error(err);
    }
};

export const saveToLocalStorage = items => {
  try {
    items.forEach(item => {
      localStorage.setItem(item.key, JSON.stringify(item.data));
    });
  } catch (err) {
    throw new Error(err);
  }
};

export const clearLocalStorage = () => {
    try {
      localStorage.clear();
    } catch (err) {
      throw new Error(err);
    }
};

export const generateReducer = (initialState, reducerMap) => (
    state = initialState,
    action
    ) => {
    const reducer = reducerMap[action.type];

    return reducer ? reducer(state, action.payload) : state;
};


export const getFromApi = path => {
    return fetch(config.apiEndpoint + path)
    .then(data => {
      return data.json();
    });
}

export const getRandomColor = () => {
  var r = Math.floor(Math.random() * 255);
  var g = Math.floor(Math.random() * 255);
  var b = Math.floor(Math.random() * 255);
  return "rgb(" + r + "," + g + "," + b + ")";
}