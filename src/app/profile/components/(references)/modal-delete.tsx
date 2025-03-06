import { deleteActionModal } from "~/actions/profile";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../../../components/ui/alert-dialog";
import { Button } from "../../../../components/ui/button";
import { type PrismaClient } from "@prisma/client";
import { toast } from "~/hooks/use-toast";
import { useState } from "react";

type DeleteModalProps = {
  id: number;
  name: keyof Omit<PrismaClient, `$${string}`>;
  isPending: boolean;
};

export function DeleteModal({ id, name, isPending }: DeleteModalProps) {
  const [open, setOpen] = useState(false);
  if (isPending) return null;
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you absolutely sure you want to delete?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            className="bg-red-600 hover:bg-red-500"
            onClick={async () => {
              try {
                await deleteActionModal(id, name);

                toast({ title: "Success", description: "Deleted" });
                setOpen(false);
              } catch (error) {
                toast({ title: "Error", description: "An error occurred" });
              }
            }}
            disabled={isPending}
          >
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
