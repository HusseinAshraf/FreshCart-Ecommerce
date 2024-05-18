import { createSlice } from "@reduxjs/toolkit";

let initialState = {count :0 , userName:''}

let counterSlice = createSlice({
    name : 'counterSlice',
     initialState,
     reducers:{

        increase : ()=>{
            console.log('increase');
        },
        decrease : ()=>{
            console.log('decrease');
        },
     }
})

export let counterReducer = counterSlice.reducer

export  let {increase , decrease} = counterSlice.actions