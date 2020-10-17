import faker from "faker"

export const dedupArray = (array) => [...new Set(array)]

export const phone = () => faker.phone.phoneNumberFormat().replace(/-/g, "")
