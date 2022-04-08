import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import logo from "../logo.svg"
import Button from "@mui/material/Button"
import { useHistory } from "react-router-dom";

export default function Nav() {
    const { push } = useHistory()
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar elevation={0} color="default" position="fixed">
                <Toolbar>
                    <img onClick={()=>push("/")}  className="App-logo" style={{ borderRadius: "4px" }} height={66} src={logo} alt="Protus Logo" />
                    <Box sx={{ flexGrow: 1 }} />
                    <Button disabled  sx={{ ml: 3 }} >Login</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
