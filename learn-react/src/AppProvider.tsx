import { Provider } from "react-redux";
import App from "./App";
import { store } from "./redux/store";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { compose } from './utils/HOC';
import withLanguage from './locale/Language';

const enhance = compose(
  withLanguage
);

export default enhance(function AppProvider() {
  return (
    <Provider store={store}>
      <App />
      <ToastContainer />
    </Provider>
  );
})
