import { AppBar, Badge, IconButton, List, ListItem, Switch, Toolbar, Typography, Box, Container } from "@mui/material";
import cover from '.././images/cover.jpg'
import './Homepage.css'

export default function Homepage() {
    return (
        <>
            <div className="coverdiv">
                <img src={cover} className="cover"></img>
            </div>
        </>
    )
}