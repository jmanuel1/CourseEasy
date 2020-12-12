import { Link } from 'react-router-dom';
import { Button, Icon, Header as Heading } from 'semantic-ui-react';

export default function Header({ prevRoute }) {
  return (
    <header>
      <Button icon>
        <Link to={prevRoute}><Icon name='arrow left' /> Back</Link>
      </Button>
      <Heading as='h1' id='title'>CourseEasy</Heading>
    </header>
  );
}
