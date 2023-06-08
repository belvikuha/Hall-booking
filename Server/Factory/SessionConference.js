import { Conference } from "./Conference.js"
import { AbstractFactory } from "./AbstractFactory.js"


export class SessionConference extends Conference{
    constructor(dataEnd, userId, hallId, dataBeg, extraMessage) {
        super(dataEnd, userId, hallId, dataBeg)
        this.type="SSESION"
        this.extraMessage = extraMessage
      }
  
    message(){
      return `Session conference succecfuly created. ${!!this.extraMessage ? this.extraMessage : ''}`
    }
}

export class SessionConferenceFactory extends AbstractFactory{
    constructor() {
        super()
        this.extraMessage = null
      }

    factoryMethod(dataEnd, userId, hallId, dataBeg){
        var dataE = new Date(dataEnd)
        var timeStart = new Date(dataBeg).getTime(),
        timeFinish =  new Date(dataEnd).getTime();
        console.log(dataE.getTime())
        if((timeFinish - timeStart) > 7200000){
            console.log(timeFinish - timeStart)
            var dateFinish = new Date(dataEnd)
            dateFinish.setMinutes(dateFinish.setMinutes() + 15)
            dataE = dateFinish
            this.extraMessage = 'The hall must be ventilated for at least 15 minutes after.'
        }
        return new SessionConference(dataE,userId,hallId,dataBeg, this.extraMessage)
    }
}
