import Image from "next/image";

export default function StriveMark({
  className,
  tone = "dark",
}: {
  className?: string;
  /** "dark" = navy mark for light backgrounds. "light" = white mark for dark backgrounds. */
  tone?: "dark" | "light";
}) {
  return (
    <div className={`relative ${className ?? ""}`}>
      <Image
        src={tone === "light" ? "/strive-mark-light.png" : "/strive-mark.png"}
        alt="Strive logo"
        fill
        className="object-contain"
        priority
      />
    </div>
  );
}
