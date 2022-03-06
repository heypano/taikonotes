import { Provider } from "react-redux";
import App from "../components/App";
import { store } from "../redux/store";

export default function Home() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
