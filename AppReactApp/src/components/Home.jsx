import logo from "../logo.svg"
import Container from "@mui/material/Container"
import Box from "@mui/material/Box"
import { getEntities } from "../data/data"
import Link from "@mui/material/Link"
import Typography from "@mui/material/Typography"
import { useHistory } from "react-router-dom"
export function Home() {
    const { push } = useHistory()
    return (
        <Container>
            <Box sx={styles["header"]} >
                <Box>
                    <img className={"App-logo"} src={logo} alt="logo" />
                    <br />
                    <Typography variant="h6" >App Project</Typography>
                </Box>
            </Box>
            <Typography variant="h5" sx={{ my: 2 }} >Available Links</Typography>
            <Box sx={styles["body"]} >
                {getEntities().map(e => e.EntityName).map((e, i) => {
                    return (
                        <Box key={i} sx={{mt:2}} >
                            <Link onClick={() => push(`/${e}`)} sx={styles["link"]} >{e}</Link>
                        </Box>
                    )
                })}
            </Box>
        </Container>
    )

}

const styles = {
    header: {
        minHeight: "30vh",
        display: "flex",
        justifyContent: "center",
        textAlign: "center",
        mt:6
    },
    body: {
        mt: 3,
        textAlign:"center",
        display: "flex"

    },
    link:{
        ml:3
    }
}