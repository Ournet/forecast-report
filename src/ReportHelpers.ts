import { PrecipTypeEnum, IntervalDataPoint, BaseDataPoint, HourlyDataPoint, DailyDataPoint } from './DataPoint';
import { GeoPoint, ForecastTimePeriod } from './common';
import { DailyDataBlock } from './DataBlock';
import { ForecastIcon } from './icon';

const SunCalc = require('suncalc');

export class ReportHelpers {

    static dailyDataBlock(data: HourlyDataPoint[], geoPoint: GeoPoint) {

        const dailyDataBlock: DailyDataBlock = {
            period: ForecastTimePeriod.DAILY,
            icon: ReportHelpers.mostPopularIcon(data),
            data: null
        };

        let currentData: IntervalDataPoint[] = [];
        const dataByDays = data.reduce<DailyDataPoint[]>((result, current) => {
            if (currentData.length && currentData[currentData.length - 1].time.getDate() !== current.time.getDate()) {
                result.push(ReportHelpers.dailyDataPoint(currentData, geoPoint));
                currentData = [];
            } else {
                currentData.push(current);
            }

            return result;
        }, []);

        dailyDataBlock.data = dataByDays;

        return dailyDataBlock;
    }

    static dailyDataPoint(data: HourlyDataPoint[], geoPoint: GeoPoint): DailyDataPoint {
        const dayDataPoint = <DailyDataPoint>ReportHelpers.intervalDataPoint(data);

        const date = dayDataPoint.time;

        const sun = ReportHelpers.getSun(date, geoPoint);
        const moon = ReportHelpers.getMoon(date);

        dayDataPoint.sunriseTime = sun.sunrise;
        dayDataPoint.sunsetTime = sun.sunset;
        dayDataPoint.moonPhase = moon.phase;

        return dayDataPoint;
    }

    static getSun(date: Date, geoPoint: GeoPoint): { sunrise: Date, sunset: Date } {
        const times = SunCalc.getTimes(date, geoPoint.latitude, geoPoint.longitude);

        return { sunrise: times.sunrise, sunset: times.sunset };
    }

    static getMoon(date: Date): { fraction: number, phase: number } {
        const moon = SunCalc.getMoonIllumination(date);

        return {
            fraction: moon.fraction,
            phase: moon.phase
        };
    }

    static intervalDataPoint(data: BaseDataPoint[]): IntervalDataPoint {
        if (!data || !data.length) {
            throw new Error(`'data' must be un non empty array`);
        }
        const firstData = data[0];
        // const lastData = data[data.length - 1];
        const middleData = data[Math.round(data.length / 2)];

        let cloudCover = 0;
        let humidity = 0;
        let ozone = 0;
        let precipAccumulation = 0;
        let precipProbability = 0;
        let precipType: PrecipTypeEnum;
        let pressure = 0;
        let uvIndex = 0;
        let uvIndexMax = 0;
        let uvIndexTime: Date;
        let visibility = 0;
        let windGust = 0;
        let windSpeed = 0;
        let hours = 0;

        const tempData: { high: number, highTime: Date, low: number, lowTime: Date }
            = data.reduce((prev, current) => {
                const high = (<IntervalDataPoint>current).temperatureHigh;
                // has interval high
                if (high) {
                    if (high > prev.high) {
                        prev.high = high;
                        prev.highTime = (<IntervalDataPoint>current).temperatureHighTime;
                    }
                } else {
                    if (current.temperature > prev.high) {
                        prev.high = current.temperature;
                        prev.highTime = current.time;
                    }
                }
                const low = (<IntervalDataPoint>current).temperatureLow;
                // has interval low
                if (low) {
                    if (low > prev.low) {
                        prev.low = low;
                        prev.lowTime = (<IntervalDataPoint>current).temperatureLowTime;
                    }
                } else {
                    if (current.temperature < prev.high) {
                        prev.low = current.temperature;
                        prev.lowTime = current.time;
                    }
                }
                return prev;
            }, { high: 0, highTime: null, low: 100, lowTime: null });

        data.forEach(item => {
            cloudCover += (item.cloudCover || 0);
            humidity += (item.humidity || 0);
            ozone += (item.ozone || 0);
            precipAccumulation += (item.precipAccumulation || 0);
            precipProbability = precipProbability > item.precipProbability ?
                precipProbability : item.precipProbability;
            if (item.precipType) {
                // already set:
                if (precipType) {
                    if (item.precipType === 'snow') {
                        precipType = item.precipType;
                    }
                } else {
                    precipType = item.precipType;
                }
            }
            pressure += (item.pressure || 0);
            uvIndex += (item.uvIndex || 0);
            if (uvIndexMax < item.uvIndex) {
                uvIndexMax = item.uvIndex;
                uvIndexTime = item.time;
            }
            visibility += (item.visibility || 0);
            windGust += (item.windGust || 0);
            windSpeed += (item.windSpeed || 0);
            if ((<IntervalDataPoint>item).hours) {
                hours += ((<IntervalDataPoint>item).hours || 1);
            } else {
                hours++;
            }
        });

        cloudCover /= data.length;
        humidity /= data.length;
        ozone /= data.length;
        pressure /= data.length;
        uvIndex /= data.length;
        visibility /= data.length;
        windSpeed /= data.length;

        const dataPoint: IntervalDataPoint = {
            time: firstData.time,
            icon: middleData.icon,
            temperature: middleData.temperature,
            temperatureHigh: tempData.high, // highTempData.temperature,
            temperatureHighTime: tempData.highTime, // highTempData.time,
            temperatureLow: tempData.low, // lowTempData.temperature,
            temperatureLowTime: tempData.lowTime, // lowTempData.time,
            cloudCover: cloudCover,
            dewPoint: middleData.dewPoint,
            hours: hours,
            humidity: humidity,
            // moonPhase ?
            ozone: ozone,
            night: middleData.night,
            precipAccumulation: precipAccumulation,
            precipProbability: precipProbability,
            precipType: precipType,
            pressure: pressure,
            // summary ?
            // sunriseTime
            // sunsetTime
            uvIndex: uvIndex,
            uvIndexTime: uvIndexTime,
            visibility: visibility,
            windBearing: middleData.windBearing,
            windGust: windGust,
            windSpeed: windSpeed,

        };


        return dataPoint;
    }

    static mostPopularIcon(data: BaseDataPoint[]): ForecastIcon {
        const popularity: { [index: string]: number } = {};
        let mostPopularIcon: ForecastIcon;
        let mostPopularIconCount = 0;

        data.forEach(item => {
            popularity[item.icon] = popularity[item.icon] || 0;
            popularity[item.icon]++;
            if (popularity[item.icon] > mostPopularIconCount) {
                mostPopularIconCount = popularity[item.icon];
                mostPopularIcon = item.icon;
            }
        });

        return mostPopularIcon;
    }
}
