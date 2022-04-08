
        import React from "react"
        import { Form } from "./Form"
        import Dialog from "@mui/material/Dialog"
        import DialogContent from "@mui/material/DialogContent"
        import DialogActions from "@mui/material/DialogActions"
        import { useParams } from "react-router-dom"
        import Button from "@mui/material/Button"
        export function AddDialog({ name, title }) {
            const [open, setOpen] = React.useState(false)
            const { id } = useParams()
            return (
                <>
                    <Button onClick={() => setOpen(!open)} >Add</Button>
                    <Dialog onClose={()=>setOpen(!opem)} fullWidth open={open} >
                        <DialogContent dividers >
                            <Form dialog next={() => setOpen(false)} name={name} relationship={title} rID={id} />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setOpen(false)} >Cancel</Button>
                        </DialogActions>
                    </Dialog>
                </>
            )
        }