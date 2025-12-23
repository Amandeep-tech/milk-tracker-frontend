import React from "react";
import Modal from "./basic/modal";
import { toast } from "react-toastify";
import Link from "next/link";


interface IPinModal {
  onSuccess?: () => void;
}

const PinModal = ({ onSuccess }: IPinModal) => {
  const [value, setValue] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = () => {
    if (value.length !== 4) {
      toast.error("Please enter a 4-digit PIN");
      return;
    }

    setLoading(true);

    // simulate async verification
    setTimeout(() => {
      if (value === process.env.NEXT_PUBLIC_APP_PIN) {
        localStorage.setItem("x-app-pin", value);
        toast.success("Access granted");
        onSuccess?.();
      } else {
        toast.error("Incorrect PIN");
        setValue("");
      }
      setLoading(false);
    }, 400);
  };

  return (
    <Modal isOpen={true} onClose={() => {}} title="Security Check">
      <div className="flex flex-col items-center text-center gap-4">
        {/* Icon / visual cue */}
        <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xl font-bold">
          🔒
        </div>

        <p className="text-sm text-gray-600">
          Enter your <span className="font-medium text-gray-900">4-digit PIN</span> to
          access Milk Tracker
        </p>

        <input
          type="password"
          inputMode="numeric"
          maxLength={4}
          autoFocus
          value={value}
          onChange={(e) => {
            const val = e.target.value;
            if (/^\d*$/.test(val)) {
              setValue(val);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSubmit();
          }}
          className="w-full max-w-xs text-center tracking-widest text-lg font-semibold
                     border rounded-md px-4 py-2
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="••••"
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full max-w-xs bg-blue-600 text-white py-2 rounded-md
                     hover:bg-blue-700 transition disabled:opacity-60"
        >
          {loading ? "Verifying..." : "Unlock"}
        </button>

        <p className="text-xs text-gray-400 mt-2">
          Need access? Contact{" "}
          <span className="font-medium"> 
						<Link href="mailto:amandeepinterview@gmail.com"
						className="hover:text-blue-600 underline"
						>amandeepinterview@gmail.com
						</Link>
					</span>
        </p>
				<div>OR</div>
				<Link href={"https://singhamandeep.dev"} target="_blank" className="text-blue-600 hover:underline">
					Aman's Portfolio
				</Link>
      </div>
    </Modal>
  );
};

export default PinModal;
