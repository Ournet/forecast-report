
import { ForecastIcon } from './icon';

export type DataPoint = DailyDataPoint | HourlyDataPoint;

export interface BaseDataPoint {
    cloudCover?: number
    dewPoint?: number
    humidity?: number
    icon: ForecastIcon
    night?: boolean
    ozone?: number
    precipAccumulation?: number
    precipIntensity?: number
    precipProbability?: number
    precipType?: PrecipTypeEnum
    pressure?: number
    summary?: string
    temperature: number
    time: Date
    uvIndex?: number
    visibility?: number
    windBearing?: number
    windGust?: number
    windSpeed?: number
}

export interface HourlyDataPoint extends BaseDataPoint {
    
}

export interface IntervalDataPoint extends BaseDataPoint {
    /** 1 - for a hour, 2 - for next two hours, 3 - for next 3 hours, etc. */
    hours?: number

    apparentTemperature?: number
    apparentTemperatureHigh?: number
    apparentTemperatureHighTime?: Date
    apparentTemperatureLow?: number
    apparentTemperatureLowTime?: Date

    precipIntensityMax?: number
    precipIntensityMaxTime?: number

    temperatureHigh?: number
    temperatureHighTime?: Date
    temperatureLow?: number
    temperatureLowTime?: Date

    uvIndexTime?: Date
}

export interface DailyDataPoint extends IntervalDataPoint {
    moonPhase?: number

    sunriseTime?: Date
    sunsetTime?: Date
}

export enum PrecipTypeEnum {
    RAIN = 'rain',
    SNOW = 'snow',
    SLEET = 'sleet',
}
