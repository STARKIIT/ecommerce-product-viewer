const fs = require("fs");
const csv = require("csv-parser");

function readCSV(filePath) {
  const results = [];

  fs.createReadStream(filePath)
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", () => {
      console.log("CSV file data:", results);
    });
}

function writeCSV(filePath, data) {
  const headers = Object.keys(data[0]).join(",");
  const rows = data.map((row) => Object.values(row).join(",")).join("\n");
  const csvData = `${headers}\n${rows}`;

  fs.writeFileSync(filePath, csvData, "utf8");
  console.log("CSV file written successfully.");
}

// Example usage
const inputFilePath = "input.csv";
const outputFilePath = "output.csv";

readCSV(inputFilePath);
writeCSV(outputFilePath, [
  { name: "Alice", age: 30 },
  { name: "Bob", age: 25 },
  { name: "Charlie", age: 35 },
]);
