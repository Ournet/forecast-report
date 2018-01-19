
import { HourlyDataBlock, DailyDataBlock, IntervalDataBlock } from './DataBlock';


export interface Report {
    latitude: number
    longitude: number
    units: ReportUnits

    hourly?: HourlyDataBlock
    details?: IntervalDataBlock
    daily?: DailyDataBlock
}

export enum ReportUnits {
    SI = 'si'
}
