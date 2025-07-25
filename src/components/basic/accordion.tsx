import React, { ReactNode, useState } from "react";
import { ChevronDown } from "lucide-react";

interface IAccordionProps {
  heading: string;
  open: boolean;
  content: ReactNode;
  headingClassName?: string;
}

const Accordion = (props: IAccordionProps) => {
  const { heading, open = false, content, headingClassName } = props;

  const [openAcc, setOpenAcc] = useState(open);

  const handleToggle = () => setOpenAcc(!openAcc);

  return (
    <div>
      <div
        className={`heading ${openAcc ? 'border-b border-gray-300 pb-2': '' } 
				flex flex-row justify-between items-center cursor-pointer
				transition-all duration-300 ease-in-out
				`}
        onClick={handleToggle}
      >
        <div className={`text-sm font-medium ${headingClassName}`}>
          {heading || "Heading"}
        </div>
        <div>
          <ChevronDown
            className={`${
              openAcc ? "rotate-180" : ""
            } transition-transform duration-300`}
            size={16}
          />
        </div>
      </div>
      <div 
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          openAcc ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="content py-2">{content}</div>
      </div>
    </div>
  );
};

export default Accordion;
