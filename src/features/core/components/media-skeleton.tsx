import { Skeleton } from "@/components/ui/skeleton";

interface MediaSkeletonProps {
  className?: string;
}

export function MediaSkeleton({ className }: MediaSkeletonProps) {
  return <Skeleton className={className ? className : "h-40 w-full"} />;
}
