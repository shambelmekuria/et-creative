"use client";
import { deleteItem } from "@/actions/product-image";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
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
import { Trash } from "lucide-react";
import { useState } from "react";

export function DeleteProductImage({
  product_image_id,
}: {
  product_image_id: string;
}) {
  const [open, setOpen] = useState(false);
  const handleDelete = async () => {
    const res = await deleteItem("api/product-image", product_image_id);
    if (res.success) {
      toast.success("Product image deleted");
    } else {
      toast.error(res.message);
    }
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">
          <Trash size={16} /> Delete
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Delete Product Image</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          This action cannot be undone and the file will be permanently removed
          from servers.
        </DialogDescription>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" variant="destructive" onClick={handleDelete}>
            Confirm Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
