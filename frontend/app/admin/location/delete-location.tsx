"use client"
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
type deleteLocationData = {
  id:number,
  name:string,
  message:string
}
type LocationDeleteDialogProps={
  data:deleteLocationData
}

export function LocationDeleteDialog({data}:LocationDeleteDialogProps) {
    const router = useRouter()
    async function handleDelete() {
      console.log("Handle delete",data.id)
    }
  return (
    <Dialog>
    
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
            <DialogTitle>Delete Location</DialogTitle>
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
