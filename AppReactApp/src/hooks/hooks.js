
          import * as React from "react";
          import axiosInstance from "../store/axiosInstance"
          import { useParams } from "react-router-dom";
          import { StateContext } from "../store/store"
          
          export async function useTryCatch(promise) {
              try {
                  return [await promise, null]
              } catch (e) {
                  return [null, e]
              }
          }
          
          
          export function useList({ name, effects, take, skip  }) {
              const appContext = React.useContext(StateContext)
              const dispatch = appContext["dispatch"]
              const dir = appContext[`${name}List`] || []
              async function update() {
                  dispatch({ type: "ADD_ENTITIES", context: `${name}ListLoader`, payload:true })
                  const getListPromise = axiosInstance.get(`/${name}?take=${take}&skip=${skip}`)
                  const [res, e] = await useTryCatch(getListPromise)
                  if (e) {
                    dispatch({ type: "ADD_ENTITIES", context: `${name}ListLoader`, payload:false })
                      dispatch({ type: "ERROR", where: `${name}List`, error: e })
                  } else {
                      const {data}=res;
                      dispatch({ type: "ADD_ENTITIES", context: `${name}List`, payload: dir.concat(data) })
                      dispatch({ type: "ADD_ENTITIES", context: `${name}ListLoader`, payload:false })
                  }
              }
          
              React.useEffect(() => {
                  update()
              }, [].concat(effects))
          }
          
          
          export function useItem({ name, key, effects }) {
          
              const appContext = React.useContext(StateContext)
              const loading = appContext[`${name}Loader`]
              const [state, setState] = React.useState(null)
          
              const params = useParams()
          
              function update() {
                  const list = (appContext[`${name}List`] || []);
                  const index = list.map(l => l[key]).indexOf(params[key]);
                  setState(list[index]);
              }
          
              React.useEffect(() => {
                  update()
              }, [name, params[key]].concat(effects))
          
              return {... {}, [name]: state, [`${name}ItemLoader`]: loading }
          }
          
          export function useQueries() {
              return ({ redirect: "" })
          }
          
          export function useDispatch() {
              const { dispatch } = React.useContext(StateContext)
              return dispatch;
          }