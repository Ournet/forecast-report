
import { DataPoint, DailyDataPoint, HourlyDataPoint } from './DataPoint';
import { ForecastIcon } from './icon';
import { ForecastTimePeriod } from './common';

export type DataBlock = DailyDataBlock | HourlyDataBlock;

export interface BaseDataBlock {
    period: ForecastTimePeriod
    icon: ForecastIcon
    night?: boolean
    summary?: string
    data: DataPoint[]
}

export interface DailyDataBlock extends BaseDataBlock {
    period: ForecastTimePeriod.DAILY
    data: DailyDataPoint[]
}

export interface HourlyDataBlock extends BaseDataBlock {
    period: ForecastTimePeriod.HOURLY
    data: HourlyDataPoint[]
}
