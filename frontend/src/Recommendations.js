import { List } from 'semantic-ui-react';
import { useLocation } from 'react-router-dom';
import recommendCourses from './recommend.js';

// https://reactrouter.com/web/example/query-parameters
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Recommendations() {
  const params = useQuery();
  const courses = recommendCourses(params.getAll('prevCourses'), +params.get('mathSkill'), +params.get('serSkill'), +params.get('csSkill'));
  return (<List>
    {courses.map(course =>
      <List.Item key={course.code}>{course.code} (session {course.session})</List.Item>
    )}
  </List>);
}
