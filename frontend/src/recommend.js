export default function recommendCourses(prevCourses, mathSkill, serSkill, csSkill) {
  const nextPossibleCourses = computeNextPossibleCourses(prevCourses);
  const nextAvailableCourses = findNextAvailableCourses(nextPossibleCourses);
  const minimallyDifficultCourses = minimizeDifficulty(nextAvailableCourses);
  return minimallyDifficultCourses;
}

function computeNextPossibleCourses(prevCourses) {
  // based on Software Engineering major map and prerequisites
  // https://webapp4.asu.edu/programs/t5/roadmaps/ASU00/TSSERBS/null/ALL/2020?init=false&nopassive=true
  // TODO: Complete data
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
    'MAT 267': [],
    'MAT 275': [],
    'SER 222': [],
    'EGR 104': [],
    'EGR 280': [],
    'SER 216': [],
    'MAT 343': [],
    'SER 315': [],
    'SER 334': [],
    'PHY 121': [],
    'PHY 122': [],
    'SER 321': [],
    'SER 316': [],
    'SER 335': [],
    'SER 415': [],
    'SER 322': [],
    'SER 416': [],
    'SER 401': [],
    'HST 318': [],
    'SER 402': []
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

function findNextAvailableCourses(prevCourses) {
  // based on Software Engineering major map and prerequisites
  return prevCourses;
}

function minimizeDifficulty(courses) {

  return prevCourses.map(course => ({ code: course, session: 'C' }));
}

function areRequirementsSatified(requirementSet, prevCourses) {
  return requirementSet.some(course => isCourseTaken(course, prevCourses));
}

function isCourseTaken(course, prevCourses) {
  return prevCourses.includes(course);
}
