import { SkeletonAvatar } from "~/components/skeleton-avatar";
import { SkeletonCard } from "~/components/skeleton-card";

export default function Loading() {
  return (
    <>
      <SkeletonAvatar />
      <div className="mx-auto flex max-w-[1100px] flex-wrap justify-center gap-20 px-[20px] py-24">
        {Array.from({ length: 2 }, (_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </>
  );
}
