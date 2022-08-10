import { React, useState, useEffect, useCallback } from "react" ;
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment';
import 'moment/locale/uk' 
import 'react-big-calendar/lib/css/react-big-calendar.css';

import EventWrapper from "./ConferenceWrapper.js";
import ConfService from "../../services/ConfService.js";


moment.locale('uk');
const localizer = momentLocalizer(moment)


const CalendarWrapper =() =>{
    const [confs, setConfs] = useState([]);
    const [currentDate, setCurrDate] = useState()

    const {getAllConfs} = ConfService()

    

    useEffect(()=>{
      onRequest()
      setCurrDate(new Date())
    },[])

    const onRequest = useCallback(() => {
      getAllConfs()
          .then(onEventsLoaded)
    },[])

    const onEventsLoaded=useCallback((confs)=>{
      setConfs(confs)
    }, [])

    const handleSelectEvent = useCallback(
      (event) => window.alert(event.title),
      []
    )
 
    return(
        // <div>
        //     <p style={{'textAlign':'center'}}>Calendar  {currentDate}</p>
        //     <button onClick={changedate}> click</button>
        // </div>
         <div style={{ height: 700 }}>
         <Calendar
          // eventPropGetter={eventRenderProps}
            components={{
                eventWrapper: EventWrapper
                // event: Event
            }}
           localizer={localizer} 
          //  onDoubleClickEvent={handleSelectEvent}
           step={15}
           events={confs}
           defaultView='week'
           views={['week', 'day']}
          //  min={new Date(2008, 0, 1, 8, 0)} // 8.00 AM
          //  max={new Date(2008, 0, 1, 18, 0)} // Max will be 6.00 PM!
          //  date={new Date()
          selectable
          defaultDate={currentDate}
           scrollToTime={moment()
            .set({ h: 9, m: 0 })
            .toDate()}
         />
       </div>
    )
}
export default CalendarWrapper