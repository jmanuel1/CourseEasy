import difficultyData from './difficulty.csv';
import { readRemoteFile } from 'react-papaparse';

function processSurveyData() {
  return new Promise(resolve => readRemoteFile(difficultyData, {
    download: true,
    header: true,
    complete({ data }) {
      // console.debug(data);
      const cleanedData = {};
      for (let row of data) {
        for (let key in row) {
          if (key.includes('Rank the courses by difficulty (see above to get an idea of what each difficulty means)')) {
            // console.debug(key);
            const course = key.match(/\[\s*(\w{3} \d{3})\s*\]/)[1];
            if (!cleanedData[course]) {
              cleanedData[course] = { totalRating: 0, ratingCount: 0 };
            }
            if (row[key].includes('Difficulty lvl')) {
              cleanedData[course].totalRating += +row[key].slice(-1);
              cleanedData[course].ratingCount++;
            }
          }
          // TODO: session suggestions
        }
      }
      for (let course in cleanedData) {
        if (cleanedData[course].ratingCount === 0) {
          cleanedData[course].surveyedDifficulty = 3;
        } else {
          cleanedData[course].surveyedDifficulty = cleanedData[course].totalRating/cleanedData[course].ratingCount;
        }
      }
      resolve(cleanedData);
    }
  }));
}

processSurveyData().then(x => console.log(JSON.stringify(x)));
