import { Link } from 'react-router-dom';
import { Button, Icon, Header as Heading, Menu } from 'semantic-ui-react';

const theme = localStorage.getItem("theme")||"light-mode";

function setTheme(theme){
  if(theme == "light-mode") document.documentElement.classList.remove("dark-mode");
  else document.documentElement.classList.add("dark-mode");
}

setTheme(theme)

function toggleTheme(){
  const currentTheme = localStorage.getItem("theme")||"light-mode";
  let nextTheme;
  if(currentTheme == "light-mode") nextTheme = "dark-mode";
  else nextTheme = "light-mode";
  localStorage.setItem("theme", nextTheme);
  setTheme(nextTheme);
}

export default function Header({ prevRoute, noBack = false }) {
  return (
    <header>
      <Menu fixed='top' inverted>
        <Menu.Item>
          <Button icon disabled={noBack} inverted>
            <Link to={prevRoute} className='inverted'><Icon name='arrow left' inverted/> Back</Link>
          </Button>
          <Button onClick={toggleTheme} style={{marginLeft:10}}>Toggle theme</Button>
        </Menu.Item>
        <Menu.Item id='title'><Heading as='h1' inverted>CourseEasy</Heading></Menu.Item>
      </Menu>
    </header>
  );
}
