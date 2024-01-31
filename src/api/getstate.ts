import { store } from "@/redux/store";

console.log(store.getState(),"from new api file");
export default store.getState();