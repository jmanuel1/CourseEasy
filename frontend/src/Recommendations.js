import { List } from 'semantic-ui-react';

export default function Recommendations({ courses }) {
  <List>
    {courses.map(course =>
      <List.Item>{course.name} (session {course.session})</List.Item>
    )}
  </List>;
}
