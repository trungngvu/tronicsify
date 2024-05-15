import React, { useState } from "react";

const CollapsibleDiv = ({ maxHeight = 700, children }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleCollapse = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="relative overflow-hidden ">
      <div
        className={`overflow-hidden ${
          isExpanded ? "" : "h-${maxHeight}"
        } transition-all duration-300 ease-in-out`}
        style={{ maxHeight: isExpanded ? "none" : `${maxHeight}px` }}
      >
        {children}
      </div>
      {children.props?.style && children.props.style.height ? (
        children.props.style.height > maxHeight && (
          <button
            onClick={toggleCollapse}
            className="absolute bottom-0 right-0 px-4 py-2 font-semibold text-blue-500 bg-white"
          >
            {isExpanded ? "Show Less" : "Show More"}
          </button>
        )
      ) : (
        <button
          onClick={toggleCollapse}
          className="absolute bottom-0 right-0 px-4 py-2 font-semibold text-blue-500 bg-white"
        >
          {isExpanded ? "Show Less" : "Show More"}
        </button>
      )}
    </div>
  );
};

export default CollapsibleDiv;
