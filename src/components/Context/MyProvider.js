import React, { useState } from "react";
import { UserContext } from "./Mycontext";
import { storage } from "../../firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";

function MyProvider({ children }) {
  const [addedLayers, setAddedLayers] = useState([]);
  return (
    <UserContext.Provider
      value={{
        addedLayers,
        setAddedLayers,
        ref,
        uploadBytes,
        listAll,
        getDownloadURL,
        storage,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default MyProvider;
