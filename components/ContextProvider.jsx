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
const authStates = {
  NotLoggedIn: "Not Logged In",
  ConfigCompleted: "Config Completed",
  ConfigNotCompleted: "Config Not Completed",
};

const ExpensesContext = React.createContext();
const CategoriesContext = React.createContext();
const TotalSpentContext = React.createContext();
const BudgetContext = React.createContext();
const AppStateContext = React.createContext();
const AppStateUpdateContext = React.createContext();
const PendingSortContext = React.createContext();
const ExcludedContext = React.createContext();
const CategoriesEmojisContext = React.createContext();

export const useCategoryEmoji = () => {
  return useContext(CategoriesEmojisContext);
};
export const usePendingSort = () => {
  return useContext(PendingSortContext);
};
export const useExcluded = () => {
  return useContext(ExcludedContext);
};
export const useAppStateUpdate = () => {
  return useContext(AppStateUpdateContext);
};
export const useAppState = () => {
  return useContext(AppStateContext);
};
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
  const [loading, setLoading] = useState(true);
  const [authState, setAuthState] = useState(authStates.NotLoggedIn);
  const [authenticated, setAuthenticated] = useState(false);
  const [clearCleanupFunctions, setClearCleanupFunctions] = useState(false);
  const [pendingSort, setPendingSort] = useState({});
  const [excluded, setExcluded] = useState({});
  // const [categoriesEmojis, setCategoriesEmojis] = useState({});

  const clearData = () => {
    setExpenses({});
    setCategories({});
    setTotalSpent(0);
    setBudget(1);
    setPendingSort({});
    setExcluded({});
  };
  useEffect(() => {
    if (!authenticated) {
      return;
    }
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
          const notSorted = {};
          const excluded = {};
          result.forEach((transaction) => {
            const data = transaction.data();
            if (data.excluded) {
              excluded[transaction.id] = {
                ...data,
                key: transaction.id,
              };
            } else if (data.pendingSort) {
              notSorted[transaction.id] = {
                ...data,
                key: transaction.id,
              };
            } else {
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
            }
          });
          setExpenses(() => {
            console.log("expenses updated");
            return { ...transactions };
          });
          setPendingSort(() => {
            return { ...notSorted };
          });
          setExcluded(() => {
            return { ...excluded };
          });
          setCategories((previousCategories) => {
            // debugger;
            const categories = { ...previousCategories, ...newCategories };
            for (category of Object.keys(categories)) {
              categories[category] = {
                ...previousCategories[category],
                ...categories[category],
              };
            }

            return categories;
            //i didnt know you could do this in js
            //makes a new object and replaces all the keys that are identical in the first and second with the latter most object
            // return { ...previousCategories, ...newCategories };
          });
          setTotalSpent(currentSpent);
        },
        (err) => {
          console.log("error here1");
          console.log(err);
        }
      );
    return () => subscriber();
  }, [authenticated]);

  useEffect(() => {
    let subscriber;
    if (authenticated) {
      console.log("this ran in");
      subscriber = firestore()
        .collection("users")
        .doc(auth().currentUser.uid)
        .onSnapshot(
          (documentSnapshot) => {
            const data = documentSnapshot.data();
            const categories = {};
            data.categories.forEach((category) => {
              categories[category.name] = {
                key: category.name,
                total: 0,
                icon: category.icon,
              };
            });
            // setCategoriesEmojis(data.categoriesEmojis);
            setCategories((prev) => {
              // debugger;
              for (category of Object.keys(categories)) {
                categories[category] = {
                  ...categories[category],
                  ...prev[category],
                };
              }
              return categories;
            });
            setBudget(data.budget);
            setAuthState(() => {
              if (data.firstLogin === true) {
                return authStates.ConfigNotCompleted;
              } else {
                return authStates.ConfigCompleted;
              }
            });
          },
          (err) => {
            console.log("error here2");
            console.log(err);
          }
        );
    }
    return () => {
      if (subscriber) {
        subscriber();
      }
    };
  }, [authenticated]);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);
  useEffect(() => {
    console.log("AUTH STATE: " + authState);
  }, [authState]);
  useEffect(() => {
    console.log("AUTHENTICATION STATE: " + authenticated);
  }, [authenticated]);
  const onAuthStateChanged = async () => {
    if (auth().currentUser) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
      setAuthState(authStates.NotLoggedIn);
      clearData();
    }
  };

  return (
    <ExpensesContext.Provider value={expenses}>
      <CategoriesContext.Provider value={categories}>
        <TotalSpentContext.Provider value={totalSpent}>
          <BudgetContext.Provider value={budget}>
            <AppStateContext.Provider value={authState}>
              <PendingSortContext.Provider value={pendingSort}>
                <ExcludedContext.Provider value={excluded}>
                  {children}
                </ExcludedContext.Provider>
              </PendingSortContext.Provider>
            </AppStateContext.Provider>
          </BudgetContext.Provider>
        </TotalSpentContext.Provider>
      </CategoriesContext.Provider>
    </ExpensesContext.Provider>
  );
};
