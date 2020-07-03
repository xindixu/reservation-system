import { gql } from "apollo-boost"
import ManagerForm from "components/manager-form"

export const GET_ALL_MANAGERS = gql`
  query {
    managers {
      firstName
      lastName
      jobTitle
      email
      phone
      avatar {
        md
      }
      clientsCount
    }
  }
`
