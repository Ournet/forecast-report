
import { ReportHelpers } from './ReportHelpers';
import test from 'ava';

test('getSun', t => {
    const sun = ReportHelpers.getSun(new Date(), { latitude: 47.01, longitude: 28.52 });
    t.is(true, !!sun);
});

test('getMoon', t => {
    const moon = ReportHelpers.getMoon(new Date());
    console.log(moon);
    t.is(true, !!moon);
});
