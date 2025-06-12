import { FC, useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  Typography,
  Stack,
  CircularProgress,
} from "@mui/material";
import { PromptCreateModel } from "../../../api/Models/PromptCreateModel";
import { PromptsApiClient } from "../../../api/Clients/PromptsApiClient";
import { ScopesApiClient } from "../../../api/Clients/ScopesApiClient";
import { Prompt } from "../../shared/types/Prompt";
import { Scope } from "../../shared/types/Scope";
import { ScopeModel } from "../../../api/Models/ScopeModel";

interface CreatePromptPopupProps {
  open: boolean;
  onClose: () => void;
  onCreated: (prompt: Prompt) => void;
}

export const CreatePromptPopup: FC<CreatePromptPopupProps> = ({
  open,
  onClose,
  onCreated,
}) => {
  const [promptData, setPromptData] = useState({
    name: "",
    systemMessage: "",
    userMessage: "",
    expectedResult: "",
    scopeId: "",
  });
  const [scopes, setScopes] = useState<Scope[]>([]);
  const [isLoadingScopes, setIsLoadingScopes] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const fetchScopes = async () => {
    try {
      setIsLoadingScopes(true);
      const res = await ScopesApiClient.getAllAsync();
      const fetchedScopes = res.map((e: ScopeModel) => ({ ...e } as Scope));
      setScopes(fetchedScopes);
    } catch (error: any) {
      console.log(error);
    } finally {
      setIsLoadingScopes(false);
    }
  };

  const createPrompt = async () => {
    const model: PromptCreateModel = {
      name: promptData.name,
      systemMessage: promptData.systemMessage,
      userMessage: promptData.userMessage,
      expectedResult: promptData.expectedResult,
      scopeId: parseInt(promptData.scopeId),
    };

    try {
      setIsSaving(true);
      const res = await PromptsApiClient.createOneAsync(model);
      return res;
    } catch (error: any) {
      console.log(error);
      throw error;
    } finally {
      setIsSaving(false);
    }
  };

  const handleClose = () => {
    setPromptData({
      name: "",
      systemMessage: "",
      userMessage: "",
      expectedResult: "",
      scopeId: "",
    });
    onClose();
  };

  const handleSave = async () => {
    try {
      const promptModel = await createPrompt();
      const newPrompt = promptModel as Prompt;
      onCreated(newPrompt);
      handleClose();
    } catch (error) {
      // Handle error appropriately
      console.error("Failed to create prompt:", error);
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setPromptData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const isFormValid = () => {
    return (
      promptData.name.trim() !== "" &&
      promptData.systemMessage.trim() !== "" &&
      promptData.userMessage.trim() !== "" &&
      promptData.expectedResult.trim() !== "" &&
      promptData.scopeId !== ""
    );
  };

  useEffect(() => {
    if (open) {
      fetchScopes();
    }
  }, [open]);

  return (
    <Dialog fullWidth maxWidth="md" open={open} onClose={handleClose}>
      <DialogTitle fontSize={24}>Create a new prompt</DialogTitle>
      <DialogContent sx={{ padding: "1rem" }}>
        {isLoadingScopes ? (
          <Stack justifyContent="center" alignItems="center" height="200px">
            <CircularProgress />
          </Stack>
        ) : (
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={promptData.name}
              onChange={handleChange}
              required
            />
            
            <TextField
              select
              fullWidth
              label="Scope"
              name="scopeId"
              value={promptData.scopeId}
              onChange={handleChange}
              required
            >
              {scopes.map((scope) => (
                <MenuItem key={scope.id} value={scope.id}>
                  {scope.name}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              fullWidth
              label="System Message"
              name="systemMessage"
              value={promptData.systemMessage}
              onChange={handleChange}
              multiline
              rows={3}
              required
            />

            <TextField
              fullWidth
              label="User Message"
              name="userMessage"
              value={promptData.userMessage}
              onChange={handleChange}
              multiline
              rows={3}
              required
            />

            <TextField
              fullWidth
              label="Expected Result"
              name="expectedResult"
              value={promptData.expectedResult}
              onChange={handleChange}
              multiline
              rows={3}
              required
            />
          </Stack>
        )}
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", padding: "1rem" }}>
        <Button onClick={handleClose} variant="outlined" disabled={isSaving}>
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          disabled={!isFormValid() || isSaving || isLoadingScopes}
          sx={{ color: "#fff" }}
        >
          {isSaving ? <CircularProgress size={20} /> : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};