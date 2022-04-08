import * as React from "react";
import Grid from "@mui/material/Grid"
import {List} from "../widgets/List"
import {Form} from "../widgets/Form"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"

import { Switch, Route, useRouteMatch } from "react-router-dom"

export function Entity({ name }) {
    const { path } = useRouteMatch()
    return (
        <Box sx={styles["container"]} >
        <Toolbar />
            <Grid container spacing={2} >
                <Grid item xs={5} >
                    <List name={name} />,
                </Grid>
                <Grid item xs >
                    <Switch>
                        {["", ":id"].map((r, i) => {
                            const components = {
                                "": <Form name={name} />,
                                ":id": <Form edit name={name} />
                            }
                            return (
                                <Route key={i} exact path={`${path}${r ? `/${r}` : ""}`}  >
                                    {components[r]}
                                </Route>
                            )
                        })}
                    </Switch>
                </Grid>
            </Grid>
        </Box>
    )
}


const styles = {
    container: {
        p: 2,
    },
}
