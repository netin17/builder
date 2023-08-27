"use client";
// src/app/[builder]/index.tsx

const DynamicPage = ({params}:{params: {builder:string}}) => {

  return (
    <div>
      <h1>Dynamic Dynamic Page</h1>
      <p>Builder: {params.builder}</p>
    </div>
  );
};

export default DynamicPage;