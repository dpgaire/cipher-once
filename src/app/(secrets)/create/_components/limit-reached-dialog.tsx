import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface LimitReachedDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSignUp: () => void;
}

/**
 * Dialog to display when user reaches their secret creation limit
 */
export function LimitReachedDialog({
  isOpen,
  onOpenChange,
  onSignUp,
}: LimitReachedDialogProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Secure link limit reached</AlertDialogTitle>
          <AlertDialogDescription>
            For security reasons, free users can create up to 3 encrypted links.
            Create an account to continue with unlimited access.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onSignUp}>Sign Up</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}