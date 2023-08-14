import Image from "next/image";

interface ILogoProps {
  size: number;
}

export default function Logo({ size }: ILogoProps) {
  return (
    <div className="flex flex-row gap-1">
      <Image
        className="bg-transparent"
        src="/images/globe-showing-americas_1f30e.png"
        alt="logo"
        width={size}
        height={size}
      />
      <Image
        className="bg-transparent"
        src="/images/pushpin_1f4cc.png"
        alt="logo"
        width={size}
        height={size}
      />
    </div>
  );
}
