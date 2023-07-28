"use client";

interface IEmptyStateProps {
  title: string;
  subtitle: string;
}

export default function EmptyState({ title, subtitle }: IEmptyStateProps) {
  return (
    <div className="flex flex-row justify-center items-center w-full h-full">
      <div className="flex flex-col items-center gap-2">
        <h1 className="font-bold text-lg">{title}</h1>
        <h2 className="font-base text-base">{subtitle}</h2>
      </div>
    </div>
  );
}
