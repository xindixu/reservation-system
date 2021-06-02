import React from "react"
import ReactDOM from "react-dom"
import { ApolloProvider, ApolloClient, InMemoryCache, gql } from "@apollo/client"
import { UserContextProvider } from "./contexts/user-context"

import "antd/dist/antd.css"
import "./tailwind.css"
import "./global.css"
import * as serviceWorker from "./serviceWorker"
import App from "./App"

const client = new ApolloClient({
  uri: `${process.env.REACT_APP_SERVER_URL}/graphql`,
  cache: new InMemoryCache(),
  typeDefs: gql`
    enum Role {
      CLIENT
      MANAGER
      ADMIN
    }
  `,
  credentials: "include",
  notifyOnNetworkStatusChange: true,
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </ApolloProvider>,
  document.getElementById("root")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
