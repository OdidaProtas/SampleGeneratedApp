
                import { createContext } from "react";
        
        export const initialState = {};
        
        export const StateContext = createContext(initialState);
        
        export const reducer = (state, action) => {
            switch (action.type) {
                case "ADD_ENTITIES":
                    return {
                        ...state,
                        [action.context]: action.payload,
                    };
                case "ADD_ENTITY":
                    const uiio = state[action.context] || [];
                    uiio.unshift(action.payload);
                    return {
                        ...state,
                        [action.context]: uiio,
                    };
                case "CLEAR_ENTITIES":
                    return {
                        ...state,
                        [action.context]: null,
                    };
                case "REMOVE_ENTITY":
                    const repo = state[action.context] || [];
                    const idx = repo.indexOf(action.payload);
                    if (idx > -1) {
                        repo.splice(idx, 1);
                    }
                    return {
                        ...state,
                        [action.context]: repo,
                    };
        
                case "UPDATE_ENTITY":
                    const existing = state[action.context] || [];
                    const i = existing.indexOf(action.prev);
                    if (i > -1) {
                        existing.splice(i, 1);
                        existing.push(action.payload);
                    }
                    return {
                        ...state,
                        [action.payload]: existing,
                    };
        
                case "RESET":
                    return {}
        
                default:
                    return {
                        ...state,
                    };
            }
        };
                