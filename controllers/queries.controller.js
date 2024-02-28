// const express = require("express");
// const queries = express.Router();

// let logsData = require("../models/logs.model.js");

// queries.get("/", (req, res) => {
//   const { captainname, order, mistakes, lastcrisis } = req.query;
//   if (captainname) {
//     const searchResults = logsData.filter(
//       (log) => log.captainName.toLowerCase() === captainname.toLowerCase()
//     );
//     if (searchResults.length > 0) {
//       res.json({ searchResults });
//     } else {
//       res.json({
//         message: `Sorry, no captain found by the name of ${captainname}`,
//       });
//     }
//   } else if (order) {
//     if (order === "asc") {
//       const ascendingSort = logsData.sort((a, b) =>
//         a.captainName.localeCompare(b.captainName)
//       );
//       res.json({ ascending: ascendingSort });
//     } else if (order === "desc") {
//       const descendingSort = logsData.sort((a, b) =>
//         b.captainName.localeCompare(a.captainName)
//       );
//       res.json({ descending: descendingSort });
//     } else res.json({ error: "Invalid input" });
//   } else if (mistakes) {
//     const mistakesMade = logsData.filter(
//       (log) => log.mistakesWereMadeToday.toString() === mistakes
//     );
//     res.json({ mistakes: mistakesMade });
//   } else if (lastcrisis) {
//     if (lastcrisis === "gt10") {
//       const greaterThan10 = logsData.filter(
//         (log) => log.daysSinceLastCrisis > 10
//       );
//       res.json({ moreThan10: greaterThan10 });
//     } else if (lastcrisis === "gte20") {
//       const greaterThan20 = logsData.filter(
//         (log) => log.daysSinceLastCrisis >= 20
//       );
//       res.json({ moreThan20: greaterThan20 });
//     } else if (lastcrisis === "lte5") {
//       const lessThan5 = logsData.filter((log) => log.daysSinceLastCrisis <= 5);
//       res.json({ lessThanFive: lessThan5 });
//     } else res.json({ error: "Invalid input" });
//   } else res.json({ logs: logsData });
// });

// module.exports = queries;
