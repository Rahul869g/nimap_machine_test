import React from "react";
import Skeleton from "react-loading-skeleton";

const SkeletonLoader = ({ count = 30 }) => {
  return Array.from({ length: count }, (_, index) => (
    <div key={index} className="movie-card">
      <Skeleton height={200} width={200} />
      <Skeleton height={20} width={150} style={{ marginTop: 10 }} />
      <Skeleton height={15} width={100} style={{ marginTop: 10 }} />
    </div>
  ));
};

export default SkeletonLoader;
