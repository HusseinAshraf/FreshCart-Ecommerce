import { counterReducer } from "./CounterSlide";
import { configureStore } from "@reduxjs/toolkit";

// waiting the reducer
export let store = configureStore({
    reducer :{
        counter : counterReducer

    }
});