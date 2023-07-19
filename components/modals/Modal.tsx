"use client";

interface IModalProps {
  body: React.ReactNode;
  footer?: React.ReactNode;
  title: string;
  action: () => void;
  actionLabel: string;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
}

export default function Modal({
  body,
  footer,
  title,
  action,
  actionLabel,
  secondaryAction,
  secondaryActionLabel,
}: IModalProps) {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-transparent">
      <div className="flex flex-col gap-8 p-10 border rounded-xl bg-white drop-shadow-xl">
        <h1 className="text-center font-bold text-xl">{title}</h1>
        <div>{body}</div>
        <div>{footer}</div>
      </div>
    </div>
  );
}
