
import { ForecastIcon } from './icon';

export type DataPoint = DailyDataPoint | HourlyDataPoint;

export interface BaseDataPoint {
    cloudCover?: number
    dewPoint?: number
    humidity?: number
    icon: ForecastIcon
    ozone?: number
    precipAccumulation?: number
    precipIntensity?: number
    precipProbability?: number
    precipType?: PrecipTypeEnum
    pressure?: number
    summary?: string
    temperature: number
    time: number
    uvIndex?: number
    visibility?: number
    windBearing?: number
    windGust?: number
    windSpeed?: number
}

export interface DailyDataPoint extends BaseDataPoint {
    apparentTemperature?: number
    apparentTemperatureHigh?: number
    apparentTemperatureHighTime?: number
    apparentTemperatureLow?: number
    apparentTemperatureLowTime?: number
    moonPhase?: number
    precipIntensityMax?: number
    precipIntensityMaxTime?: number
    sunriseTime?: number
    sunsetTime?: number
    temperatureHigh?: number
    temperatureHighTime?: number
    temperatureLow?: number
    temperatureLowTime?: number
    uvIndexTime?: number
}

export interface HourlyDataPoint extends BaseDataPoint {
    /** Time span: 1 - for a your, 2 - for next two yours, 3 - for next 3 hours, etc. */
    // timeSpan?: number
}

export enum PrecipTypeEnum {
    RAIN = 'rain',
    SNOW = 'snow',
    SLEET = 'sleet',
}
