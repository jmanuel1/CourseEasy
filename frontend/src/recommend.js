import difficultyData from './difficulty.csv';
import { readRemoteFile } from 'react-papaparse';

export default async function recommendCourses(prevCourses, mathSkill, serSkill, csSkill) {
  const nextPossibleCourses = computeNextPossibleCourses(prevCourses);
  const nextAvailableCourses = await findNextAvailableClasses(nextPossibleCourses);
  const minimallyDifficultCourses = await minimizeDifficulty(nextAvailableCourses, mathSkill, serSkill, csSkill);
  return minimallyDifficultCourses;
}

export function saveRecommendations(courses) {
  localStorage.setItem('recommended-courses', JSON.stringify(courses));
}

export function loadRecommendations(courses) {
  return JSON.parse(localStorage.getItem('recommended-courses'));
}

function computeNextPossibleCourses(prevCourses) {
  // based on Software Engineering major map and prerequisites
  // https://webapp4.asu.edu/programs/t5/roadmaps/ASU00/TSSERBS/null/ALL/2020?init=false&nopassive=true
  const dependencies = {
    'ASU 101': [],
    'ENG 101': [],
    'ENG 107': [],
    'FSE 100': [],
    'CSE 110': [],
    'ENG 102': [['ENG 101', 'ENG 107']],
    'ENG 108': [['ENG 101', 'ENG 107']],
    'CSE 205': [['CSE 110']],
    'MAT 265': [],
    'SER 232': [['SER 100', 'CSE 110'], ['MAT 265']],
    'MAT 266': [['MAT 265', 'MAT 270']],
    'MAT 243': [['MAT 210', 'MAT 251', 'MAT 265', 'MAT 270']],
    'CSE 230': [['CSE 110'], ['SER 232']],
    'CSE 240': [['ACO 102', 'CSE 205']],
    'MAT 267': [['MAT 266', 'MAT 271',]],
    'MAT 275': [['MAT 266', "MAT 271"]],
    'SER 222': [["CSE 205", "SER 200"]],
    'EGR 104': [["ENG 102", "ENG 105", "ENG 108"]],
    'EGR 280': [["MAT 265", "MAT 270"]],
    'SER 216': [["SER 222"]],
    'MAT 343': [["MAT 266", "MAT 271"]],
    'SER 315': [["SER 222"], ["FSE 100"], ["SER 216"]],
    'SER 334': [["CSE 230", "SER 250"], ["SER 222"]],
    'PHY 121': [["MAT 265", "MAT 270"], ["MAT 266", "MAT 271"]],
    'PHY 122': [["PHY 122"]],
    'SER 321': [["SER 222"], ["SER 334"]],
    'SER 316': [["SER 216"], ["SER 222"]],
    'SER 335': [["SER 216"], ["SER 315"], ["SER 334"]],
    'SER 415': [["SER 315"]],
    'SER 322': [["SER 222"]],
    'SER 416': [["SER 316"]],
    'SER 401': [["SER 316"]],
    'HST 318': [["ENG 102", "ENG 105", "ENG 108", "ENG 112"]],
    'SER 402': [["SER 401"]]
  };
  const possibleCourses = [];
  for (let course in dependencies) {
    if (isCourseTaken(course, prevCourses)) {
      continue;
    }

    let reqsSatified = true;
    for (let requirementGroup of dependencies[course]) {
      if (!areRequirementsSatified(requirementGroup, prevCourses)) {
        reqsSatified = false;
        break;
      }
    }
    if (reqsSatified) {
      possibleCourses.push(course);
    }
  }
  return possibleCourses;
}

async function findNextAvailableClasses(allowedCourses) {
  let classes = [];
  for (let course of allowedCourses) {
    try {
      // FIXME: Ignore Laboratory classes
      const arr = (await import('../../backend/' + course.replace(' ', '_') + '_details.json'))
        .default
        .filter(({ Occupado }) => {
          const [, seatsTaken, totalSeats] = Occupado.match(/(\d+) of (\d+)/);
          return +seatsTaken < +totalSeats;
        });
      classes = classes.concat(arr);
    } catch (err) {
      // do nothing
    }
  }
  // console.debug(classes);

  return classes;
}

function minimizeDifficulty(courses, mathSkill, serSkill, csSkill) {
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
            if (!courses.some(c => c['Course ID'] === course)) {
              continue;
            }
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
      const arrayData = [];
      for (let course in cleanedData) {
        if (cleanedData[course].ratingCount === 0) {
          cleanedData[course].averageRating = 3;
        } else {
          cleanedData[course].averageRating = cleanedData[course].totalRating/cleanedData[course].ratingCount;
          switch (course.slice(0, 3)) {
            case 'MAT':
              cleanedData[course].adjustedRating = cleanedData[course].averageRating * (1 - (mathSkill - 3)/5);
              break;
            case 'SER':
              cleanedData[course].adjustedRating = cleanedData[course].averageRating * (1 - (serSkill - 3)/5);
              break;
            case 'CSE':
              cleanedData[course].adjustedRating = cleanedData[course].averageRating * (1 - (csSkill - 3)/5);
              break;
            default:
              cleanedData[course].adjustedRating = cleanedData[course].averageRating;
          }
        }
        arrayData.push({ ...cleanedData[course], course });
      }
      arrayData.sort((a, b) => a.adjustedRating - b.adjustedRating);
      // FIXME: Suggest up to 15 credits
      const suggestions = arrayData.slice(0, 5);
      resolve(suggestions.map(({ adjustedRating, course }) => ({ code: course, session: 'C', adjustedRating })));
    }
  }));
}

function areRequirementsSatified(requirementSet, prevCourses) {
  return requirementSet.some(course => isCourseTaken(course, prevCourses));
}

function isCourseTaken(course, prevCourses) {
  return prevCourses.includes(course);
}
