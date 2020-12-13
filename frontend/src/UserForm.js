import { Input, Dropdown, Button, Container, Form } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Slider from './Slider.js';

export default function UserForm() {
  const options = [
    { key: 'ASU 101', text: 'ASU 101', value: 'ASU 101' },
    { key: 'ENG 101', text: 'ENG 101', value: 'ENG 101' },
    { key: 'ENG 107', text: 'ENG 107', value: 'ENG 107' },
    { key: 'FSE 100', text: 'FSE 100', value: 'FSE 100' },
    { key: 'CSE 110', text: 'CSE 110', value: 'CSE 110' },
    { key: 'ENG 102', text: 'ENG 102', value: 'ENG 102' },
    { key: 'ENG 108', text: 'ENG 108', value: 'ENG 108' },
    { key: 'CSE 205', text: 'CSE 205', value: 'CSE 205' },
    { key: 'MAT 265', text: 'MAT 265', value: 'MAT 265' },
    { key: 'SER 232', text: 'SER 232', value: 'SER 232' },
    { key: 'MAT 266', text: 'MAT 266', value: 'MAT 266' },
    { key: 'MAT 243', text: 'MAT 243', value: 'MAT 243' },
    { key: 'CSE 230', text: 'CSE 230', value: 'CSE 230' },
    { key: 'CSE 240', text: 'CSE 240', value: 'CSE 240' },
    { key: 'MAT 267', text: 'MAT 267', value: 'MAT 267' },
    { key: 'MAT 275', text: 'MAT 275', value: 'MAT 275' },
    { key: 'SER 222', text: 'SER 222', value: 'SER 222' },
    { key: 'EGR 104', text: 'EGR 104', value: 'EGR 104' },
    { key: 'EGR 280', text: 'EGR 280', value: 'EGR 280' },
    { key: 'SER 216', text: 'SER 216', value: 'SER 216' },
    { key: 'MAT 343', text: 'MAT 343', value: 'MAT 343' },
    { key: 'SER 315', text: 'SER 315', value: 'SER 315' },
    { key: 'SER 334', text: 'SER 334', value: 'SER 334' },
    { key: 'PHY 121', text: 'PHY 121', value: 'PHY 121' },
    { key: 'PHY 122', text: 'PHY 122', value: 'PHY 122' },
    { key: 'SER 321', text: 'SER 321', value: 'SER 321' },
    { key: 'SER 316', text: 'SER 316', value: 'SER 316' },
    { key: 'SER 335', text: 'SER 335', value: 'SER 335' },
    { key: 'SER 415', text: 'SER 415', value: 'SER 415' },
    { key: 'SER 322', text: 'SER 322', value: 'SER 322' },
    { key: 'SER 416', text: 'SER 416', value: 'SER 416' },
    { key: 'SER 401', text: 'SER 401', value: 'SER 401' },
    { key: 'HST 318', text: 'HST 318', value: 'HST 318' },
    { key: 'SER 402', text: 'SER 402', value: 'SER 402' }
  ];

  const [state, setState] = useState({ prevCourses: [], mathSkill: 3, serSkill: 3, csSkill: 3, userName: '' });
  function onCoursesChange(event, data) {
    setState({ ...state, prevCourses: data.value });
  }
  function onSkillChange(event, data) {
    const stateProperties = {
      'math-skill': 'mathSkill',
      'ser-skill': 'serSkill',
      'cs-skill': 'csSkill'
    };
    setState({ ...state, [stateProperties[data.name]]: data.value });
  }
  function onNameChange(event, data) {
    setState({ ...state, userName: data.value });
  }

  const recommendationParams = new URLSearchParams();
  // console.debug(state.prevCourses);
  for (let course of state.prevCourses) {
    recommendationParams.append('prevCourses', course);
  }
  for (let param of ['mathSkill', 'serSkill', 'csSkill', 'userName']) {
    recommendationParams.append(param, state[param]);
  }

  {/* TODO: (nice to have) recover previous form state */}

  return (
    <Container text as='main'>
      <Form>
        <Form.Input required label='Name' id='name' placeholder='Your name...' onChange={onNameChange}/>
        <Form.Dropdown required label="Course you've taken" id='courses' placeholder='Courses...' fluid multiple selection options={options} onChange={onCoursesChange} />
        {/* Slider is an <Input type='range'> with ticks and numbering below it */}
        <Slider onChange={onSkillChange} label='How comfortable are you with math?' name='math-skill'/>
        <Slider label='How comfortable are you with software engineering?' name='ser-skill' onChange={onSkillChange}/>
        <Slider label='How comfortable are you with computer science?' name='cs-skill' onChange={onSkillChange}/>
        <Form.Button disabled={state.userName.length === 0}><Link to={`/recommendations?${recommendationParams.toString()}`}>Get recommended courses</Link></Form.Button>
        <Form.Button><Link to='/recommendations?saved=true'>Load saved recommendations</Link></Form.Button>
      </Form>
    </Container>
  );
}
