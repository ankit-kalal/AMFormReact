/**
=========================================================
* Material Dashboard 3 PRO React - v2.4.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-pro-react
* Copyright 2024 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import React from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import App from "App";

// Redux Store
import { store } from "store";

// Material Dashboard 3 PRO React Context Provider
import { MaterialUIControllerProvider } from "context";
// Auth Context Provider
import { AuthProvider } from "context/AuthContext";

// Suppress ResizeObserver errors (harmless but annoying)
const originalError = console.error;
console.error = (...args) => {
  if (
    args[0]?.includes?.('ResizeObserver loop') ||
    args[0]?.includes?.('ResizeObserver loop completed with undelivered notifications')
  ) {
    // Suppress ResizeObserver errors - they're harmless
    return;
  }
  originalError.apply(console, args);
};

// Global error handler to suppress ResizeObserver errors
window.addEventListener('error', (event) => {
  if (
    event.message?.includes('ResizeObserver loop') ||
    event.message?.includes('ResizeObserver loop completed with undelivered notifications')
  ) {
    event.preventDefault();
    return false;
  }
});

const container = document.getElementById("app");
const root = createRoot(container);

root.render(
  <HashRouter>
    <Provider store={store}>
      <MaterialUIControllerProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </MaterialUIControllerProvider>
    </Provider>
  </HashRouter>
);
