import React, { useContext, useState, useEffect } from "react";
import auth from "@react-native-firebase/auth";
import firestore, { Timestamp } from "@react-native-firebase/firestore";
import Categories from "./Categories";

{
  /* THE CONCEPT OF CONTEXT IN REACT: 
- use React.createContext() to create a context value that is stored somewhere 
- the value that is returned is the context object
  - does not hold info on its own - just which context other components read or provide(?) 
 */
  //FOR THIS FILE:
  //We do not need to conisder if we are authenticated and if the data exists as this theme context should only be used
  //if we are on post-authentication screens
}

// const FBContext = React.createContext();
const ExpensesContext = React.createContext();
const CategoriesContext = React.createContext();
const TotalSpentContext = React.createContext();
const BudgetContext = React.createContext();
export const useExpenses = () => {
  return useContext(ExpensesContext);
};
export const useCategories = () => {
  return useContext(CategoriesContext);
};
export const useTotalSpent = () => {
  return useContext(TotalSpentContext);
};
export const useBudget = () => {
  return useContext(BudgetContext);
};
export const ThemeProvider = ({ children }) => {
  const [expenses, setExpenses] = useState({});
  const [categories, setCategories] = useState({});
  const [totalSpent, setTotalSpent] = useState(0);
  const [budget, setBudget] = useState(1);

  useEffect(() => {
    const subscriber = firestore()
      .collection("users")
      .doc(auth().currentUser.uid)
      .collection("transactions")
      .orderBy("date", "desc")
      .onSnapshot(
        (result) => {
          let currentSpent = 0;
          const transactions = {};
          const newCategories = {};
          result.forEach((transaction) => {
            const data = transaction.data();
            currentSpent += data.cost;
            transactions[transaction.id] = {
              ...data,
              key: transaction.id,
            };
            if (!(data.category in newCategories)) {
              newCategories[data.category] = {
                key: data.category,
                total: data.cost,
              };
            } else {
              newCategories[data.category].total += data.cost;
            }
          });
          setExpenses(() => {
            console.log("expenses updated");
            return { ...transactions };
          });
          setCategories((previousCategories) => {
            //i didnt know you could do this in js
            //makes a new object and replaces all the keys that are identical in the first and second with the latter most object
            return { ...previousCategories, ...newCategories };
          });
          setTotalSpent(currentSpent);
        },
        (err) => {
          console.log("error here1");
          console.log(err);
        }
      );
    return () => subscriber();
  }, []);

  useEffect(() => {
    const subscriber = firestore()
      .collection("users")
      .doc(auth().currentUser.uid)
      .onSnapshot(
        (documentSnapshot) => {
          const data = documentSnapshot.data();
          const categories = {};
          data.categories.forEach((category) => {
            categories[category] = {
              key: category,
              total: 0,
            };
          });

          setCategories((prev) => {
            return { ...categories, ...prev };
          });
          setBudget(data.budget);
        },
        (err) => {
          console.log("error here2");
          console.log(err);
        }
      );
    return () => subscriber();
  }, []);

  return (
    <ExpensesContext.Provider value={expenses}>
      <CategoriesContext.Provider value={categories}>
        <TotalSpentContext.Provider value={totalSpent}>
          <BudgetContext.Provider value={budget}>
            {children}
          </BudgetContext.Provider>
        </TotalSpentContext.Provider>
      </CategoriesContext.Provider>
    </ExpensesContext.Provider>
  );
};
