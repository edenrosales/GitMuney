import React, { useContext, useState, useEffect } from "react";
// import { ThemeContext } from "react-navigation";

const FBContext = React.createContext();
const FBUpdateContext = React.createContext();
const DBContext = React.createContext();
// const authContext = React.createContext()
const userContext = React.createContext();
const userUpdatecontext = React.createContext();

export function useFB() {
  return useContext(FBContext);
}
export function useDB() {
  return useContext(DBContext);
}
// export function useAuth(){
//     return useContext(authContext)
// }
export function useUser() {
  return useContext(userContext);
}
export function useUserUpdate() {
  return useContext(userUpdatecontext);
}

// export function useFBUpdate() {
//     return useContext(FBUpdateContext)
// }

export function ThemeProvider({ children }) {
  // const firebaseConfig = {
  //     apiKey: "AIzaSyDV3Qc5xTGiR9g7_71qEVV_80sQZzsa89c",
  //     authDomain: "gitmuney-3222e.firebaseapp.com",
  //     projectId: "gitmuney-3222e",
  //     storageBucket: "gitmuney-3222e.appspot.com",
  //     messagingSenderId: "847719830073",
  //     appId: "1:847719830073:web:66f41e044fb30ea21273e8",
  //     measurementId: "G-0CT8W111V2"
  // };
  // const app = initializeApp(firebaseConfig);
  // // const analytics = getAnalytics(app);
  // const database = getFirestore(app);
  // const authentication = getAuth(app);

  // var ui = new firebaseui.auth.AuthUI(fb.auth());
  const [fb, setFb] = useState();
  const [db, setDb] = useState();
  // const [auth,setAuth] = useState(authentication)
  const [user, setUser] = useState();
  return (
    <FBContext.Provider value={fb}>
      {/* <FBUpdateContext.Provider value = {setFb}> */}
      <DBContext.Provider value={db}>
        <userContext.Provider value={user}>
          <userUpdatecontext.Provider value={setUser}>
            {children}
          </userUpdatecontext.Provider>
        </userContext.Provider>
      </DBContext.Provider>
      {/* </FBUpdateContext.Provider> */}
    </FBContext.Provider>
  );
}
