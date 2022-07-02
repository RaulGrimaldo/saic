const express = require('express');
const connectDB = require('./config/db');
const helmet = require('helmet');
const path = require('path');
const app = express();

app.set('trust proxy', true);


app.use(helmet.crossOriginEmbedderPolicy());
app.use(helmet.crossOriginOpenerPolicy());
app.use(helmet.crossOriginResourcePolicy());
app.use(helmet.dnsPrefetchControl());
app.use(helmet.expectCt());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());
app.use(helmet.hsts());
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.originAgentCluster());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(helmet.xssFilter());

app.use(helmet({
  contentSecurityPolicy: {
      directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'" , "'unsafe-inline'",
          "https://www.google.com", "http://google.com/"],
          styleSrc: ["'self'" , "'unsafe-inline'",
          'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css',
            'https://fonts.googleapis.com/icon?family=Material+Icons',
           'https://use.fontawesome.com/releases/v5.6.3/css/all.css'           ],
          imgSrc: ["*", 'data:', '/client/assets/'],
          connectSrc: ["'self'", "'unsafe-inline'", "google.com"],
          frameSrc: ["'self'"]
      },
  }
}));

app.use((req, res, next) => {
  res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  res.setHeader("X-Robots-Tag", "noindex, nofollow");
  next();
});
// Connect Database
connectDB();

// Init Middleware
app.use(express.json());

// Define Routes
app.use('/api/admin', require('./routes/api/admin'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/registers', require('./routes/api/registers'));

//app.get('/', (req, res) => res.send('API trabajando...')); 

//Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
  
    app.get('*', (req, res) => {      
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }       
 
const PORT = process.env.PORT || 8080;


app.listen(PORT, () => console.log(`Servidor incicializado en el puerto: ${PORT}`));

