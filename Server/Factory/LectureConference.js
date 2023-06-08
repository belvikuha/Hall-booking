import { Conference } from "./Conference.js";
import { AbstractFactory } from "./AbstractFactory.js";

export class LectureConference extends Conference{
    constructor(dataEnd, userId, hallId, dataBeg) {
        super(dataEnd, userId, hallId, dataBeg)
        this.type="LECTURE"
      }
  
    message(){
      return 'Lecture conference succecfuly created, pay attention that it can endure no more than an hour'
    }
}

export class LectureConferenceFactory extends AbstractFactory{

    factoryMethod(dataEnd, userId, hallId, dataBeg){
        var dataE = new Date(dataEnd)
        var timeStart = new Date(dataBeg).getTime(),
        timeFinish =  new Date(dataEnd).getTime();
        if((timeFinish - timeStart) > 3600000){
            var dateStart = new Date(dataBeg)
            dateStart.setHours(dateStart.getHours() + 1)
            dataE = dateStart
        }
        return new LectureConference(dataE,userId,hallId,dataBeg)
    }
}

