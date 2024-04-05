
type CustomToolbarProps = {
  label: string;
  onNavigate: (direction: 'PREV' | 'NEXT') => void;
  changeMonth: (arrowFunction : string)=> void ;
}

const CustomToolbar = (props: CustomToolbarProps) => {

  const handleOnClickNext = () => {
    props.changeMonth('NEXT');
    props.onNavigate('NEXT');
  }
  const handleOnClickPrev = () => {
    props.changeMonth('PREV');
    props.onNavigate('PREV');
  }

  return (
    <div className="custom-toolbar">
      <button className="custom-toolbar-button" onClick={handleOnClickPrev}>{'<'}</button>
      <span className="custom-toolbar-label">{props.label}</span>
      <button className="custom-toolbar-button" onClick={handleOnClickNext}>{'>'}</button>
    </div>
  );
};

export default CustomToolbar;



