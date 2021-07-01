export const getEvent = (event)=>{
    if(event.constructor === TouchEvent){
        return event.touches[0];
    }else{
        return event;
    }
}
