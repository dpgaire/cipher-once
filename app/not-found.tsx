import { SearchX } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-background via-background to-muted/20 p-6">
      <div className="w-full max-w-sm text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <SearchX className="h-8 w-8 text-primary" />
        </div>
        
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Page Not Found
        </h1>
        <p className="mt-4 text-muted-foreground">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        
        <div className="mt-8">
          <Button asChild>
            <Link href="/">Go Back Home</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
