import React from 'react';
import { BeatLoader } from 'react-spinners';

const Loader = () => {
  return (
    <div className="loader">
      <BeatLoader color="#000000" size={15} />
    </div>
  );
};

export default Loader;
