import { SkeletonAvatar } from "~/components/skeleton-avatar";
import { LoadingSpinner } from "~/components/ui/loading-spinner";

export default function Loading() {
  return (
    <>
      <SkeletonAvatar />
      <div className="mx-auto flex max-w-[1100px] flex-wrap justify-center gap-20 px-[20px] py-24">
        <LoadingSpinner />
      </div>
    </>
  );
}
