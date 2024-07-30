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
      "mutation ($myItemName: String!, $columnVals: JSON!) { create_item (board_id:MY_BOARD_ID, item_name:$myItemName, column_values:$columnVals) { id } }"; //Paste your board ID here 
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
          "MY_API_KEY", //Paste your Monday.com API key here
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
