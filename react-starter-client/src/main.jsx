import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import { HelmetProvider } from "react-helmet-async"
import AuthProvider from "./provider/AuthProvider"
import { RouterProvider } from "react-router-dom"
import route from "./router/Routes"
import { Toaster } from "react-hot-toast"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <HelmetProvider>
        <RouterProvider router={route} />
        <Toaster reverseOrder="false" />
      </HelmetProvider>
    </AuthProvider>
  </React.StrictMode>
)
