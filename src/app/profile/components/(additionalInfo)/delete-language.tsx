import { useTransition } from "react";
import { deleteLanguage } from "~/actions/profile";
import { Button } from "~/components/ui/button";
import { LoadingSpinner } from "~/components/ui/loading-spinner";
import { toast } from "~/hooks/use-toast";

export default function ButtonDeleteLanguage({
  userId,
  index,
  setEditAdditionalInfo,
}: {
  userId: string;
  index: number;
  setEditAdditionalInfo: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [isPending, startTransition] = useTransition();
  return (
    <Button
      variant="destructive"
      disabled={isPending}
      onClick={() =>
        startTransition(async () => {
          await deleteLanguage({
            userId,
            languageIndex: index,
          })
            .then(() => {
              toast({
                title: "Language deleted",
                description: "Language has been deleted",
              });
              setEditAdditionalInfo(false);
            })
            .catch((error) => {
              toast({
                title: "Error",
                description: `Failed to delete language`,
              });
            });
        })
      }
    >
      Delete
    </Button>
  );
}
