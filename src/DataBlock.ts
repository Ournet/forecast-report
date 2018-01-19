
import { DataPoint, DailyDataPoint, HourlyDataPoint, IntervalDataPoint } from './DataPoint';
import { ForecastIcon } from './icon';
import { ForecastTimePeriod } from './common';

export type DataBlock = DailyDataBlock | HourlyDataBlock | IntervalDataBlock;

export interface BaseDataBlock {
    period: ForecastTimePeriod
    icon: ForecastIcon
    night?: boolean
    summary?: string
    data: DataPoint[]
}

export interface IntervalDataBlock extends BaseDataBlock {
    period: ForecastTimePeriod.DAILY
    data: IntervalDataPoint[]
}

export interface DailyDataBlock extends BaseDataBlock {
    period: ForecastTimePeriod.DAILY
    data: DailyDataPoint[]
}

export interface HourlyDataBlock extends BaseDataBlock {
    period: ForecastTimePeriod.HOURLY
    data: HourlyDataPoint[]
}
