import moment from "moment-mini";
import { useSelector} from "react-redux";
import {useState } from "react";
import ReactDOM from 'react-dom';
import './wrapper.css';
import pencil from './pencil.png'

import AddConfForm from "../addConfForm/AddConfForm";


const EventWrapper = ({ event, children  }) => {
  const { title, className } = children.props;
  const [modal, setModal] = useState(false);


  const onModalToggle=()=>{
    setModal(modal=> modal=!modal)
  }

  const currUserId = useSelector(state => state.user.currentUser.id)

  // const customClass = `${className} rbc-event--${event.color}`;
  const hourStart = moment(event.start).hour();
  const minuteStart = moment(event.start).minute();
  const hourStop = moment(event.end).hour();
  const minuteStop = moment(event.end).minute();
  
  const startPlus = minuteStart>=30 ? 2 : 1;
  var gridRowPlus = minuteStart>=30 ? 0 : 2;
  if(minuteStart<30 && minuteStop<30){gridRowPlus -= 1;}
  
  const diff= hourStop - hourStart;

  const gridRowStart = (hourStart*2) + startPlus;


  return (
    <div
      title={title}
      className={className}
      style={{ gridRow: `${gridRowStart} / span ${ diff>1 ? diff+ 2: diff+ gridRowPlus}`, 
       backgroundColor: `${event.color}`}}
      
    >
    {event.userId === currUserId ? <img 
            className = "pencil-icon" alt="red" src={pencil}
            onClick={()=>{ onModalToggle()}}/>
            :null}
    {children.props.children} 
    { modal ?<Portal><Msg onClose={()=>onModalToggle()}
                          conf={event}/></Portal> :null}
    </div>  
  ); 


};



const Portal =(props)=>{
  const node = document.createElement('div');
  document.body.appendChild(node);

  return ReactDOM.createPortal(props.children, node);
}

const Msg = ({onClose, conf})=>{
  return(
    <div style={{'width':'500px', 'height':'auto', 'backgroundColor':'green', 'position':'absolute', 'top':'10%','left':'20%', 'overflow':'hidden'}}>
      
      <button onClick={onClose}>X</button>
      <AddConfForm conf={conf}/>
    </div>
  )
}

export default EventWrapper;