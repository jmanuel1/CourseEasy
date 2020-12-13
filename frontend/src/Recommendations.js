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
    } else if (schema[key] === Boolean) {
      object[key] = !!params.get(key);
    } else {
      object[key] = params.get(key);
    }
  }
  return object;
}

function saveUserName(userName) {
  localStorage.setItem('user-name', userName);
}

function loadUserName() {
  return localStorage.getItem('user-name');
}

export default function Recommendations() {
  let { prevCourses, mathSkill, serSkill, csSkill, userName, saved } = useQuery({
    prevCourses: Array,
    mathSkill: Number,
    serSkill: Number,
    csSkill: Number,
    userName: String,
    saved: Boolean
  });
  const [courses, setCourses] = useState(null);
  let recommendationList;

  let success = true;

  if (courses === null) {
    if (saved) {
      const savedCourses = loadRecommendations();
      if (!savedCourses) {
        recommendationList = <p>No saved class recommendations!</p>;
        success = false;
      } else {
        setCourses(savedCourses);
      }
    } else {
      recommendCourses(prevCourses, mathSkill, serSkill, csSkill).then(setCourses);
    }
    if (success) {
      recommendationList = <p>Loading class recommendations...</p>;
    }
  } else {
    if (saved) {
      userName = loadUserName();
    }

    recommendationList = (
      <>
        <Item.Group divided>
          {courses.map(course =>
            <Item key={course.code}>
              <Item.Content>
                <Item.Header>{course.code}</Item.Header>
                <Item.Meta>
                  expected course difficulty : {course.adjustedRating||3}/5
                </Item.Meta>
              </Item.Content>
            </Item>
          )}
        </Item.Group>
        <Button onClick={() => { saveRecommendations(courses); saveUserName(userName); }}>Save recommendations in browser</Button>
      </>
    );
  }
  return (
    <Container text textAlign='center' as='main'>
      {success && <Header as='h2'>{userName}, here are your recommended courses for next semester</Header>}
      {recommendationList}
    </Container>
  );
}
