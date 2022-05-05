import { createContext, useContext } from "react";
import ActivityStore from "./activitystore";
import CommonStore from "./commonStore";
import modalStore from "./modalStore";
import userStore from "./userStore";

interface Store {
    activityStore:ActivityStore,
    commonStore:CommonStore,
    userStore:userStore,
    modalStore:modalStore
}

export const store: Store = {
    activityStore : new ActivityStore(),
    commonStore : new CommonStore(),
    userStore: new userStore(),
    modalStore:new modalStore()
}

export const StoreContext = createContext(store);

export function useStore()
{
    return useContext(StoreContext);
}