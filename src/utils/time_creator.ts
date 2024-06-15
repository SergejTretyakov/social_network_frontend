export function GetTime(fulltime: string){
    var message_time = new Date(fulltime);
    var hours = message_time.getHours();
    var minutes = message_time.getMinutes();
    var formattedHours = hours < 10 ? '0' + hours : hours;
    var formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    return formattedHours + ":" + formattedMinutes;
}