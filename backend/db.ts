import mongoose from 'mongoose';
import { config } from './config/config';
import Logger from './library/logger';
const url: string = config.mongo.uri;

/** Connecting to Database */

mongoose.set("toJSON", {
  virtuals: true,
  transform: (doc, converted) => {
    delete converted.__v;
  },
});
const connection = mongoose
  .connect(url)
  .then((result) => {
    Logger.success(`Mongodb connected successfully to host ${result.connection.host}`);
  })
  .catch((err) => {
    Logger.error(`Database not connected  \n ${err}`);
  });

mongoose.set('strictQuery', false);
mongoose.set('strictPopulate', false);

mongoose.connection.on('disconnected', function () {
  Logger.info('Mongodb connected disconnected');
});

export default mongoose;
