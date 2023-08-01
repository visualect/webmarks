"use client";

import Modal from "./Modal";

export default function EditBookmarkModal() {
  const isOpen = true;
  const body = <div>Test</div>;

  return <Modal body={body} isOpen={isOpen} onClose={() => {}} />;
}
