import { Form } from 'semantic-ui-react';


// slider (range input) with ticks and numbering
export default function Slider({ onChange, label, name }) {
  const tickStyle = {
    display: 'flex',
    paddingLeft: '1em',
    paddingRight: '1em',
    justifyContent: 'space-between'
  };

  return (
    <>
      <Form.Input required label={label} type='range' min={1} max={5} name={name} id={name} onChange={onChange} />
      <div style={tickStyle} className='slider-tick'>
        <div>|</div>
        <div>|</div>
        <div>|</div>
        <div>|</div>
        <div>|</div>
      </div>
        <div style={tickStyle}>
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
          <div>5</div>
        </div>
    </>
  );
}
