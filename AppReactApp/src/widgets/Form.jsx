import * as React from "react";
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import CircularProgress from "@mui/material/CircularProgress"
import TextField from "@mui/material/TextField"
import FormControlLabel from "@mui/material/FormControlLabel"
import MSwitch from "@mui/material/Switch"
import Alert from "@mui/material/Alert"
import Grid from "@mui/material/Grid"
import Autocomplete from "@mui/material/Autocomplete"

import { useItem, useTryCatch, useQueries, useDispatch } from "../hooks/hooks";
import axiosInstance from "../store/axiosInstance";
import { StateContext } from "../store/store";
import { getEntity, getRelations, filterUnique, getRelation } from "../data/data";

import { useHistory } from "react-router-dom"
import { AddDialog } from "./AddDialog";

export function Form({ name, relationship, dialog, rID, next }) {

    const data = useItem({
        name,
        key: "id",
    })
    const { redirect } = useQueries()
    const entity = getEntity(name)
    const relations = getRelations(name)

    const [state, setState] = React.useState(null)

    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState(false)
    const [success, setSuccess] = React.useState(false)

    const { push } = useHistory()
    const dispatch = useDispatch()

    async function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)
        const promise = axiosInstance.post(`/${name.toLowerCase()}`, { ...state, [relationship]: rID })
        const [res, err] = await useTryCatch(promise);
        if (err) {
            setError(err)
            setLoading(false)
            return;
        }
        setSuccess(true)
        dispatch({ type: "ADD_ENTITY", payload: { ...res.data, isNew: true }, context: `${relationship || name}List` });
        setLoading(false);
        if (redirect || next) {
            setTimeout(() => {
                if (next) {
                    next()
                } else {
                    push(redirect)
                }
            }, 1700)
        } else {
            setState(null)
        }

    }

    function handleChange(e) {
        setError(false);
        setSuccess(false);
        setState({ ...state, [e.target.name]: e.target.value })
    }

    function hadleRelChange(v, name){
      // setState({{...state, name:v}})
    }

    

    return (
        <form onSubmit={handleSubmit}>
            <Stack sx={styles["container"]} spacing={2} >
                <Box sx={styles["header"]} >
                    <Typography variant="h5" >New {name}</Typography>
                </Box>
                {entity?.columns?.map((e, i) => {
                    const fields = {
                        password: <TextField  name={e.key} key={i} type={e.key.toLowerCase() === "password" ? "password" : e.type} required label={e.key} onChange={handleChange} fullWidth />,
                        string: <TextField  name={e.key} key={i} type={e.key.toLowerCase() === "password" ? "password" : e.type} required label={e.key} onChange={handleChange} fullWidth />,
                        boolean: <FormControlLabel
                            key={i}
                            name={e.key}
                            control={<MSwitch  defaultChecked />}
                            label={e.key}
                        />
                    }
                    return fields[e.type]
                })}
                {!dialog && (
                    <>  {relations.filter(filterUnique).map(m => {
                        const relations = {
                            OneToMany: <SelectMultiple title={getRelation(m, name)} handleChange={hadleRelChange} value={null} />,
                            ManyToMany: <SelectMultiple title={getRelation(m, name)} handleChange={hadleRelChange} value={null} />,
                            ManyToOne: <SelectSingle title={getRelation(m, name)} handleChange={hadleRelChange} value={null} />,
                            OneToOne: <SelectSingle title={getRelation(m,name)} handleChange={hadleRelChange} value={null} />
                        }
                        return relations[m.type]
                    })}</>
                )}


                <Box>
                    {success && (
                        <Alert>Success</Alert>
                    )}
                    {error && (
                        <Alert severity="error" >Success</Alert>
                    )}
                </Box>
                <Button
                    color={loading ? "secondary" : "primary"}
                    startIcon={loading ? <CircularProgress size={20} /> : null}
                    disableElevation
                    type={loading ? "button" : "submit"}
                    fullWidth variant="contained"
                >{loading ? null : "Save"}</Button>
            </Stack>
        </form>
    )
}

function SelectMultiple({ title, handleChange, value }) {
    const appContext = React.useContext(StateContext);
const data = appContext[`${title}List`] || []
    return (
        <Grid container spacing={1} >
            <Grid item xs >
                <Autocomplete
                    size="small"
                    disablePortal
                    required
                    value={value}
                    options={data}
                    getOptionsLabel={(o) => (o[data[0]?.nameKey]||"Rel")}
                    onChange={(e, v) => handleChange(v)}
                    renderInput={(params) => (
                        <TextField
                            fullWidth
                            size="small"
                            {...params}
                            label={title}
                        />
                    )}
                />
            </Grid>
            <Grid item xs={2} >
                <AddDialog title={title} />
            </Grid>
        </Grid>
    )
}



function SelectSingle({ title, handleChange, value }) {
    const appContext = React.useContext(StateContext);
    const data = appContext[`${title}List`] || []
    return (
        <Grid container spacing={1} >
            <Grid item xs >
                <Autocomplete
                    size="small"
                    disablePortal
                    required
                    value={value}
                    options={data}
                    getOptionsLabel={(o) => (o[data[0]?.nameKey]||"Rel")}
                    onChange={(e, v) => handleChange(v)}
                    renderInput={(params) => (
                        <TextField
                            fullWidth
                            size="small"
                            {...params}
                            label={title}
                        />
                    )}
                />
            </Grid>
            <Grid item xs={2} >
                <AddDialog />
            </Grid>
        </Grid>

    );
}



const styles = {
    container: {
        p: 2,
    },
    header: {
        bgcolor: "lightgray",
        mt: 1,
        textAlign: "center",
        borderRadius: "4px",
        minHeight: 80,
    },
    emptyDesc: {
        minHeight: "30vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        container: {
            maxHeight: "72vh",
            overflow: "auto"
        }
    }
}
