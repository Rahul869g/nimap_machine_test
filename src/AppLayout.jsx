// src/components/Layout.js
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { Provider } from "react-redux";
import store from "./utils/Store";

const AppLayout = () => {
  return (
    <Provider store={store}>
      <div>
        <Header />
        <main>
          <Outlet />
        </main>
      </div>
    </Provider>
  );
};

export default AppLayout;
