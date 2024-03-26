export  interface Holiday {
    date: string;
    name: string;
    nationalHoliday: boolean;
}

export interface Props {
    isHoliday: (date: Date) => boolean;
    getHolidaysWithinPeriod: (start: Date, end: Date) => Holiday[];
}
