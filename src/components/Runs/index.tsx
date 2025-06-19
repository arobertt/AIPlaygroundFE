import { FC, useEffect, useState } from "react";
import "./Runs.css";
import { RunsApiClient } from "../../api/Clients/RunsApiClient";
import {
  Box,
  Button,
  IconButton,
  Paper,
  Popover,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Collapse,
} from "@mui/material";
import { Star, Search, Close } from "@mui/icons-material";
import { EmptyTableRow } from "../common/EmptyTableRow";
import { LoadingRow } from "../common/LoadingRow";
import { TableHeader } from "../common/TableHeader";
import { renderLabelDisplayedRows } from "../shared/utils/table.util";
import { RunGetModel } from "../../api/Models/RunGetModel";
import { RunGet } from "../shared/types/RunGet";
import { ModelsApiClient } from "../../api/Clients/ModelsApiClient";
import { PromptsApiClient } from "../../api/Clients/PromptsApiClient";

export const Runs: FC = () => {
  const [runs, setRuns] = useState<RunGet[]>([]);
  const [filteredRuns, setFilteredRuns] = useState<RunGet[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [ratingValue, setRatingValue] = useState<number | "">("");
  const [selectedRunId, setSelectedRunId] = useState<number | null>(null);
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const columns = [
    {
      id: "id",
      label: "Id",
    },
    {
      id: "promptName",
      label: "Prompt name",
    },
    {
      id: "expectedResult",
      label: "Expected result",
    },
    {
      id: "actualResult",
      label: "Actual result",
    },
    {
      id: "model",
      label: "Model",
    },
    {
      id: "rating",
      label: "Rating",
    },
    {
      id: "userRating",
      label: "User rating",
    },
    {
      id: "actions",
      label: "Actions",
    },
  ];
  
  const fetchRuns = async () => {
    try {
      setIsLoading(true);
  
      const res = await RunsApiClient.getAllAsync();
  
      const enrichedRuns: RunGet[] = await Promise.all(
        res.map(async (run: RunGetModel) => {
          const [model, prompt] = await Promise.all([
            ModelsApiClient.getOneAsync(run.model),
            PromptsApiClient.getOneAsync(run.prompt),
          ]);
  
          return {
            id: run.id!,
            actualResponse: run.actualResponse,
            temperature: run.temperature,
            rating: run.rating,
            userRating: run.userRating,
            model,
            prompt,
          };
        })
      );
  
      setRuns(enrichedRuns);
      setFilteredRuns(enrichedRuns);
    } catch (error: any) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchToggle = () => {
    setSearchExpanded(!searchExpanded);
    if (searchExpanded) {
      setSearchTerm("");
      setFilteredRuns(runs);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    if (term === "") {
      setFilteredRuns(runs);
    } else {
      const filtered = runs.filter((run) =>
        run.id.toString().toLowerCase().includes(term) ||
        run.prompt.name.toLowerCase().includes(term) ||
        run.prompt.expectedResult.toLowerCase().includes(term) ||
        run.actualResponse.toLowerCase().includes(term) ||
        run.model.name!.toLowerCase().includes(term) ||
        run.rating?.toString().toLowerCase().includes(term) ||
        run.userRating?.toString().toLowerCase().includes(term)
      );
      setFilteredRuns(filtered);
    }
  };

  const renderActions = (run: RunGet) => {
    const open = Boolean(anchorEl);

    const handleOpen = (
      event: React.MouseEvent<HTMLElement>,
      runId: number
    ) => {
      setAnchorEl(event.currentTarget);
      setSelectedRunId(runId);
    };

    const handleClose = () => {
      setAnchorEl(null);
      setRatingValue("");
      setSelectedRunId(null);
    };

    const handleGiveRating = async () => {
      if (
        selectedRunId != null &&
        ratingValue !== "" &&
        ratingValue >= 0 &&
        ratingValue <= 100
      ) {
        await RunsApiClient.rateAsync(selectedRunId, ratingValue);
        await fetchRuns();
        handleClose();
      }
    };

    return (
      <>
        <IconButton onClick={(e) => handleOpen(e, run.id)}>
          <Star color="primary" fontSize="large" />
        </IconButton>
        <Popover
          open={open && selectedRunId === run.id}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          transformOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Box
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              gap: 1,
              width: 300,
            }}
          >
            <TextField
              label="Rating (0-100)"
              type="number"
              fullWidth
              value={ratingValue}
              onChange={(e) => setRatingValue(Number(e.target.value))}
              slotProps={{
                htmlInput: {
                  min: 0,
                  max: 100,
                },
              }}
            />
            <Button
              onClick={handleGiveRating}
              disabled={
                ratingValue === "" || ratingValue < 0 || ratingValue > 100
              }
            >
              Submit
            </Button>
          </Box>
        </Popover>
      </>
    );
  };

  useEffect(() => {
    fetchRuns();
  }, []);

  return (
    <Box className={"runs-wrapper"}>
      <Stack flexDirection="row" justifyContent="center" spacing={2} alignItems="center">
        <Box className={"runs-title"}>Runs</Box>
        <Box >
          <IconButton onClick={handleSearchToggle} color="primary">
          {searchExpanded ? <Close fontSize="large" /> : <Search fontSize="large" />}
          </IconButton>
        </Box>
      </Stack>

      <Collapse in={searchExpanded}>
        <Box sx={{ mb: 2, display: "flex", justifyContent: "center" }}>
          <TextField
            label="Search runs..."
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{ width: 400 }}
            autoFocus
          />
        </Box>
      </Collapse>

      <Box>
        <TableContainer component={Paper} className={"runs-table-container"}>
          <Table>
            <TableHeader columns={columns}/>
            <TableBody>
              {filteredRuns && filteredRuns.length ? (
                <>
                  {filteredRuns.map((run: RunGet, index: number) => (
                    <TableRow key={index} className={"runs-table-row"}>
                      <TableCell align="center">{run.id}</TableCell>
                      <TableCell align="center">{run.prompt.name}</TableCell>
                      <TableCell align="center">
                        {run.prompt.expectedResult}
                      </TableCell>
                      <TableCell align="center">{run.actualResponse}</TableCell>
                      <TableCell align="center">{run.model.name}</TableCell>
                      <TableCell align="center">{run.rating}</TableCell>
                      <TableCell align="center">{run.userRating}</TableCell>
                      <TableCell align="center">{renderActions(run)}</TableCell>
                    </TableRow>
                  ))}
                </>
              ) : isLoading ? (
                <LoadingRow />
              ) : (
                <EmptyTableRow />
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Box className={"runs-table-footer"}>
          {renderLabelDisplayedRows(filteredRuns.length, "runs")}
        </Box>
      </Box>
    </Box>
  );
};