import { useEffect, useState, useCallback, useMemo } from "react"
import { useNavigate, Link } from "react-router-dom"

import './addConfForm.scss'
import useConfService from "../../services/ConfService"
import { useDispatch, useSelector } from "react-redux"
// import {useDispatch} from 'react-redux'


import { getHallColors } from "../../selectors/confSelectors"
import RadioBtnContainer from "../radioButton/RadioBtnContainer"
import RadioBtn from "../radioButton/RadioBtn"

const AddConfForm =({userId, conf})=>{
    const {createConf, updateConf, loading, error} = useConfService()


    const colors = useSelector(getHallColors)

    const [date, setDate] = useState()
    const [start, setStart] = useState()
    const [end, setEnd] = useState()
    const [hall, setHall] = useState(null);
    const [confType, setConfType] = useState('SSESION')

    const [dateError, setDateError] = useState('')

    
    const navigate = useNavigate()
    const goBack = ()=> navigate(-1);

    var root = document.querySelector(':root');

    const dispatch = useDispatch()

    useEffect(()=>{

        if(conf){
            var y=conf.start.getFullYear(),
            m=conf.start.getMonth()+1, 
            d=conf.start.getDate(),
            dateStr = y + '-' + (m<10 ? `0${m}` : m ) + "-" + (d<10 ? `0${d}` : d) ;

            setDate(dateStr)
            setHall(conf.title);
            root.style.setProperty('--main-color',conf.color );
        }
    },[])


    const onHallsChange=(color, i)=>{
        root.style.setProperty('--main-color',color );
        setHall(i)
    }

    const yesterday = useMemo(()=>{
        const today = new Date(); // Текущая дата и время
        var yd = new Date();
        yd.setDate(today.getDate() - 1);
        return yd
    },[])
    const validateDate = (d)=>{
        if(!d || d===''){setDateError('оберіть дату'); console.log('err')}
        if(new Date(d) < yesterday){setDateError('неможливо обрати дату яка вже пройшла'); console.log('err')}
        else(setDateError(null))
    }

    const onSubmitForm=()=>{
        if(!hall){alert('Спочатку оберіть зал'); return}
        if(start === end || +start.split(':')[0] > +end.split(':')[0]){alert('Час закінчення конференції має бути більшим за початок'); return}
        if(!dateError ){
            dispatch(createConf({
                dataEnd:date+" "+end+":00",
                userId: userId,
                hallId:hall,
                dataBeg: date+" "+start+":00",
                type: confType
            }))
            .then((res)=> {
                console.log(res)
                if(!error) goBack()
            })
        }
    }
    const onRedForm=()=>{
        if(!dateError && hall ){
            dispatch(updateConf({
                id: conf.id,
                dataEnd:date+" "+end+":00",
                userId: userId,
                hallId:hall,
                dataBeg: date+" "+start+":00"
            }))
        }
    }

     function renderHallInputs(){
         return colors.map((h, i) => {
            var checked = false;
            if(hall === i+1){
                checked = true
            }
             return (
                 <div className="inputGroup" onClick={()=>onHallsChange(h.color, i+1)}   key={i}>
                 <input 
                 name="hall" 
                 id = {`hallChoice${i+1}`}
                 type="radio"
                 value={i+1}
                 checked={checked}
                 key={i}  
                 />
                 <label htmlFor={'hallChoice'+h.color}>{i+1}</label>
                 </div>
                 
             )})
         }
 
     const halls = renderHallInputs()
      

    console.log('render')
    return(
        <div className = "add-conf">
            {loading ? null :
                <form className="form"
                    onSubmit={(e)=>{
                        e.preventDefault();
                    }}>
                    <h2>Зали</h2>
                    <div className="checkHall">
                        {halls}
                    </div>
                    <div className="datatime">
                        <h2>Дата</h2>
                        <input type="date" className={`dateInp ${dateError && 'error'}`} name="date" 
                            value={date} 
                            onChange={(e)=>{setDate(e.target.value.toLocaleString());validateDate(e.target.value)}}
                            required
                            min={new Date()}
                            />
                        {dateError && <p className="input_error">{dateError}</p>}
                    </div>
                    <div className="datatime" style={{marginLeft:'3em'}}>
                            <TimePicker minHour={9} maxHour={18}  
                                value={conf?.start}
                            onChange={setStart} label='Час початку'/>
                            <TimePicker minHour={9} maxHour={18} 
                                value={conf?.end} 
                            onChange={setEnd} label='Час закінчення'/>
                    </div>   
                    {!conf ? <RadioBtnContainer name='confType' setSelectedOption={setConfType}  selectedOption={confType}>
                        <RadioBtn id='radio-1' label="Засідання"  value="SSESION"/>
                        <RadioBtn id='radio-2' label="Лекційна" value="LECTURE"/>
                    </RadioBtnContainer> :null}
                   {!conf ? 
                   <div className="container-login100-form-btn">
                   <button className="login100-form-btn"  onClick={onSubmitForm}>ЗАРЕЗЕРВУВАТИ</button> </div>:
                     <button  onClick={onRedForm}>Редагувати</button>
                    }
                </form>
         }
        </div>
    )
}

const  TimePicker =(props)=> {
   
      const { minHour, maxHour, onChange, label, value } = props;

      const [hour, setHour] = useState(9)
      const [minute, setMinute] = useState(0)

      useEffect(() => {
        if(value && value !==''){
            setHour(value.getHours())
            setMinute(value.getMinutes())
        }
      }, [value]);

      useEffect(() => {
        onChange(hour+":"+ (minute < 10 ? `0${minute}` : minute))
      }, [hour,minute]);
  
      // Создание вариантов выбора часов
      const hours = [];
      for (let i = minHour; i <= maxHour; i++) {
        hours.push(i);
      }
  
      // Создание вариантов выбора минут
      const minutes = [0, 15, 30];
  
      return (
        <div className="time-picker">
            <h2>{label}</h2>
          <select  value={hour}  className="time-start"
                    onChange={(e)=>setHour(e.target.value)}>
            {hours.map((hour) => (
              <option key={hour} value={hour}>
                {hour}
              </option>
            ))}
          </select>
          <select value={minute} 
                    onChange={(e)=>setMinute(e.target.value)}>
            {minutes.map((minute) => (
              <option key={minute} value={minute}>
                {minute < 10 ? `0${minute}` : minute}
              </option>
            ))}
          </select>
        </div>
      );
    }


  

export default AddConfForm