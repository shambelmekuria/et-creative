"use client"
import { deleteCategory } from "@/actions/category";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

type deleteCategoryData = {
  id: number,
  name: string,
  message: string
}
type CategoryDeleteDialogProps = {
  data: deleteCategoryData
}

export function CategoryDeleteDialog({ data }: CategoryDeleteDialogProps) {
  const [open, setOpen] = useState(false)
  async function handleDelete() {
    const res = await deleteCategory(data.id);
    if (res.success){
      setOpen(false)
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>

      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="w-full text-red-600 hover:text-red-800 hover:bg-red-200 flex  justify-start items-center font-normal"
        >
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Category</DialogTitle>
          <DialogDescription>
            This action will permanently delete this item. You won’t be able
            to recover it later.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
