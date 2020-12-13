import { List } from 'semantic-ui-react';
import { useLocation } from 'react-router-dom';
import recommendCourses from './recommend.js';

// based on https://reactrouter.com/web/example/query-parameters
function useQuery(schema) {
  const params = new URLSearchParams(useLocation().search);
  const object = {};
  for (let key in schema) {
    if (schema[key] === Array) {
      object[key] = params.getAll(key);
    } else if (schema[key] === Number) {
      object[key] = +params.get(key);
    } else {
      object[key] = params.get(key);
    }
  }
  return object;
}

export default function Recommendations() {
  const { prevCourses, mathSkill, serSkill, csSkill } = useQuery({ prevCourses: Array, mathSkill: Number, serSkill: Number, csSkill: Number });
  const courses = recommendCourses(prevCourses, mathSkill, serSkill, csSkill);
  return (
    <List>
      {courses.map(course =>
        <List.Item key={course.code}>{course.code} (session {course.session})</List.Item>
      )}
    </List>
  );
}
