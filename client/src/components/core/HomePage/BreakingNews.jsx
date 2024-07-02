import React, { useState } from "react";

const BreakingNews = () => {
  const [visible, setVisible] = useState(true);

  return (
    <>
      {visible && (
        <div className="grid gap-3 lg:flex mt-5 items-center text-white bg-red-600 px-5 py-4 md:rounded-lg max-w-7xl mx-auto ">
          <p className="text-2xl lg:text-3xl font-bold">BREAKING NEWS</p>
          <p className="text-xl lg:ml-4 md:ml-8">
            गुजरात के कच्छ में महसूस किए गए भूकंप के झटके, रिक्टर स्केल पर 3.4
            मापी गई तीव्रता
          </p>
          <p
            className="hidden sm:block lg:ml-auto text-white font-bold text-xl cursor-pointer"
            onClick={() => setVisible(false)}
          >
            X
          </p>
        </div>
      )}
    </>
  );
};

export default BreakingNews;
