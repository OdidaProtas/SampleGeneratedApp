import * as React from "react";
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Paper from "@mui/material/Paper"
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import CircularProgress from "@mui/material/CircularProgress"
import TextField from "@mui/material/TextField"

import axiosInstacce from "../store/axiosInstance";
import { useTryCatch } from "../hooks/hooks";

const Switch = ({ children }) => <>{children}</>
const Route = ({ children }) => <>{children}</>


export function Auth() {
    const path = ""
    return (
        <Switch>
            {["Login", "Signup"].map((r, i) => (
                <Route key={i} path={`${path}/${r}`}  >
                    <Login enRoute={r} />
                </Route>
            ))}
        </Switch>
    )
}


function Login({ enRoute }) {

    const [loading, setLoading] = React.useState(false)
    const [state, setState] = React.useState(false)
    const [error, setError] = React.useState(false)

    const dispatch = () => { }
    // const {next} = useQueries()
    // const push = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)
        const promise = axiosInstance.post(`/${enRoute.toLowerCase()}`, state)
        const [{ data } , err] = await useTryCatch(promise);
        if (err) {
            setError(err)
            setLoading(false)
            return;
        }
        dispatch({ type: "ADD_ENTITIES", payload: data, context: "user" });
        dispatch({ type: "ADD_ENTITIES", payload: true, context: "isLoggedIn" });
        setLoading(false);
        // push(next)
    }

    function handleChange(e) {
        setState({ ...state, [e.target.name]: e.target.value })
    }

    return (
        <form onSubmit={handleSubmit}>
            <Paper sx={styles["container"]} >
                <Stack spacing={2} >
                    <Box sx={styles["header"]} >
                        <Typography variant="h5" >{enRoute}</Typography>
                        <Typography variant="body" >ProjectName</Typography>
                    </Box>
                    <TextField required label="Username" onChange={handleChange} fullWidth />
                    <TextField helperText={enRoute === "Signup" ? passValText : null} type="password" required label="Password" onChange={handleChange} fullWidth />
                    <Button
                        color={loading ? "secondary" : "primary"}
                        startIcon={loading ? <CircularProgress size={20} /> : null}
                        disableElevation
                        type={loading ? "button" : "submit"}
                        fullWidth variant="contained"
                    >{loading ? null : "Submit"}</Button>
                </Stack>
            </Paper>
        </form>

    )
}


const passValText = "Use atleast 8 alphanumeric digits and and a special character"


const styles = {
    container: {
        p: 2,
        mt: 5,
        mb: 9
    },
    header: {
        bgcolor: "lightgray",
        mt: 5,
        textAlign: "center",
        borderRadius: "4px",
        minHeight: 80,
        textAlign: "center",
        pt: 5
    }
}