const fs = require('fs');
const Tour = require('./../../models/tourModel');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('yeyyyy');
  });
/// READ JSON FILE

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);

//// IMPORT DATA TO DB

const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('DATA LOADED');
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

// DELETE DATA FROM DB

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}

console.log(process.argv);
