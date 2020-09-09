export const KEYS = {
  user: "user",
}

export const STORAGE = {
  localStorage: "localStorage",
  sessionStorage: "sessionStorage",
}

export const getItemFromStorage = (storage, key) => {
  try {
    return JSON.parse(window[storage].getItem(key))
  } catch (error) {
    console.error(error)
    return {}
  }
}

export const setItemToStorage = (storage, key, state) => {
  try {
    window[storage].setItem(key, JSON.stringify(state))
  } catch (error) {
    console.error(error)
  }
}
