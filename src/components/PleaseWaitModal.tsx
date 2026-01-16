import React from "react";
import Modal from "./basic/modal";
import { Loader2 } from "lucide-react";

const PleaseWaitModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <Modal
      isOpen={true}
      showCloseIcon={false}
      onClose={onClose}
      title="Waking up the server 💤"
    >
      <div className="flex flex-col items-center text-center px-4 py-2">
        {/* Spinner */}
        <Loader2 className="h-8 w-8 animate-spin text-blue-600 mb-4" />

        {/* Main message */}
        <p className="text-sm text-gray-700 mb-2 text-center">
          My server was taking a short nap 😴
        </p>

        <p className="text-sm text-gray-700 mb-3">
          I’ve just sent a wake-up call.  
          This may take up few <span className="font-semibold">seconds</span>.
        </p>

        {/* Reassurance */}
        <p className="text-xs text-gray-500">
          Please hang tight — nothing is broken.
        </p>
      </div>
    </Modal>
  );
};

export default PleaseWaitModal;
