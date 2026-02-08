"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { type ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import Status from "./status";
import { Product } from "@/types/products";
import { ProductDeleteDialog } from "./delete-product";
import { useRouter } from "next/navigation";

export const columns: ColumnDef<Product>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Product Name
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "price",
    header: () => <div>Price</div>,
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));

      // Format the price as a dollar price.
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price);

      return <div className=" font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "saler_name",
    header: () => <div>Saler Name</div>,
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("saler_name")}</div>
    ),
  },
  {
    accessorKey: "saler_email",
    header: () => <div>Saler Name</div>,
    cell: ({ row }) => {
      if (row.getValue("saler_email")) {
        return <div className="lowercase">{row.getValue("saler_email")}</div>;
      } else return <div className="text-center">-</div>;
    },
  },
  {
    accessorKey: "saler_phone",
    header: () => <div>Phone Number</div>,
    cell: ({ row }) => {
      if (row.getValue("saler_phone")) {
        return <div className="lowercase">{row.getValue("saler_phone")}</div>;
      } else return <div className="text-center">-</div>;
    },
  },
  {
    accessorKey: "saler_location_detail",
    header: () => <div>Saler Location</div>,
    cell: ({ row }) => {
      const location = row.getValue("saler_location_detail") as {
        name: string;
        region: string;
      };
      return (
        <div className="capitalize">
          {location.name},{location.region}
        </div>
      );
    },
  },
  {
    accessorKey: "code",
    header: () => <div>Product Code</div>,
    cell: ({ row }) => <div className="uppercase">{row.getValue("code")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ cell }) => {
      const status = cell.getValue<Product["status"]>();
      return <Status status={status} />;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const Product = row.original;
      const router = useRouter()

      return (
           <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={()=>router.push(`/admin/products/${row.original.id}`)}>Edit</DropdownMenuItem>
                  <DropdownMenuItem variant="destructive" asChild><ProductDeleteDialog data={{id:row.original.id,
                  name: row.original.name,
                  message:"Are You Sure Delete"
      
                  }}/></DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
      );
    },
  },
];
