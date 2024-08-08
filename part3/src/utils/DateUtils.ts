export const convertToDateString = (time:number):string => {

    const date = new Date(time);
    
    const addZeroIfOneCharacter = (num:number):string => {
        if(num<10) {
            return `0${num}`
        }
        return num.toString();
    }

    return `${date.getFullYear()}-${addZeroIfOneCharacter(date.getMonth()+1)}-${addZeroIfOneCharacter(date.getDate())} / ${addZeroIfOneCharacter(date.getHours())}:${addZeroIfOneCharacter(date.getMinutes())}`
}