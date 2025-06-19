import { ModelBase } from "../Base/BaseModel";
import { ModelModel } from "./ModelModel";
import { PromptModel } from "./PromptModel";

export interface RunGetModel extends ModelBase<number> {
  model: number;
  prompt: number;
  actualResponse: string;
  temperature: number;
  rating: number;
  userRating: number;
}