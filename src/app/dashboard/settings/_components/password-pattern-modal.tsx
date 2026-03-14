import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";

const patterns = [
  { num: "01", title: "Capitalize First Letter", input: "apple27", decoded: "Apple27" },
  { num: "02", title: "Capitalize Last Letter", input: "river42", decoded: "river42R" },
  { num: "03", title: "Alternate Capitals", input: "planet", decoded: "PlAnEt" },
  { num: "04", title: "Append Fixed Symbol", input: "cloud55", decoded: "cloud55!" },
  { num: "05", title: "Double First Letter", input: "stone9", decoded: "sstone9" },
  { num: "06", title: "Add +1 to Each Digit", input: "key129", decoded: "key230" },
  { num: "07", title: "Reverse Numbers", input: "moon47", decoded: "moon74" },
  { num: "08", title: "Multiply Last Digit ×2", input: "star6", decoded: "star12" },
  { num: "09", title: "Insert Symbol in Middle", input: "house88", decoded: "ho@use88" },
  { num: "10", title: "Prefix Site Initial", input: "lock33", decoded: "Clock33 (CipherOnce)" },
];

export function PasswordPatternModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="border-white/5 bg-[#0d0d14] text-white sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-white" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            Password Pattern Reference
          </DialogTitle>
          <DialogDescription className="text-[#6a6a7a]">
            Decode shared passwords using predefined pattern numbers. The sender shares a pattern number and password string — the receiver applies the pattern to decode.
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[420px] space-y-2 overflow-y-auto pr-1">
          {patterns.map(({ num, title, input, decoded }) => (
            <div key={num} className="rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3">
              <div className="mb-2 flex items-center gap-2">
                <span className="font-mono text-[10px] text-[#C9A84C]/60">Pattern {num}</span>
                <span className="text-xs font-semibold text-white">{title}</span>
              </div>
              <div className="flex gap-6 font-mono text-xs">
                <span className="text-[#6a6a7a]">In: <span className="text-white">{input}</span></span>
                <span className="text-[#6a6a7a]">Out: <span className="text-[#C9A84C]">{decoded}</span></span>
              </div>
            </div>
          ))}
        </div>
        <p className="text-[10px] leading-relaxed text-[#4a4a5a]">
          Same input with different pattern numbers produces different decoded results. Pattern selection is required to reconstruct the final password.
        </p>
      </DialogContent>
    </Dialog>
  );
}