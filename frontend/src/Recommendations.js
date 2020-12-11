import { List } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import recommendCourses from './recommend.js';

export default function Recommendations(/*{ courses }*/) {
  const { prevCourses, mathSkill, serSkill, csSkill } = useParams();
  const courses = recommendCourses(prevCourses, mathSkill, serSkill, csSkill);
  return (<List>
    {courses.map(course =>
      <List.Item>{course.name} (session {course.session})</List.Item>
    )}
  </List>);
}
