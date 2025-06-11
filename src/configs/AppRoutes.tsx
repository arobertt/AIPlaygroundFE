import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import App from "../App";
import { Home } from "../components/Home";
import { Platforms } from "../components/Platforms";
import { Prompts } from "../components/Prompts";
import { Runs } from "../components/Runs";
import { Scopes } from "../components/Scopes";

export const AppRoutes: FC = () => {
    return (
        <Routes>
            <Route path={"/"} element={<App/>}>
                <Route path={"/"} element={<Home/>}/>
                <Route path={"/platforms"} element={<Platforms/>}/>
                <Route path={"/scopes"} element={<Scopes/>}/>
                <Route path={"/prompts"} element={<Prompts/>}/>
                <Route path={"/runs"} element={<Runs/>}/>
                <Route path={"/"} element={<div>Not Found</div>}/>
            </Route>
        </Routes>
    );
};