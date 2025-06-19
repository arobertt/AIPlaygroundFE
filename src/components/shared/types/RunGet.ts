import { ModelModel } from "../../../api/Models/ModelModel";
import { PromptModel } from "../../../api/Models/PromptModel";
import { Model } from "./Model";
import { Prompt } from "./Prompt";

export interface RunGet {
  id: number;
  model: ModelModel;
  prompt: PromptModel;
  actualResponse: string;
  temperature: number;
  rating: number;
  userRating: number;
}