import { FC } from "react";
import "./TableHeader.css"
import { TableCell, TableHead, TableRow } from "@mui/material";

interface TableHeaderProps {
    columns: {
        id: string;
        label: string;
    }[];
}

export const TableHeader: FC<TableHeaderProps> = ({
    columns,
}: TableHeaderProps) => {
    return (
        <TableHead>
            <TableRow className={"table-header"}>
                {columns.map((column) => (
                    <TableCell key={column.id}>{column.label}</TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
};