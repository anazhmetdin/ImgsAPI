import express from 'express';
import imgsRoutes from './api/images';

const app = express();

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('Server listening on port', port)
});

app.use('/api', imgsRoutes);

const myFunc = (num: number): number => {
    return num * num;
};
  
export default myFunc;