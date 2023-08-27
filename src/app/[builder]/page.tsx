"use client";
// src/app/[builder]/index.tsx

const BuilderPage = ({params}:{params: {builder:string}}) => {

  return (
    <div>
      <h1>Dynamic Builder Page</h1>
      <p>Builder: {params.builder}</p>
    </div>
  );
};

export default BuilderPage;