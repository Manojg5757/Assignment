import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    currentUser:null,
    loading:false,
    error:null
}

export const userSlice = createSlice({
  name:"user",
  initialState,
  reducers:{
    loginStart:(state)=>{
        state.loading = true
    },
    loginSuccess:(state,action)=>{
        state.loading = false
        state.error = null
        state.currentUser = action.payload
    },
    loginFailure:(state,action)=>{
        state.loading = false
        state.error = action.payload
    },
    logoutStart:(state)=>{
      state.loading = true
    },
    logoutSuccess:(state,action)=>{
      state.loading = false
      state.error  = null
      state.currentUser = null
    },
    logoutFailure:(state,action)=>{
      state.loading(false)
      state.error = action.payload
    }
  }
})

export const {loginStart,loginSuccess,loginFailure,logoutStart,logoutSuccess,logoutFailure} = userSlice.actions

export default userSlice.reducer