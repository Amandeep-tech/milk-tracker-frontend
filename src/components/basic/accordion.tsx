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
        className="heading flex flex-row justify-between items-center cursor-pointer"
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
      {openAcc ? <div className="content">{content}</div> : null}
    </div>
  );
};

export default Accordion;
