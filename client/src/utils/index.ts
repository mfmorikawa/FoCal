export default function stringDateFormat (date: Date | undefined): string {
    if (typeof(date) === "undefined")
        return "";
    const numbers = [
        (date.getMonth()+1).toString(),
        (date.getDate()+1).toString(),
        date.getHours().toString(),
        date.getMinutes().toString(),
        date.getSeconds().toString()
    ];
    const [
        month,
        day,
        hours,
        minutes,
        seconds
    ] = numbers.map((num)=>{
            if(num.length === 2)
                return num;
            return `0${num}`;
        });
    return `${date.getFullYear()}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}