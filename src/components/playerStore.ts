import { create } from "zustand";

// type TodoStore = {
//   todos: string[];
//   addTodo: (todo: string) => void;
//   removeTodo: (todo: string) => void;
// };
type playerStoreType = {
  playerName: string,
  point: number,
  calculatedPoints:(number:number) => void;

}

export const usePlayerStore = create<playerStoreType>((set)=>({
  playerName: "Player1",
  point:25000,
  calculatedPoints:(number:number)=>set((state)=>({point:state.point+number}))
}))

export const usePlayerStore2 = create<playerStoreType>((set)=>({
  playerName: "Player1",
  point:25000,
  calculatedPoints:(number:number)=>set((state)=>({point:state.point+number}))
}))