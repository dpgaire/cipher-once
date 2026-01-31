import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export function PasswordPatternModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Password Pattern Reference</DialogTitle>
          <DialogDescription>
            Decode shared passwords using predefined pattern numbers.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 max-h-[500px] overflow-y-auto text-sm leading-relaxed">
          <p>
            The sender shares:
            <br />
            <strong>• Pattern Number</strong>
            <br />
            <strong>• Password String</strong>
          </p>

          <p>
            The receiver applies the selected pattern to decode the final password.
            The password string alone is incomplete.
          </p>

          {/* PATTERN 01 */}
          <div className="p-4 bg-muted rounded-md">
            <p className="font-semibold">Pattern 01 — Capitalize First Letter</p>
            <p className="font-mono">Input: apple27</p>
            <p className="font-mono">Decoded: Apple27</p>
          </div>

          {/* PATTERN 02 */}
          <div className="p-4 bg-muted rounded-md">
            <p className="font-semibold">Pattern 02 — Capitalize Last Letter</p>
            <p className="font-mono">Input: river42</p>
            <p className="font-mono">Decoded: river42R</p>
          </div>

          {/* PATTERN 03 */}
          <div className="p-4 bg-muted rounded-md">
            <p className="font-semibold">Pattern 03 — Alternate Capitals</p>
            <p className="font-mono">Input: planet</p>
            <p className="font-mono">Decoded: PlAnEt</p>
          </div>

          {/* PATTERN 04 */}
          <div className="p-4 bg-muted rounded-md">
            <p className="font-semibold">Pattern 04 — Append Fixed Symbol</p>
            <p className="font-mono">Input: cloud55</p>
            <p className="font-mono">Decoded: cloud55!</p>
          </div>

          {/* PATTERN 05 */}
          <div className="p-4 bg-muted rounded-md">
            <p className="font-semibold">Pattern 05 — Double First Letter</p>
            <p className="font-mono">Input: stone9</p>
            <p className="font-mono">Decoded: sstone9</p>
          </div>

          {/* PATTERN 06 (Math) */}
          <div className="p-4 bg-muted rounded-md">
            <p className="font-semibold">Pattern 06 — Add +1 to Each Digit</p>
            <p className="font-mono">Input: key129</p>
            <p className="font-mono">Decoded: key230</p>
          </div>

          {/* PATTERN 07 (Math) */}
          <div className="p-4 bg-muted rounded-md">
            <p className="font-semibold">Pattern 07 — Reverse Numbers</p>
            <p className="font-mono">Input: moon47</p>
            <p className="font-mono">Decoded: moon74</p>
          </div>

          {/* PATTERN 08 (Math) */}
          <div className="p-4 bg-muted rounded-md">
            <p className="font-semibold">Pattern 08 — Multiply Last Digit ×2</p>
            <p className="font-mono">Input: star6</p>
            <p className="font-mono">Decoded: star12</p>
          </div>

          {/* PATTERN 09 */}
          <div className="p-4 bg-muted rounded-md">
            <p className="font-semibold">Pattern 09 — Insert Symbol in Middle</p>
            <p className="font-mono">Input: house88</p>
            <p className="font-mono">Decoded: ho@use88</p>
          </div>

          {/* PATTERN 10 */}
          <div className="p-4 bg-muted rounded-md">
            <p className="font-semibold">Pattern 10 — Prefix Site Initial</p>
            <p className="font-mono">Input: lock33</p>
            <p className="font-mono">Decoded (CipherOnce): Clock33</p>
          </div>

          <p className="text-muted-foreground">
            Same input with different pattern numbers produces different decoded results.
            Pattern selection is required to reconstruct the final password.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
