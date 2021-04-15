// FIGURE THIS OUTTTTT

const parkData = async () => {
  const response = await fetch("/api/faves", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  console.log(response);
  if (response.ok){
    //   loopp through this and update page, query selector, addd elements to page. inside of function tp avpid asynchronise issue***

  }
};
parkData();
console.log(parkData);

// double check working back to "Homepage" button (currently lives on faves.handlebars)
