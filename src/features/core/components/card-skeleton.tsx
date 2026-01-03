import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type CardSkeletonProps = {
  header?: boolean;
  lines?: number;
  className?: string;
};

export function CardSkeleton({
  header = true,
  lines = 3,
  className,
}: CardSkeletonProps) {
  return (
    <Card className={cn("w-full", className)}>
      {header && (
        <CardHeader>
          <Skeleton className="h-6 w-3/5" />
          <Skeleton className="h-4 w-4/5" />
        </CardHeader>
      )}
      <CardContent className="space-y-3">
        {Array.from({ length: lines }).map((_, i) => (
          <Skeleton
            key={i}
            className={`h-4 ${
              i === 0 ? "w-full" : i === 1 ? "w-5/6" : "w-1/2"
            }`}
          />
        ))}
      </CardContent>
    </Card>
  );
}
