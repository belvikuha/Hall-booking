import { React, useState, useEffect, useCallback, useMemo } from "react" ;
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment';
import 'moment/locale/uk' 
import 'react-big-calendar/lib/css/react-big-calendar.css';

import EventWrapper from "./ConferenceWrapper.js";
import useConfService from "../../services/ConfService.js";
import UserService from "../../services/UserService.js";


import { useDispatch, useSelector } from "react-redux";
import { getConfLoading, getConferences, getHallColors } from "../../selectors/confSelectors.js";
import { getCurrentUser, getLoading } from "../../selectors/userSelectors.js";
import "./calendar.css"
import Spinner from "../spiner/Spiner.js";
moment.locale('uk');
const localizer = momentLocalizer(moment)

function transformConf(conf){
        
  var s = new Date(conf.dataBeg)
  var e = new Date(conf.dataEnd)

  return { 
    'id': conf.id,
    'title': conf.hall.id,
    'start': new Date(s.getFullYear(), s.getMonth(), s.getDate(), s.getHours(), s.getMinutes()), // 10.00 AM
    'end': new Date(e.getFullYear(), e.getMonth(), e.getDate(), e.getHours(), e.getMinutes()),
    'color': conf.hall.color,
    'userId': conf.user.id,
    'userName': conf.user.userName,

  }
}

const CalendarWrapper =() =>{
   
    const [currentDate, setCurrDate] = useState()
    const [hallFilter, setHallFilter] = useState(-1)

 

    const confs = useSelector(getConferences)
    const currentUser = useSelector(getCurrentUser),
    halls = useSelector(getHallColors);
    // loading = useSelector(getLoading),
    const loadingC = useSelector(getConfLoading) 

    // console.log(colors)

    const myConf = useMemo(()=>{
      if(confs?.length !== 0){
  
        if(hallFilter === -1)return confs.map(transformConf)
        return confs.filter(conf=>conf.hall.id === hallFilter).map(transformConf)
        
      }
      return []
    },[confs, hallFilter])

    const dispatch = useDispatch()

  

    useEffect(() => {
      setCurrDate(new Date())
    }, []);

  useEffect(() => {
    console.log(loadingC)
  }, [loadingC]);

    return(
      <>
{loadingC ? <Spinner/>:<>
         <div className="calendar-conteiner" style={{ height: 910 }}>
         <Calendar
            components={{
                eventWrapper: EventWrapper
            }}
           localizer={localizer} 
          //  demoToggle={demoT}
          //  onDoubleClickEvent={()=>demoT()}
           step={15}
           events={myConf}
           defaultView='week'
           views={['week', 'day']}
           min={new Date(1972, 0, 1, 8, 0, 0, 0)}
           max={new Date(1972, 0, 1, 17, 59, 59)}
          //  min={new Date(2008, 0, 1, 8, 0)} // 8.00 AM
          //  max={new Date(2008, 0, 1, 18, 0)} // Max will be 6.00 PM!
          //  date={new Date()
          selectable
          defaultDate={currentDate}
          startAccessor="start"
          endAccessor="end"
          //  scrollToTime={moment()
          //   .set({ h: 9, m: 0 })
          //   .toDate()}
         />
       </div>
      <div className="hall_filter_btn__container">
        {halls.length!==0 && halls.map((hall,i)=>{
            return(
              <HallFilterBtn
              key={i} 
              color={hall.color} 
              title={`Зал №${hall.id}`} 
              onClick={()=>{setHallFilter(hall.id)}}
              active={hallFilter === hall.id}
              />
            )
        })}
        <HallFilterBtn color={'grey'} title={`Всі`} onClick={()=>{setHallFilter(-1)}}/>
      </div>
</>}
    </>
    )
}


const HallFilterBtn = ({color, title, onClick, active})=>{

  return(
    <button className={`hall_filter_btn ${active && 'active'}`} style={{backgroundColor:color}} onClick={onClick}>
      <p className="hall_filter_btn_title">{title}</p>
    </button>
  )
}

export default CalendarWrapper