import { createServer } from './config/express';

require('./config');

const port = process.env.PORT || 5000;

const app = createServer();

app.listen(port, () => {
  console.log(`Server is ready on port: ${port}`);
});
