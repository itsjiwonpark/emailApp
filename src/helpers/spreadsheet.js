import config from "../../config";

export function load(callback, data) {
  const range = "시트1" + data;
  console.log(range);
  window.gapi.client.load("sheets", "v4", () => {
    window.gapi.client.sheets.spreadsheets.values
      .get({
        spreadsheetId: config.spreadsheetId,
        range: "시트1!A1:A5",
        majorDimension: "COLUMNS"
      })
      .then(
        response => {
          const emailLists = response.result.values[0];
          // const cars =
          //   data.map(car => ({
          //     year: car[0],
          //     make: car[1],
          //     model: car[2]
          //   })) || [];
          callback({
            emailLists
          });
        },
        response => {
          callback(false, response.result.error);
        }
      );
  });
}

module.hot.accept();
