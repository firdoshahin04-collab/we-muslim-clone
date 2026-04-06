import { Coordinates, CalculationMethod, PrayerTimes, SunnahTimes, Qibla } from 'adhan';

export function getPrayerTimes(lat: number, lng: number, date: Date = new Date()) {
  const coords = new Coordinates(lat, lng);
  const params = CalculationMethod.MuslimWorldLeague();
  const prayerTimes = new PrayerTimes(coords, date, params);
  const sunnahTimes = new SunnahTimes(prayerTimes);
  
  return {
    fajr: prayerTimes.fajr,
    sunrise: prayerTimes.sunrise,
    dhuhr: prayerTimes.dhuhr,
    asr: prayerTimes.asr,
    maghrib: prayerTimes.maghrib,
    isha: prayerTimes.isha,
    middleOfTheNight: sunnahTimes.middleOfTheNight,
    lastThirdOfTheNight: sunnahTimes.lastThirdOfTheNight,
    current: prayerTimes.currentPrayer(),
    next: prayerTimes.nextPrayer(),
    timeForNext: prayerTimes.timeForPrayer(prayerTimes.nextPrayer()),
  };
}

export function getQiblaDirection(lat: number, lng: number) {
  const coords = new Coordinates(lat, lng);
  return Qibla(coords);
}
