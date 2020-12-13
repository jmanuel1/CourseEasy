import { Link } from 'react-router-dom';
import { Button, Icon, Header as Heading, Menu } from 'semantic-ui-react';

export default function Header({ prevRoute, noBack = false }) {
  return (
    <header>
      <Menu fixed='top' inverted>
        <Menu.Item>
          <Button icon disabled={noBack} inverted>
            <Link to={prevRoute} className='inverted'><Icon name='arrow left' inverted/> Back</Link>
          </Button>
        </Menu.Item>
        <Menu.Item id='title'><Heading as='h1' inverted>CourseEasy</Heading></Menu.Item>
      </Menu>
    </header>
  );
}
