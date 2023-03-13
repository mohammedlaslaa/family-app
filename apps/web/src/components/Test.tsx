import React, { useRef } from "react";

type P = {
  e: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Test: React.FC<P> = ({ e }) => {
  const divRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={divRef}>
      <input onChange={e}></input>
    </div>
  );
};

<Test e={(t) => t} />;

export default Test;
