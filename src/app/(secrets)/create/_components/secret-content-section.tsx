interface SecretContentSectionProps {
  content: string;
  onContentChange: (content: string) => void;
}

export function SecretContentSection({ content, onContentChange }: SecretContentSectionProps) {
  return (
    <div className="space-y-2">
      <label
        htmlFor="content"
        className="block text-xs font-semibold uppercase tracking-wider text-[#6a6a7a]"
      >
        Secret message
      </label>
      <textarea
        id="content"
        placeholder="Enter passwords, API keys, confidential messages, or any sensitive information..."
        className="max-h-[180px] min-h-[120px] w-full resize-none rounded-lg border border-white/5 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-[#4a4a5a] outline-none transition-all duration-200 focus:border-[#C9A84C]/40 focus:bg-white/[0.05] focus:shadow-[0_0_0_3px_rgba(201,168,76,0.08)]"
        value={content}
        onChange={(e) => onContentChange(e.target.value)}
      />
      <p className="text-right text-[10px] text-[#4a4a5a]">
        {content.length} characters
      </p>
    </div>
  );
}