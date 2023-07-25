interface ITitleProps {
  label: string;
}

export default function Title({ label }: ITitleProps) {
  return <h1 className="font-bold text-3xl">{label}</h1>;
}
