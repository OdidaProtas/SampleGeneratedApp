
  import './App.css'
  import { useReducer } from "react";
  import { reducer, initialState, StateContext } from "./store/store";
  import Container from "@mui/material/Container"
  import Navigation from "./navigation/Navigation";
  
  export default function App() {
      const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <Container>
        <StateContext.Provider value={{ ...state, dispatch }}>
          <Navigation />
        </StateContext.Provider>
        </Container>
      
    )
  }
              