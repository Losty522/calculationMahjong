import { useState,useEffect } from "react";

export function useGetFromStore<T,F>(
  store:(calback:(state:T)=>unknown)=>unknown,storeCallback:(state:T)=>F){
  const result = store(storeCallback) as F
  const [state,setState] = useState<F>();
  useEffect(()=>{
    setState(result);
  },[result])
  return state;
}