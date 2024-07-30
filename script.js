document
  .getElementById("questionnaireForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Retrieve values from the form inputs
    const email = document.getElementById("q1").value;
    const favouriteProgram = document.getElementById("q2").value;
    const futurePrograms = document.getElementById("q3").value;

    // Log the collected data to the console
    console.log("Email:", email);
    console.log("Favourite Program:", favouriteProgram);
    console.log("Future Programs:", futurePrograms);

    //Prepare the query
    let query5 =
      "mutation ($myItemName: String!, $columnVals: JSON!) { create_item (board_id:6813606068, item_name:$myItemName, column_values:$columnVals) { id } }";
    let vars = {
      myItemName: "Response",
      columnVals: JSON.stringify({
        text__1: email,
        text7__1: favouriteProgram,
        text1__1: futurePrograms,
      }),
    };

    // Log the GraphQL query to the console
    console.log("GraphQL Query:", query5);

    //Send HTTP Request
    fetch("https://api.monday.com/v2", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjM3MDg3ODUwNSwiYWFpIjoxMSwidWlkIjo2MjAwOTYyMCwiaWFkIjoiMjAyNC0wNi0xMVQxOTowNzozNC45MTVaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MjM4OTIwMDIsInJnbiI6InVzZTEifQ.xkTLwU_pIHoUoif2H6ceVSdanLpsxwUeiTH6j9otb9k",
      },
      body: JSON.stringify({
        query: query5,
        variables: JSON.stringify(vars),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.errors) {
          // Handle errors returned by the API
          console.error("Error:", data.errors);
          alert("There was an error sending your responses. Please try again.");
        } else {
          console.log("Success:", data);
          // Display success message to the user
          document.getElementById("questionnaireForm").classList.add("hidden");
          document.getElementById("thankYouMessage").classList.remove("hidden");
          alert("Your responses have been sent successfully!");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("There was an error sending your responses. Please try again.");
      });
  }); //Add event listener
// API Token: eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjM3MDg3ODUwNSwiYWFpIjoxMSwidWlkIjo2MjAwOTYyMCwiaWFkIjoiMjAyNC0wNi0xMVQxOTowNzozNC45MTVaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MjM4OTIwMDIsInJnbiI6InVzZTEifQ.xkTLwU_pIHoUoif2H6ceVSdanLpsxwUeiTH6j9otb9k
