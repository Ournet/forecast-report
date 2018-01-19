
import { HourlyDataBlock, DailyDataBlock } from './DataBlock';


export interface Report {
    latitude: number
    longitude: number
    units: ReportUnits

    hourly?: HourlyDataBlock
    details?: HourlyDataBlock
    daily?: DailyDataBlock
}

export enum ReportUnits {
    SI = 'si'
}
