
import Nav from "../components/Nav"
import Grid from "@mui/material/Grid"
import { getEntities } from '../data/data'
import Box from "@mui/material/Box"
import {Entity} from '../components/Entity'
import {Home} from "../components/Home"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
const routes = [
  { path: "/", component: <Home /> , isExact:true},
]

const entityRoutes = getEntities()
.map(e => ({
  path: `/${e.EntityName}`,
  component: <Entity name={e.EntityName} />,
}))
const combinedRoutes = (routes ||[]).concat(entityRoutes)

  export default function Navigation() {
      return (
        <Router>
      <Nav />
        <Switch>
        {combinedRoutes.map(({ isExact, path, component }, i) => (
          <Route key={i} exact={Boolean(isExact)} path={path}>
            {component}
          </Route>
        ))}
        <Route path="**" component={FO4} />
      </Switch>
        </Router>
      );
    }
  
    const FO4 = () => {
      const { push } = useHistory();
      return (
        <Box
          sx={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography variant="h6">Resource not found</Typography>
            <Divider sx={{ my: 2 }} />
            <Typography>Coming soon...</Typography>
            <Button onClick={() => push("/")} variant="contained">
              Back Home
            </Button>
          </Box>
        </Box>
      );
    };
    
              