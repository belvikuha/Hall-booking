import moment from "moment-mini";
import { useDispatch, useSelector} from "react-redux";
import {useCallback,useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ReactDOM from 'react-dom';
import './wrapper.css';
import pencil from './pencil.png'
import bin from './bin.png'

import AddConfForm from "../addConfForm/AddConfForm";
import { getCurrentUser } from "../../selectors/userSelectors";
import useConfService from "../../services/ConfService";



const EventWrapper = ({ event, children, demoToggle  }) => {
  const { title, className } = children.props;
  const [modal, setModal] = useState(false);


  const onModalToggle=useCallback(()=>{
    setModal(modal=> modal=!modal)
  },[])

  const currUser = useSelector(getCurrentUser);

  const {deleteConf} = useConfService()

  // const customClass = `${className} rbc-event--${event.color}`;
  

  const gridRow = useMemo(()=>{
    const hourStart = moment(event.start).hour();
    const minuteStart = moment(event.start).minute();
    const hourStop = moment(event.end).hour();
    const minuteStop = moment(event.end).minute();
    
    const startPlus = minuteStart>=30 ? 2 : 1;
    var gridRowPlus = 0;
    if(minuteStart>=30 && minuteStop<30)gridRowPlus = -1
    if(minuteStop>=30 && minuteStart<30 )gridRowPlus = 1
  
  
    const diff= hourStop - hourStart;
    const gridRowStart = (hourStart*2) + startPlus;
    return`${gridRowStart-16} / span ${ (diff* 2)+ gridRowPlus }`
  },[event])

// console.log('wrapper RENDER')
// console.log(currUserId)
  const dispatch = useDispatch()

  const onDelete = useCallback(()=>{
    if (window.confirm("Do you really want to delete?")) {
      dispatch(deleteConf(event.id))
    }
  },[])

  return (
    <div
      title={title}
      className={className}
      style={{
       gridRow: gridRow, 
       backgroundColor: `${event.color}`,
        position:'relative'
      }}
      
    >
   
   
    {event.userId === currUser.id ?
      <div  className = "pencil-icon">
        <img 
          alt="update" src={pencil}
          onClick={onModalToggle}
        />   
        <img 
          alt="delete" src={bin}
          onClick={onDelete}
        />
      </div> 
      :null}
      <div className="block_title">
        <div className="hall_number">{event.title}</div>
        <div className="time">{event.userName}<br/>
        {event.start.getHours()+':'+event.start.getMinutes().toString().padStart(2, '0')}-{event.end.getHours()+':'+event.end.getMinutes().toString().padStart(2, '0')}
        </div>
      </div>
    {/* {children.props.children}  */}
    { modal ?
        <Portal>
          <Msg onClose={()=>onModalToggle()}
              conf={event}
              userId={currUser.id}/>
        </Portal> 
    :null}
    </div>  
  ); 


};



const Portal =(props)=>{
  const node = document.createElement('div');
  document.body.appendChild(node);
  useEffect(() => {
    return () => {
      document.body.removeChild(node);
    };
  }, []);
  return ReactDOM.createPortal(props.children, node);
}

const Msg = ({onClose, conf, userId})=>{
  return(
    <div className="portal" style={{}}>
      <div className="portal__container" style={{}}>
        <button onClick={onClose} className="close_btn">X</button>
        <AddConfForm conf={conf} userId={userId}/>
      </div>
    </div>
  )
}

export default EventWrapper;