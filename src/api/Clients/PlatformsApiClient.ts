import { PlatformModel } from "../Models/PlatformModel";
import { AIPlaygroundApiClient } from "../Base/BaseApiClient";
import { Air } from "@mui/icons-material";

export const PlatformsApiClient = {
    urlPath: "Platforms",

    getAllAsync(): Promise<PlatformModel[]> {
        return AIPlaygroundApiClient.get<PlatformModel[]>(this.urlPath).then(
            (response) => response.data
        );
    },

    getOneAsync(id: number): Promise<PlatformModel> {
        return AIPlaygroundApiClient.get<PlatformModel>(
            this.urlPath + "/" + id
        ).then((response) => response.data)
    }
}