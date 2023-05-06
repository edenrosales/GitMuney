fetch("https://sandbox.plaid.com/link/token/create", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    client_id: "63f3d7137ba715001385d56f",
    secret: "3c60f5b3d2a47477e80b96e6baacde",
    client_name: "GitMuney",
    country_codes: ["US"],
    language: "en",
    user: {
      client_user_id: "123",
    },
    products: ["auth"],
    android_package_name: "com.edenrosales.FinanceTracker",
  }),
})
  .then((data) => {
    return data.json();
  })
  .then((data) => {
    console.log(data);
  });
