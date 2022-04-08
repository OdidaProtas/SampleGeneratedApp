import * as React from "react";
import Box from "@mui/material/Box"
import Paper from "@mui/material/Paper"
import CircularProgress from "@mui/material/CircularProgress"
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Chip from "@mui/material/Chip"
import { useList } from "../hooks/hooks";
import { getEntity } from "../data/data";
import { StateContext } from "../store/store"
import { useHistory } from "react-router-dom"

export function List({ name }) {
    const appContext = React.useContext(StateContext)

    const data = appContext[`${name}List`]
    const loading = appContext[`${name}ListLoader`]

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    useList({
        name, effects: [name], take: rowsPerPage, skip: (data || []).length
    })


    const entity = getEntity(name)


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    function createData(name, id, isNew) {
        return { name, id, isNew };
    }


    const rows = (data || []).map((c) =>
        createData(
            c[entity.columns[0]?.key],
            c.id,
            c.isNew
        )
    );

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;


    return (
        <div style={styles["container"]} >
            <Box sx={{ my: 2 }} >{entity?.EntityName}(s)</Box>
            <TableContainer sx={{ maxHeight: "60vh", overflow: "auto" }} component={Paper}>
                <Table  aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: "bold" }} align="left">{entity?.nameKey}</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }} align="left"></TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, i) => (
                                <TableRow
                                onClick={() => push(`/${name}/${row.id}`)}
                                    key={i}
                                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                    {row.isNew && (
                                        <Chip label="New" size="small" color="success" ></Chip>
                                    )}
                                </TableCell>
                                </TableRow>
                            ))}
                        {!Boolean(rows.length) && loading && (
                            <TableRow
                                style={{
                                    height: 33 * 5,
                                }}
                            >
                                <TableCell colSpan={4}>
                                    <Box
                                        sx={{
                                            textAlign: "center",
                                        }}
                                    >
                                        <Box>
                                            <CircularProgress />
                                        </Box>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        )}

                        {emptyRows > 0 && (
                            <TableRow
                                style={{
                                    height: 33 * emptyRows,
                                }}
                            >
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 20, 30, 40]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </div>
    )
}

const styles = {
    container: {
        p: 2,
        mt: 5,
        mb: 9
    },
    header: {
        bgcolor: "lightgray",
        mt: 5,
        borderRadius: "4px",
        minHeight: 80,
        textAlign: "center",
        pt: 5
    },
    emptyDesc: {
        minHeight: "30vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center"
    }
}
