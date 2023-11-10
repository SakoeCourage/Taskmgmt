import dayjs from "dayjs"
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime)



type dateReformat<T> = (date: T) => T | undefined;

export const dateReformat: dateReformat<string> = (date: string) => {
    if (date) {
        return dayjs(date).format('DD/MM/YYYY').toString();
    }
}


type diffForHumans<T> = (date: T) => T | undefined;

export const diffForHumans: diffForHumans<string> = (date: string) => {
    if (date) {
        return dayjs(date).fromNow();
    }
}