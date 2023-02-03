import { Provider } from "react-redux";
import App from "./App";
import { store } from "./redux/store";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export default function AppProvider() {
  return (
    <Provider store={store}>
      <App />
      <ToastContainer />
    </Provider>
  );
}
