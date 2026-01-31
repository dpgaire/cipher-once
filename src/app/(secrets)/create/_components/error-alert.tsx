interface ErrorAlertProps {
  error: string | null;
}

/**
 * Component to display error messages
 */
export function ErrorAlert({ error }: ErrorAlertProps) {
  if (!error) return null;

  return (
    <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive border border-destructive/20">
      {error}
    </div>
  );
}