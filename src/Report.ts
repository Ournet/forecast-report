
import { HourlyDataBlock, DailyDataBlock, HoursDataBlock } from './DataBlock';
import { ForecastUnits } from './common';


export interface Report {
    latitude: number
    longitude: number
    units: ForecastUnits
    timezone: string

    hourly?: HourlyDataBlock
    details?: HoursDataBlock
    daily?: DailyDataBlock
}
