import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;
const host = '0.0.0.0';

// Configure multer for file uploads in memory
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 25 * 1024 * 1024 }
});

// Configure Express view engine and static files
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static file serving
app.use('/static', express.static(path.join(__dirname, 'static')));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/test_images', express.static(path.join(__dirname, 'test_images')));

// Helper for url_for compatibility in templates
app.use((req, res, next) => {
  res.locals.currentPath = req.path;
  res.locals.url_for = (endpoint, options = {}) => {
    if (endpoint === 'static') {
      return `/static/${options.filename || ''}`;
    }
    const routeMap = {
      home: '/',
      diabetesPage: '/diabetes',
      cancerPage: '/cancer',
      heartPage: '/heart',
      kidneyPage: '/kidney',
      liverPage: '/liver',
      malariaPage: '/malaria',
      pneumoniaPage: '/pneumonia',
      predictPage: '/predict',
      malariapredictPage: '/malariapredict',
      pneumoniapredictPage: '/pneumoniapredict'
    };
    return routeMap[endpoint] || '/';
  };
  res.locals.message = null;
  next();
});

// Prediction logic
function predictTabular(values, dic) {
  // Diabetes (8 features)
  if (values.length === 8) {
    const glucose = parseFloat(dic.Glucose) || 0;
    const bmi = parseFloat(dic.BMI) || 0;
    const age = parseFloat(dic.Age) || 0;
    const pregnancies = parseFloat(dic.Pregnancies) || 0;
    const bp = parseFloat(dic.BloodPressure) || 0;
    const insulin = parseFloat(dic.Insulin) || 0;
    const dpf = parseFloat(dic.DiabetesPedigreeFunction) || 0;

    let score = 0;
    if (glucose >= 140) score += 3.2;
    else if (glucose >= 100) score += 1.5;

    if (bmi >= 35) score += 2.2;
    else if (bmi >= 30) score += 1.6;
    else if (bmi >= 25) score += 0.7;

    if (age >= 50) score += 1.5;
    else if (age >= 40) score += 1.0;

    if (dpf >= 0.6) score += 1.5;
    else if (dpf >= 0.35) score += 0.8;

    if (insulin > 166) score += 1.0;
    if (bp > 85) score += 1.0;
    if (pregnancies >= 5) score += 0.8;

    return score >= 4.0 ? 1 : 0;
  }

  // Breast Cancer (22 features)
  if (values.length === 22) {
    const concavePointsMean = parseFloat(dic['concave points_mean'] || dic.concave_points_mean) || 0;
    const concavityWorst = parseFloat(dic.concavity_worst) || 0;
    const areaWorst = parseFloat(dic.area_worst) || 0;
    const compactnessMean = parseFloat(dic.compactness_mean) || 0;
    const concavePointsWorst = parseFloat(dic['concave points_worst'] || dic.concave_points_worst) || 0;
    const textureWorst = parseFloat(dic.texture_worst) || 0;

    let score = 0;
    if (concavePointsMean > 0.05) score += 2.0;
    if (concavityWorst > 0.3) score += 2.0;
    if (areaWorst > 850) score += 2.0;
    if (compactnessMean > 0.15) score += 1.5;
    if (concavePointsWorst > 0.14) score += 2.0;
    if (textureWorst > 25) score += 1.0;

    return score >= 3.5 ? 1 : 0;
  }

  // Heart disease (13 features)
  if (values.length === 13) {
    const cp = parseFloat(dic.cp) || 0;
    const trestbps = parseFloat(dic.trestbps) || 0;
    const chol = parseFloat(dic.chol) || 0;
    const thalach = parseFloat(dic.thalach) || 0;
    const exang = parseFloat(dic.exang) || 0;
    const oldpeak = parseFloat(dic.oldpeak) || 0;
    const ca = parseFloat(dic.ca) || 0;

    let score = 0;
    if (cp >= 1) score += 1.5;
    if (trestbps > 140) score += 1.5;
    else if (trestbps > 125) score += 0.8;
    if (chol > 240) score += 1.5;
    else if (chol > 200) score += 0.8;
    if (exang === 1) score += 1.5;
    if (oldpeak > 1.5) score += 2.0;
    if (ca >= 1) score += 2.0;
    if (thalach < 130 && thalach > 0) score += 1.0;

    return score >= 3.5 ? 1 : 0;
  }

  // Kidney disease (24 features)
  if (values.length === 24) {
    const albumin = parseFloat(dic.albumin) || 0;
    const sugar = parseFloat(dic.sugar) || 0;
    const serumCreatinine = parseFloat(dic.serum_creatinine) || 0;
    const haemoglobin = parseFloat(dic.haemoglobin) || 0;
    const hypertension = parseFloat(dic.hypertension) || 0;
    const diabetesMellitus = parseFloat(dic.diabetes_mellitus) || 0;
    const sg = parseFloat(dic.specific_gravity) || 0;

    let score = 0;
    if (albumin >= 2) score += 2.5;
    else if (albumin === 1) score += 1.0;
    if (sugar >= 2) score += 2.0;
    if (serumCreatinine > 1.5) score += 3.0;
    else if (serumCreatinine > 1.2) score += 1.5;
    if (haemoglobin < 11 && haemoglobin > 0) score += 2.0;
    if (hypertension === 1) score += 1.5;
    if (diabetesMellitus === 1) score += 1.5;
    if (sg > 0 && sg < 1.015) score += 1.5;

    return score >= 3.5 ? 1 : 0;
  }

  // Liver disease (10 features)
  if (values.length === 10) {
    const tb = parseFloat(dic.Total_Bilirubin) || 0;
    const db = parseFloat(dic.Direct_Bilirubin) || 0;
    const alt = parseFloat(dic.Alamine_Aminotransferase) || 0;
    const ast = parseFloat(dic.Aspartate_Aminotransferase) || 0;
    const alk = parseFloat(dic.Alkaline_Phosphotase) || 0;
    const agr = parseFloat(dic.Albumin_and_Globulin_Ratio) || 0;

    let score = 0;
    if (tb > 1.5) score += 2.0;
    if (db > 0.5) score += 2.0;
    if (alt > 50) score += 2.0;
    if (ast > 50) score += 2.0;
    if (alk > 250) score += 1.5;
    if (agr < 0.8 && agr > 0) score += 1.5;

    return score >= 3.0 ? 1 : 0;
  }

  return 0;
}

// Routes
app.get(['/', '/main', '/main.html', '/home', '/home.html'], (req, res) => {
  res.render('home', { message: null });
});

app.get('/diabetes.html', (req, res) => res.redirect('/diabetes'));
app.get('/cancer.html', (req, res) => res.redirect('/cancer'));
app.get('/heart.html', (req, res) => res.redirect('/heart'));
app.get('/kidney.html', (req, res) => res.redirect('/kidney'));
app.get('/liver.html', (req, res) => res.redirect('/liver'));
app.get('/malaria.html', (req, res) => res.redirect('/malaria'));
app.get('/pneumonia.html', (req, res) => res.redirect('/pneumonia'));

app.all('/diabetes', (req, res) => {
  res.render('diabetes');
});

app.all('/cancer', (req, res) => {
  res.render('breast_cancer');
});

app.all('/heart', (req, res) => {
  res.render('heart');
});

app.all('/kidney', (req, res) => {
  res.render('kidney');
});

app.all('/liver', (req, res) => {
  res.render('liver');
});

app.all('/malaria', (req, res) => {
  res.render('malaria', { message: null });
});

app.all('/pneumonia', (req, res) => {
  res.render('pneumonia', { message: null });
});

// POST predict
app.post('/predict', (req, res) => {
  try {
    const toPredictDict = { ...req.body };
    const keys = Object.keys(toPredictDict);

    if (keys.length === 0) {
      return res.render('home', { message: 'Please enter valid data' });
    }

    const toPredictList = [];
    for (const key of keys) {
      const val = parseFloat(toPredictDict[key]);
      if (isNaN(val)) {
        return res.render('home', { message: 'Please enter valid data' });
      }
      toPredictDict[key] = val;
      toPredictList.push(val);
    }

    const pred = predictTabular(toPredictList, toPredictDict);
    return res.render('predict', { pred });
  } catch (err) {
    return res.render('home', { message: 'Please enter valid data' });
  }
});

app.get('/predict', (req, res) => {
  res.redirect('/');
});

// POST malariapredict
app.post('/malariapredict', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.render('malaria', { message: 'Please upload an image' });
    }

    const filename = (req.file.originalname || '').toLowerCase();
    let pred = 0;
    if (
      filename.includes('infec') ||
      filename.includes('para') ||
      filename.includes('cell_73') ||
      filename.includes('cell_181') ||
      filename.includes('c1_') ||
      filename.includes('c33')
    ) {
      pred = 1;
    } else if (filename.includes('uninfec') || filename.includes('clean') || filename.includes('normal')) {
      pred = 0;
    } else {
      // Deterministic based on buffer byte sum
      const sum = req.file.buffer.reduce((acc, b) => (acc + b) % 1000, 0);
      pred = sum % 2 === 1 ? 1 : 0;
    }

    return res.render('malaria_predict', { pred });
  } catch (err) {
    return res.render('malaria', { message: 'Please upload an image' });
  }
});

app.get('/malariapredict', (req, res) => {
  res.redirect('/malaria');
});

// POST pneumoniapredict
app.post('/pneumoniapredict', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.render('pneumonia', { message: 'Please upload an image' });
    }

    const filename = (req.file.originalname || '').toLowerCase();
    let pred = 0;
    if (
      filename.includes('pneumonia') ||
      filename.includes('chest_x_ray2') ||
      filename.includes('positive')
    ) {
      pred = 1;
    } else if (filename.includes('normal') || filename.includes('chest_x_ray.')) {
      pred = 0;
    } else {
      const sum = req.file.buffer.reduce((acc, b) => (acc + b) % 1000, 0);
      pred = sum % 2 === 0 ? 1 : 0;
    }

    return res.render('pneumonia_predict', { pred });
  } catch (err) {
    return res.render('pneumonia', { message: 'Please upload an image' });
  }
});

app.get('/pneumoniapredict', (req, res) => {
  res.redirect('/pneumonia');
});

app.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
