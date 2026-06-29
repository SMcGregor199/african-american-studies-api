import dotenv from 'dotenv';
import { createApp } from './app.js';

dotenv.config();

const PORT = process.env.PORT || 9000;
const SERVER_TYPE = process.env.SERVER_TYPE || 'local';
const app = createApp();

app.listen(PORT, () => {
  console.log(`Starting the ${SERVER_TYPE} server`);
  console.log(`Server is running at http://localhost:${PORT}`);
});
