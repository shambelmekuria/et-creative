"use client"
import { deleteProduct } from "@/actions/product";
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
import { useRouter } from "next/navigation";
import { useState } from "react";

type deleteProductData = {
  id: string,
  name: string,
  message: string
}
type ProductDeleteDialogProps = {
  data: deleteProductData
}

export function ProductDeleteDialog({ data }: ProductDeleteDialogProps) {
  const [open, setOpen] = useState(false)
  async function handleDelete() {
    const res = await deleteProduct(data.id);
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
          <DialogTitle>Delete Product</DialogTitle>
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
