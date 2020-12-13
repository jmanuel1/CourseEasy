import { List, Header, Item, Container, Button } from 'semantic-ui-react';
import { useLocation } from 'react-router-dom';
import recommendCourses, { saveRecommendations, loadRecommendations } from './recommend.js';
import { useState, useEffect } from 'react';

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
  const [courses, setCourses] = useState(null);
  let recommendationList;


  if (courses === null) {
      recommendCourses(prevCourses, mathSkill, serSkill, csSkill).then(setCourses);
    recommendationList = <p>Loading class recommendations...</p>;
  } else {
    recommendationList = (
      <>
        <Item.Group divided>
          {courses.map(course =>
            <Item key={course.code}>
              <Item.Content>
                <Item.Header>{course.code}</Item.Header>
                <Item.Meta>
                  Session {course.session}
                </Item.Meta>
              </Item.Content>
            </Item>
          )}
        </Item.Group>
      </>
    );
  }
  return (
    <Container text textAlign='center' as='main'>
      <Header as='h2'>{userName}, here are your recommended courses</Header>
      {recommendationList}
    </Container>
  );
}
