import { useEffect, useState, useCallback, useMemo } from "react"
import './addConfForm.scss'
import ConfService from "../../services/ConfService"
// import {useDispatch} from 'react-redux'

const AddConfForm =({userId, conf})=>{
    const {addConf, getHallColors} = ConfService()

    const[colors, setColors] = useState([])
    const [date, setDate] = useState()
    const [start, setStart] = useState()
    const [end, setEnd] = useState()
    const [hall, setHall] = useState()
    const[loading, setLoading] = useState(true)
    // const [hallList, setHallList] =useState()

    useEffect(()=>{
        
        if(conf){
            setDate(new Date(conf.start))
            setHall(conf.title);
            // document.getElementById(`hallChoice${conf.title}`).setAttribute("checked", "checked");
        }
        getHallColors().then(res=>{setColors(res);setLoading(false);})
        
    },[])


   
    var root = document.querySelector(':root');
    // .toLocaleString('uk-UA')


    // useCallback(()=>{

    // useMemo(()=>{ getHallColors().then(res=>setColors(res));}, []) 
    

    // console.log(colors)

    const onHallsChange=(color, i)=>{
        root.style.setProperty('--main-color',color );
        setHall(i)
    }

    const onSubmitForm=()=>{
        // var de = date+" "+end;
        // transformDate(de);
      addConf({
        dataEnd:date+" "+end+":00",
        userId: userId,
        hallId:hall,
        dataBeg: date+" "+start+":00"
      })
    }

    const hallInputs = colors.map((hall, i) => {
       
        return (
            <div className="inputGroup" onClick={()=>onHallsChange(hall, i+1)}   key={i}>
            <input 
            name="hall" 
            id = {`hallChoice${i+1}`}
            type="radio"
            value={i+1}
           
            // key={i}
            />
            <label htmlFor={'hallChoice'+hall}>{i+1}</label>
            </div>
            
        )})

        // const hallInputs = useMemo(()=>{
        //     var mass
        //     getHallColors().then(res=>{
                
        //         setColors(res)
        //     mass =  colors.map((hall, i) => {
        //         return (
        //             <div className="inputGroup" onClick={()=>onHallsChange(hall, i+1)}   key={i}>
        //             <input 
        //             name="hall" 
        //             id = {'hallChoice'+hall}
        //             type="radio"
        //             value={i+1}
                
        //             // key={i}
        //             />
        //             <label htmlFor={'hallChoice'+hall}>{i+1}</label>
        //             </div>
                    
        //         )})
        //     });
        //     return mass
        // }, []
        // )
     // console.log("я вызываюсь")

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
                        {hallInputs}
                    </div>
                    <div className="datatime">
                        <h2>Дата</h2>
                        <input type="date" className="dateInp" name="date" 
                            value={date} 
                            onChange={(e)=>setDate(e.target.value.toLocaleString())}/>
                    </div>
                    <div className="datatime">
                        <h2>Час початку</h2>
                        <input type="time" className="time-start" name="time"
                            value={start} 
                            onChange={(e)=>setStart(e.target.value.toLocaleString())} />
                        <h2>Час закінчення</h2>
                        <input type="time" className="time-end" name="time"
                            value={end} 
                            onChange={(e)=>setEnd(e.target.value.toLocaleString())}/>
                    </div>
                    
                    <button onClick={onSubmitForm}>Зарезервувати</button>
                    
                </form>
         }
        </div>
    )
}



export default AddConfForm