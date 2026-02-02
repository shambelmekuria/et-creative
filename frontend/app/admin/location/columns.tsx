"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown, Edit, MoreHorizontal, Trash2Icon } from "lucide-react";
import LocationForm from "@/components/forms/location-form";
import { formatDistance, subDays } from "date-fns";
import { LocationDeleteDialog } from "./delete-location";
export type Payment = {
  id: number;
  name: string;
  region: string;
  zone: string;
  wereda: string;
  created_at: Date;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "name",
    header: "Location Name",
  },
  {
    accessorKey: "region",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Region
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "zone",
    header: "Zone",
  },
  {
    accessorKey: "wereda",
    header: "Wereda",
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }) => {
      const created_at = new Date(row.getValue("created_at"));
      // return formatDistance(created_at, new Date());
      return formatDistance(created_at, new Date(), {addSuffix: true});
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <LocationForm
                location={{
                  id: row.original.id,
                  name: row.original.name,
                  region: row.original.region,
                  zone: row.original.zone,
                  wereda: row.original.wereda,
                }}
              />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive" asChild><LocationDeleteDialog data={{id:row.original.id,
            name: row.original.name,
            message:"Are You Sure Delete"

            }}/></DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
