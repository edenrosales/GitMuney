import React, {useContext,useState,useEffect} from "react";
import { ThemeContext } from "react-navigation";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// import PocketBase from 'pocketbasea'

const FBContext = React.createContext() 
const FBUpdateContext = React.createContext() 
const DBContext = React.createContext()

export function useFB() { 
    return useContext(FBContext)
}

export function useDB() { 
    return useContext(DBContext)
}
// export function useFBUpdate() { 
//     return useContext(FBUpdateContext)
// }

export function ThemeProvider({children}) { 
    const firebaseConfig = {
        apiKey: "AIzaSyDV3Qc5xTGiR9g7_71qEVV_80sQZzsa89c",
        authDomain: "gitmuney-3222e.firebaseapp.com",
        projectId: "gitmuney-3222e",
        storageBucket: "gitmuney-3222e.appspot.com",
        messagingSenderId: "847719830073",
        appId: "1:847719830073:web:66f41e044fb30ea21273e8",
        measurementId: "G-0CT8W111V2"
      };
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);     
    const database = getFirestore(app);   
    // useEffect(()=>{
    //     pbUpdate('')
    // },[])
//http://10.0.2.2:8090/
//'http://127.0.0.1:8090'
    const [fb,setFb] = useState(app)
    const [db,setDb] = useState(database)
    
    // pbUpdate("this works")
    // console.log(pb)
    return(
        <FBContext.Provider value = {fb}>
            {/* <FBUpdateContext.Provider value = {setFb}> */}
            <DBContext.Provider value = {db}>
                {children}
            </DBContext.Provider>
            
                
            {/* </FBUpdateContext.Provider> */}
        </FBContext.Provider>
    )
}