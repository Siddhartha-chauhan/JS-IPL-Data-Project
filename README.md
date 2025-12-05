# JS IPL Data Project

This project analyzes IPL matches and deliveries data to generate insights like matches per year, matches won per team, top economical bowlers, extra runs, and more. The data is transformed from CSV to JSON and stored in output files.

---

## Project Structure

- `src/data/`  
  - `matches.csv` – match-level data  
  - `deliveries.csv` – ball-by-ball delivery data  

- `src/utils/`  
  - `csvToJson.js` – convert CSV to JSON  
  - `writeFile.js` – write JSON output  
  - `constants.js` – store filenames and output names  

- `src/server/`  
  - `1-matches-per-year.js` – number of matches per year  
  - `2-matches-won-per-year-per-team.js` – matches won per team per year  
  - `3-extra-runs-per-team-in-2016.js` – extra runs conceded per team in 2016  
  - `4-economical-bowlers-2015.js` – top 10 economical bowlers in 2015  
  - `5-each-team-won-toss-and-match-winners.js` – teams that won toss and match  
  - `6-highest-number-of-awards.js` – player with most Player of the Match awards per season  
  - `7-batsman-strike-rat.js` – strike rate of batsmen per season  
  - `8-most-dismissed-player.js` – most dismissals by one player  
  - `9-bowler-with-best-economy-in-super-over.js` – best economy in super overs  

- `src/public/output/` – JSON output files  

- `package.json`, `package-lock.json` – project dependencies  

---

## How to Run

1. Install dependencies (if any):

```bash
npm install
```
2. Run a script:

    node src/server/1-matches-per-year.js

- Output will be saved in src/public/output/ as JSON.

You can replace 1-matches-per-year.js with any other script (2–9) to generate the respective output.

---

## Notes

- Scripts use simple JavaScript with readable variable names.
- CSV data is converted to JSON before processing.
- Outputs are separated for each analysis task.

