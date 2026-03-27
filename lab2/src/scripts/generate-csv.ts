import * as fs from 'fs';
import * as path from 'path';
import { stringify } from 'csv-stringify/sync';

const TOTAL_ROWS = 1000;

const firstNames = [
  'Олексій', 'Марія', 'Андрій', 'Юлія', 'Дмитро', 'Олена', 'Ігор', 'Катерина',
  'Тарас', 'Наталія', 'Богдан', 'Вікторія', 'Сергій', 'Анна', 'Максим',
  'Валерія', 'Роман', 'Софія', 'Артем', 'Діана', 'Павло', 'Ірина', 'Віктор',
  'Оксана', 'Євген', 'Людмила', 'Микола', 'Тетяна', 'Олег', 'Яна',
];

const lastNames = [
  'Шевченко', 'Бондаренко', 'Коваленко', 'Ткаченко', 'Кравченко', 'Мельник',
  'Литвиненко', 'Петренко', 'Іваненко', 'Сидоренко', 'Мороз', 'Лисенко',
  'Гриценко', 'Савченко', 'Руденко', 'Козак', 'Поліщук', 'Гончаренко',
  'Тимошенко', 'Павленко', 'Захарченко', 'Марченко', 'Левченко', 'Шевчук',
];

const locations = [
  'вул. Хрещатик 1', 'пр. Перемоги 25', 'вул. Сагайдачного 10', 'бул. Шевченка 14',
  'вул. Велика Васильківська 72', 'вул. Антоновича 33', 'пр. Науки 46',
  'вул. Ярославів Вал 5', 'вул. Саксаганського 120', 'вул. Гончара 55',
  'пр. Бажана 8', 'вул. Лесі Українки 30', 'пл. Льва Толстого 1',
  'вул. Жилянська 45', 'вул. Борщагівська 15', 'вул. Олімпійська 20',
  'вул. Січових Стрільців 50', 'пр. Голосіївський 12', 'вул. Мечникова 9',
  'бул. Дружби Народів 28',
];

const carModels = [
  'Toyota Camry', 'Hyundai Sonata', 'Volkswagen Passat', 'Skoda Octavia',
  'Renault Megane', 'Kia Sportage', 'Honda Civic', 'Nissan Leaf',
  'BMW 3 Series', 'Mercedes C-Class', 'Peugeot 508', 'Ford Focus',
  'Mazda 6', 'Chevrolet Malibu', 'Opel Astra',
];

const paymentMethods = ['cash', 'card', 'online'];
const rideStatuses = ['requested', 'accepted', 'in_progress', 'completed', 'cancelled'];
const paymentStatuses = ['pending', 'completed', 'failed', 'refunded'];
const driverStatuses = ['available', 'busy', 'offline'];
const carStatuses = ['active', 'maintenance', 'inactive'];

const ratingComments = [
  'Чудова поїздка!', 'Водій дуже ввічливий', 'Швидка доставка', 'Чисте авто',
  'Все добре', 'Непогано', 'Рекомендую', 'Приїхав вчасно', 'Комфортно',
  'Супер водій', 'Нормально', 'Дякую за поїздку', 'Акуратна їзда',
  'Знає місто добре', 'Приємна музика в авто',
];

function random<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generatePhone(): string {
  return `+380${randomInt(50, 99)}${String(randomInt(1000000, 9999999))}`;
}

function generatePlateNumber(): string {
  const letters = 'АВСЕНКМОРТХІ';
  const l1 = letters[randomInt(0, letters.length - 1)];
  const l2 = letters[randomInt(0, letters.length - 1)];
  return `${l1}${l2}${randomInt(1000, 9999)}${l1}${l2}`;
}

function generateLicense(): string {
  return `${String.fromCharCode(randomInt(65, 90))}${String.fromCharCode(randomInt(65, 90))}${randomInt(100000, 999999)}`;
}

const NUM_PASSENGERS = 80;
const NUM_DRIVERS = 40;

interface PassengerData {
  name: string;
  phone: string;
  rating: string;
  paymentMethod: string;
}

interface DriverData {
  name: string;
  phone: string;
  rating: string;
  licenseNumber: string;
  status: string;
  currentLocation: string;
  carModel: string;
  carPlateNumber: string;
  carStatus: string;
  carLocation: string;
}

const passengers: PassengerData[] = [];
const usedPhones = new Set<string>();
for (let i = 0; i < NUM_PASSENGERS; i++) {
  let phone: string;
  do {
    phone = generatePhone();
  } while (usedPhones.has(phone));
  usedPhones.add(phone);

  passengers.push({
    name: `${random(firstNames)} ${random(lastNames)}`,
    phone,
    rating: (Math.random() * 2 + 3).toFixed(1),
    paymentMethod: random(paymentMethods),
  });
}

const drivers: DriverData[] = [];
const usedLicenses = new Set<string>();
const usedPlates = new Set<string>();
for (let i = 0; i < NUM_DRIVERS; i++) {
  let phone: string;
  do {
    phone = generatePhone();
  } while (usedPhones.has(phone));
  usedPhones.add(phone);

  let license: string;
  do {
    license = generateLicense();
  } while (usedLicenses.has(license));
  usedLicenses.add(license);

  let plate: string;
  do {
    plate = generatePlateNumber();
  } while (usedPlates.has(plate));
  usedPlates.add(plate);

  const loc = random(locations);
  drivers.push({
    name: `${random(firstNames)} ${random(lastNames)}`,
    phone,
    rating: (Math.random() * 2 + 3).toFixed(1),
    licenseNumber: license,
    status: random(driverStatuses),
    currentLocation: loc,
    carModel: random(carModels),
    carPlateNumber: plate,
    carStatus: random(carStatuses),
    carLocation: loc,
  });
}

const headers = [
  'passenger_name', 'passenger_phone', 'passenger_rating', 'passenger_paymentMethod',
  'driver_name', 'driver_phone', 'driver_rating', 'driver_licenseNumber',
  'driver_status', 'driver_currentLocation',
  'car_model', 'car_plateNumber', 'car_status', 'car_location',
  'ride_startPoint', 'ride_destination', 'ride_price', 'ride_status',
  'payment_amount', 'payment_status', 'payment_paymentMethod',
  'rating_score', 'rating_comment',
];

const rows: string[][] = [];

for (let i = 0; i < TOTAL_ROWS; i++) {
  const passenger = random(passengers);
  const driver = random(drivers);
  const price = randomInt(50, 500);
  const rideStatus = random(rideStatuses);
  const paymentStatus = rideStatus === 'completed' ? 'completed' : rideStatus === 'cancelled' ? 'refunded' : random(paymentStatuses);
  const ratingScore = rideStatus === 'completed' ? randomInt(1, 5) : 0;
  const ratingComment = ratingScore > 0 ? random(ratingComments) : '';

  rows.push([
    passenger.name,
    passenger.phone,
    passenger.rating,
    passenger.paymentMethod,
    driver.name,
    driver.phone,
    driver.rating,
    driver.licenseNumber,
    driver.status,
    driver.currentLocation,
    driver.carModel,
    driver.carPlateNumber,
    driver.carStatus,
    driver.carLocation,
    random(locations),
    random(locations),
    price.toString(),
    rideStatus,
    price.toString(),
    paymentStatus,
    passenger.paymentMethod,
    ratingScore.toString(),
    ratingComment,
  ]);
}

const csv = stringify(rows, { header: true, columns: headers });

const outputPath = path.resolve(__dirname, '../../data/rides.csv');
const outputDir = path.dirname(outputPath);
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}
fs.writeFileSync(outputPath, csv);

