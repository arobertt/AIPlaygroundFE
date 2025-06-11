import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack } from "@mui/material";
import { FC, use } from "react";
import { useNavigate } from "react-router-dom";
import "./Menu.css"
import HomeIcon from "@mui/icons-material/Home";
import DevicesIcon from "@mui/icons-material/Devices";
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import BiotechIcon from '@mui/icons-material/Biotech';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import { CircleNotificationsOutlined } from "@mui/icons-material";

export const Menu: FC = () => {
    const navigate = useNavigate();

    return (
        <Drawer variant="permanent" className={"menu-drawer"} PaperProps ={{sx: {border : "0"}}}>
            <Box className={"menu-container"}>
                <Stack 
                    flexDirection={"row"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    sx={{ borderBottom: '1px solid', borderColor: 'primary.main' }}
                >
                    <img
                        src="/assets/logo_simple_transparent.png"
                        className={"menu-logo-image"}
                    />
                    <Box className={"menu-title"}>AI Playground</Box>
                </Stack>
                <List sx={{width: "95%"}}>
                    <ListItem key={"home"} disablePadding>
                        <ListItemButton onClick={() => navigate("/")}>
                            <ListItemIcon>
                                <HomeIcon color="primary"/>
                            </ListItemIcon>
                            <ListItemText primary={"Home"}/>
                        </ListItemButton>
                    </ListItem>
                    <ListItem key={"platforms"} disablePadding>
                        <ListItemButton onClick={() => navigate("/platforms")}>
                            <ListItemIcon>
                                <DevicesIcon color="primary"/>
                            </ListItemIcon>
                            <ListItemText primary={"Platforms"}/>
                        </ListItemButton>
                    </ListItem>
                    <ListItem key={"scopes"} disablePadding>
                        <ListItemButton onClick={() => navigate("/scopes")}>
                            <ListItemIcon>
                                <BiotechIcon color="primary"/>
                            </ListItemIcon>
                            <ListItemText primary={"Scopes"}/>
                        </ListItemButton>
                    </ListItem>
                    <ListItem key={"prompts"} disablePadding>
                        <ListItemButton onClick={() => navigate("/prompts")}>
                            <ListItemIcon>
                                <ContentPasteIcon color="primary"/>
                            </ListItemIcon>
                            <ListItemText primary={"Prompts"}/>
                        </ListItemButton>
                    </ListItem>
                    <ListItem key={"runs"} disablePadding>
                        <ListItemButton onClick={() => navigate("/runs")}>
                            <ListItemIcon>
                                <PlayCircleOutlineIcon color="primary"/>
                            </ListItemIcon>
                            <ListItemText primary={"Runs"}/>
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>
        </Drawer>
    )
}