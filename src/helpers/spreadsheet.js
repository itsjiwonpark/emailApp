import config from "../../config";

export function load(callback, data) {
  const range = "시트1" + data;
  console.log(range);
  window.gapi.client.load("sheets", "v4", () => {
    window.gapi.client.sheets.spreadsheets.values
      .append({
        spreadsheetId: config.spreadsheetId,
        range: "시트1!A1",
        valueInputOption: "USER_ENTERED",
        resource: {
          value: [["hi"]]
        }
      })
      .then(
        response => {
          var result = response.result;
          console.log(`${result.updates.updatedCells} cells appended.`);
          callback(result);
        },
        response => {
          callback(false, response.result.error);
          console.log(response.result.error);
        }
      );

    // window.gapi.client.sheets.spreadsheets.values
    //   .get({
    //     spreadsheetId: config.spreadsheetId,
    //     range: "시트1!A1:A5",
    //     majorDimension: "COLUMNS"
    //   })
    //   .then(
    //     response => {
    //       const emailLists = response.result.values[0];
    //       // const cars =
    //       //   data.map(car => ({
    //       //     year: car[0],
    //       //     make: car[1],
    //       //     model: car[2]
    //       //   })) || [];
    //       callback({
    //         emailLists
    //       });
    //     },
    //     response => {
    //       callback(false, response.result.error);
    //     }
    //   );
  });
}

module.hot.accept();
