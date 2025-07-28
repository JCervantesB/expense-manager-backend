import cron from "cron";
import https from "https";

const urls = [
  { url: process.env.API_URL, name: "API_URL" },
  { url: process.env.EXTERNAL_API_URL, name: "EXTERNAL_API_URL" }
].filter(item => item.url); // Filtrar URLs que existan

const makeRequest = (url, urlName) => {
  https
    .get(url, (res) => {
      if (res.statusCode === 200) {
        console.log(`GET request to ${urlName} sent successfully`);
      } else {
        console.log(`GET request to ${urlName} failed`, res.statusCode);
      }
    })
    .on("error", (e) => console.error(`Error while sending request to ${urlName}`, e));
};

const job = new cron.CronJob("*/120 * * * *", function () {
  urls.forEach(({ url, name }) => {
    makeRequest(url, name);
  });
});

export default job;


// CRON JOB EXPLANATION:
// Cron jobs are scheduled tasks that run periodically at fixed intervals
// we want to send 1 GET request for every 14 minutes

// How to define a "Schedule"?
// You define a schedule using a cron expression, which consists of 5 fields representing:

//! MINUTE, HOUR, DAY OF THE MONTH, MONTH, DAY OF THE WEEK

//? EXAMPLES && EXPLANATION:
//* 14 * * * * - Every 14 minutes
//* 0 0 * * 0 - At midnight on every Sunday
//* 30 3 15 * * - At 3:30 AM, on the 15th of every month
//* 0 0 1 1 * - At midnight, on January 1st
//* 0 * * * * - Every hour