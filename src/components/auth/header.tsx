import { Poppins } from "next/font/google";
import Image from "next/image";
import { cn } from "~/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

interface HeaderProps {
  label: string;
}

export const Header = ({ label }: HeaderProps) => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-y-4">
      <h1 className={cn("text-3xl font-semibold", font.className)}>
        <Image src="/logo.svg" height={64} width={180} alt="Logo" />
      </h1>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
};
