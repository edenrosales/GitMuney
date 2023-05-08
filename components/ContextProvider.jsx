import React, { useContext, useState, useEffect, useReducer } from "react";
import auth from "@react-native-firebase/auth";
import firestore, { Timestamp } from "@react-native-firebase/firestore";
import Categories from "./Categories";
import { debug } from "react-native-reanimated";

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
const DateContext = React.createContext();
const DateDispatchContext = React.createContext();
const SortCategoriesContext = React.createContext();
const UserSettingsContext = React.createContext();
const AccessTokenContext = React.createContext();
const CursorContext = React.createContext();

export const useCursor = () => {
  return useContext(CursorContext);
};

export const useUserSettings = () => {
  return useContext(UserSettingsContext);
};
export const useSortCategories = () => {
  return useContext(SortCategoriesContext);
};

export const useDateDispatch = () => {
  return useContext(DateDispatchContext);
};
export const useDate = () => {
  return useContext(DateContext);
};

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
export const useAccessToken = () => {
  return useContext(AccessTokenContext);
};

const handleRefreshes = (needsUpdate) => {
  if (needsUpdate) {
    firestore().collection("users").doc(auth().currentUser.uid).update({
      refreshes: 2,
      lastLogin: new Date(),
    });
  }
};
const changeDate = (state, action) => {
  // debugger;
  let newDate;
  if (action.type === "Increase Month") {
    if (state.getMonth() === 11) {
      newDate = new Date(state.getFullYear() + 1, 0);
    } else {
      newDate = new Date(state.getFullYear(), state.getMonth() + 1);
    }
  } else if (action.type === "Decrease Month") {
    if (state.getMonth() === 0) {
      newDate = new Date(state.getFullYear() - 1, 11);
    } else {
      newDate = new Date(state.getFullYear(), state.getMonth() - 1);
    }
  }
  return newDate;
};

export const ThemeProvider = ({ children }) => {
  // debugger;
  const getDateRange = (date) => {
    console.log("test");
    console.log(date.getMonth());
    return {
      startDate: 0,
      endDate: new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate(),
    };
  };

  const [expenses, setExpenses] = useState({});
  const [sortCategories, setSortCategories] = useState({});
  const [categories, setCategories] = useState({});
  const [totalSpent, setTotalSpent] = useState(0);
  const [budget, setBudget] = useState(1);
  const [loading, setLoading] = useState(true);
  const [authState, setAuthState] = useState(authStates.NotLoggedIn);
  const [authenticated, setAuthenticated] = useState(false);
  const [clearCleanupFunctions, setClearCleanupFunctions] = useState(false);
  const [pendingSort, setPendingSort] = useState({});
  const [excluded, setExcluded] = useState({});
  const [date, dispatchDate] = useReducer(changeDate, new Date());
  const [income, setIncome] = useState({});
  const [userSettings, setUserSettings] = useState({});
  const [accessToken, setAccessToken] = useState("");
  const [cursor, setCursor] = useState("");

  // const [categoriesEmojis, setCategoriesEmojis] = useState({});
  // useEffect(() => {
  //   console.log("sort categories");
  //   console.log(sortCategories);
  // }, [sortCategories]);

  const clearData = () => {
    setExpenses({});
    setCategories({});
    setTotalSpent(0);
    setBudget(1);
    setPendingSort({});
    setExcluded({});
  };
  useEffect(() => {
    console.log("month data");
    console.log(date);
    console.log(getDateRange(date));
  }, [date]);

  useEffect(() => {
    console.log("useEffect 1");
    if (!authenticated) {
      return;
    }

    let { startDate, endDate } = getDateRange(date);
    // console.log("query date");
    // console.log(new Date(date.getFullYear(), date.getMonth(), startDate));
    const subscriber = firestore()
      .collection("users")
      .doc(auth().currentUser.uid)
      .collection("transactions")
      .where(
        "date",
        ">=",
        new Date(date.getFullYear(), date.getMonth(), startDate)
      )
      .where(
        "date",
        "<=",
        new Date(date.getFullYear(), date.getMonth(), endDate)
      )
      .orderBy("date", "desc")
      .onSnapshot(
        (result) => {
          // if (result !== undefined) {
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
              if (!("Excluded" in newCategories)) {
                newCategories["Excluded"] = {
                  total: data.isWithdrawl ? data.cost : -data.cost,
                  categoryName: "Excluded",
                  categoryBackgroundColor: "#52575D",
                  categoryIcon: "🗑️",
                  categoryTextColor: "black",
                  sortOrder: 3,
                };
              } else {
                newCategories["Excluded"].total += data.isWithdrawl
                  ? data.cost
                  : -data.cost;
              }
            } else if (data.pendingSort) {
              notSorted[transaction.id] = {
                ...data,
                key: transaction.id,
              };
            } else {
              currentSpent += data.isWithdrawl ? data.cost : -data.cost;

              transactions[transaction.id] = {
                ...data,
                key: transaction.id,
              };
              if (!(data.categoryName in newCategories)) {
                newCategories[data.categoryName] = {
                  total: data.isWithdrawl ? data.cost : -data.cost,
                  categoryName: data.categoryName,
                  categoryBackgroundColor: data.categoryBackgroundColor,
                  categoryIcon: data.categoryIcon,
                  categoryTextColor: data.categoryTextColor,
                };
              } else {
                newCategories[data.categoryName].total += data.isWithdrawl
                  ? data.cost
                  : -data.cost;
              }
              if (!data.isWithdrawl) {
                if ("Income" in newCategories) {
                  newCategories["Income"].total += data.isWithdrawl
                    ? data.cost
                    : -data.cost;
                } else {
                  newCategories["Income"] = {
                    total: data.isWithdrawl ? data.cost : -data.cost,
                    categoryName: "Income",
                    categoryBackgroundColor: "#52575D",
                    categoryIcon: "💰",
                    categoryTextColor: "black",
                    sortOrder: 2,
                  };
                }
              }
              if ("Intentional" in newCategories) {
                newCategories["Intentional"].total += data.isWithdrawl
                  ? data.cost
                  : -data.cost;
              } else {
                newCategories["Intentional"] = {
                  total: data.isWithdrawl ? data.cost : -data.cost,
                  categoryName: "Intentional",
                  categoryBackgroundColor: "#E3F1FF",
                  categoryIcon: "✔️",
                  categoryTextColor: "black",
                  sortOrder: 1,
                };
              }
            }
          });
          if (!("Excluded" in newCategories)) {
            newCategories["Excluded"] = {
              total: 0,
              categoryName: "Excluded",
              categoryBackgroundColor: "#52575D",
              categoryIcon: "🗑️",
              categoryTextColor: "black",
              sortOrder: 3,
            };
          }
          setExpenses(() => {
            // console.log("expenses updated");
            return { ...transactions };
          });
          setPendingSort(() => {
            return { ...notSorted };
          });
          setExcluded(() => {
            return { ...excluded };
          });
          // // debugger;
          // newCategories.forEach((category)=>{
          //   if(category.total < 0){
          //     return {...category,largerThanZero: }
          //   }
          // })
          setCategories(newCategories);
          setTotalSpent(currentSpent);
          // }
        },
        (err) => {
          console.log("error here1");
          console.log(err);
        }
      );
    return () => subscriber();
  }, [authenticated, date, loading]);

  useEffect(() => {
    console.log("useEffect 2");
    let subscriber;
    if (authenticated) {
      console.log("this ran in");
      subscriber = firestore()
        .collection("users")
        .doc(auth().currentUser.uid)
        .onSnapshot(
          (documentSnapshot) => {
            const data = documentSnapshot.data();
            // debugger;
            if (data !== undefined) {
              const categories = {};
              data.sortCategories.forEach((category) => {
                categories[category.categoryName] = {
                  categoryName: category.categoryName,
                  // categoryTotal: 0,
                  categoryIcon: category.categoryIcon,
                  categoryBackgroundColor: category.categoryBackgroundColor,
                  categoryTextColor: category.categoryTextColor,
                };
              });
              // setCategoriesEmojis(data.categoriesEmojis);
              // debugger;
              setSortCategories(categories);
              setBudget(data.budget);
              setAuthState(() => {
                if (data.firstLogin === true) {
                  return authStates.ConfigNotCompleted;
                } else {
                  return authStates.ConfigCompleted;
                }
              });
              setUserSettings(data);
              setAccessToken(() => {
                return data.accessToken === undefined ? "" : data.accessToken;
              });
              setCursor(() => {
                return data.cursor === undefined ? "" : data.cursor;
              });
              if (data.lastLogin.toDate().getDate() !== new Date().getDate()) {
                handleRefreshes(true);
              } else {
                handleRefreshes(false);
              }
            }
            // }
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
  }, [authenticated, loading]);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);
  useEffect(() => {
    console.log("useEffect 3");
    console.log("AUTH STATE: " + authState);
  }, [authState]);
  useEffect(() => {
    console.log("useEffect 4");
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
  useEffect(() => {
    console.log("Access Token: ");
    console.log(accessToken);
  }, [accessToken]);

  return (
    <ExpensesContext.Provider value={expenses}>
      <CategoriesContext.Provider value={categories}>
        <TotalSpentContext.Provider value={totalSpent}>
          <BudgetContext.Provider value={budget}>
            <AppStateContext.Provider value={authState}>
              <PendingSortContext.Provider value={pendingSort}>
                <ExcludedContext.Provider value={excluded}>
                  <DateContext.Provider value={date}>
                    <DateDispatchContext.Provider value={dispatchDate}>
                      <SortCategoriesContext.Provider value={sortCategories}>
                        <UserSettingsContext.Provider value={userSettings}>
                          <AccessTokenContext.Provider value={accessToken}>
                            <CursorContext.Provider value={cursor}>
                              {children}
                            </CursorContext.Provider>
                          </AccessTokenContext.Provider>
                        </UserSettingsContext.Provider>
                      </SortCategoriesContext.Provider>
                    </DateDispatchContext.Provider>
                  </DateContext.Provider>
                </ExcludedContext.Provider>
              </PendingSortContext.Provider>
            </AppStateContext.Provider>
          </BudgetContext.Provider>
        </TotalSpentContext.Provider>
      </CategoriesContext.Provider>
    </ExpensesContext.Provider>
  );
};
