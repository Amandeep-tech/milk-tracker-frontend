import React from "react";

interface IShimmerProps {
  className?: string;
  width?: string;
  height?: string;
}

const Shimmer = (props: IShimmerProps) => {
  const { className, width, height } = props;
  return (
    <div
      className={`w-full h-full bg-gray-200 rounded-md animate-pulse ${className}`}
      style={{ width, height }}
    ></div>
  );
};

export default Shimmer;
