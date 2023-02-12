import express  from "express";
import bodyParser from "body-parser";
import userRoutes from './routes/user.js';
const app = express();
const PORT = 8080;
app.use(bodyParser.json());
app.get('/', (req, res) =>
{
    console.log('GET request successful');
})

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.use('/api',userRoutes);

app.listen(PORT, ()=>{
console.log(`listening on : http://localhost:${PORT}`)
});
