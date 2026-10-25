# MEDORA: Predictive Disease Intelligence Through Data-Driven Clinical Feature Analysis

**Developed by:** Kamalhiiny G &amp; Harini S  
**Platform:** Clinical Decision-Support & Diagnostic Modeling Suite  
**Runtime:** Node.js 22 LTS / Express.js / EJS  

---

## 📋 Executive Overview

**MEDORA** (*Predictive Disease Intelligence Through Data-Driven Clinical Feature Analysis*) is a unified medical intelligence platform providing algorithmic risk stratification across seven critical pathological domains. By synthesizing multi-parameter clinical lab results, electrophysiological metrics, and medical imaging data, MEDORA delivers rapid, deterministic inference to support early detection and clinical risk awareness.

The suite encompasses seven validated diagnostic modalities spanning endocrinology, oncology, cardiology, nephrology, hepatology, parasitology, and pulmonology.

---

## 🔬 Diagnostic Modalities & Model Benchmarks

| Domain | Condition | Input Modality | Feature Count | Validated Accuracy |
| :--- | :--- | :--- | :--- | :--- |
| **Endocrinology** | Diabetes Mellitus | Metabolic & Biometric Biomarkers | 8 parameters | **92.54%** |
| **Oncology** | Breast Cancer | Fine Needle Aspirate (FNA) Cytology | 22 morphometrics | **97.66%** |
| **Cardiology** | Cardiovascular Disease | Hemodynamic & Electrocardiographic | 13 parameters | **98.70%** |
| **Nephrology** | Chronic Kidney Disease (CKD) | Renal Markers & Urinalysis Microscopic | 24 parameters | **99.16%** |
| **Hepatology** | Chronic Liver Disease | Serum Enzymes & Protein Fractions | 10 parameters | **71.18%** |
| **Parasitology** | Malaria Parasitemia | Giemsa-Stained Blood Smear Micrographs | Image (128×128) | **95.65%** |
| **Pulmonology** | Pneumonia | Anterior-Posterior Chest Radiographs (X-Ray) | Image (128×128) | **91.35%** |

---

## 🌟 Key Features

- **Multi-Condition Assessment:** Seven specialized diagnostic engines accessible through a clean, unified portal.
- **Biomarker Analysis:** Instant evaluation of laboratory chemistries, complete blood counts, urinalysis, and vital signs.
- **Medical Imaging Classifier:** Deep convolutional vision pipelines for Giemsa-stained thin blood smear micrographs and chest radiographs.
- **Interactive Preset Demo Profiles:** Pre-configured clinical profiles (Healthy vs. High-Risk) for every tabular disease model, enabling instant validation without manual data entry.
- **Bundled Image Test Datasets:** Quick-test options linking to validated sample smears and chest radiographs from clinical cohorts.
- **Clinical Assessment Reporting:** Clean diagnostic outcome cards displaying classification status, pathological risk assessment, and recommended clinical follow-up actions.
- **Responsive Mobile Navigation:** Full-featured fixed-top navigation with responsive collapse menu and seamless mobile UX.

---

## 🛠️ Architecture & Tech Stack

- **Server Runtime:** Node.js (v22 LTS)
- **Application Framework:** Express.js 4.x
- **Templating Engine:** EJS (Embedded JavaScript) with modular layout partials (`header.ejs`, `footer.ejs`)
- **Multipart Form & File Handling:** Multer memory-storage pipeline for in-memory image analysis
- **Design System:** Custom Medical Clinical UI
  - **Typography:** Plus Jakarta Sans (interface), JetBrains Mono (clinical numerals & units)
  - **Component Architecture:** Bootstrap 4 grid with modern card elevations
  - **Iconography:** Font Awesome 6 Pro / Solid
- **Network & Host Binding:** 0.0.0.0, Port 3000

---

## 📁 Repository Structure

```text
├── .env.example              # Environment configuration template
├── .gitignore                # Git ignore definitions
├── LICENSE                   # Software license
├── README.md                 # Complete project documentation
├── package.json              # Project dependencies and operational scripts
├── server.js                 # Express application server and diagnostic routing
├── static/                   # Static branding and icon assets
│   ├── favicon.ico           # Application favicon
│   ├── logo.png              # Primary MEDORA logo
│   └── logo1.png             # Secondary brand mark
├── test_images/              # Bundled clinical validation test imagery
│   ├── malaria/              # Sample parasitized blood smear micrographs
│   └── pneumonia/            # Sample chest radiographs
├── views/                    # EJS view templates
│   ├── partials/             # Shared layout components
│   │   ├── header.ejs        # Navigation bar, brand header, head scripts
│   │   └── footer.ejs        # Global footer, attribution, legal notes
│   ├── home.ejs              # Main diagnostic portal and disease benchmark directory
│   ├── diabetes.ejs          # Diabetes clinical biomarker input form
│   ├── breast_cancer.ejs     # Breast cancer cytopathology morphometry form
│   ├── heart.ejs             # Cardiovascular hemodynamic form
│   ├── kidney.ejs            # Renal function and urinalysis form
│   ├── liver.ejs             # Hepatic enzyme and bilirubin form
│   ├── malaria.ejs           # Thin blood smear micrograph upload suite
│   ├── pneumonia.ejs         # Chest radiograph upload suite
│   ├── predict.ejs           # Comprehensive tabular diagnostic report view
│   ├── malaria_predict.ejs   # Malaria pathology report view
│   └── pneumonia_predict.ejs # Pulmonology radiograph report view
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 18.x (Node.js 22 LTS recommended)
- **npm** >= 9.x

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/kamalhiiny/MULTI_DISEASE_PREDICTOR.git
   cd MULTI_DISEASE_PREDICTOR
   ```

2. **Install project dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment:**
   ```bash
   cp .env.example .env
   ```
   *(Defaults to `PORT=3000` and `HOST=0.0.0.0`)*

4. **Launch development server:**
   ```bash
   npm run dev
   ```

5. **Open in browser:**
   ```text
   http://localhost:3000
   ```

---

## 📊 Clinical Parameter Reference

### 1. Diabetes Mellitus (8 Parameters)
- `Pregnancies`: Number of gestations
- `Glucose`: 2-hour oral glucose tolerance test / plasma glucose concentration (`mg/dL`)
- `BloodPressure`: Diastolic blood pressure (`mmHg`)
- `SkinThickness`: Triceps skin fold thickness (`mm`)
- `Insulin`: 2-hour serum insulin (`µU/mL`)
- `BMI`: Body mass index ($\text{weight in kg}/(\text{height in m})^2$)
- `DiabetesPedigreeFunction`: Genetic risk score based on ancestral history
- `Age`: Patient age (`years`)

### 2. Breast Cancer FNA Morphometry (22 Parameters)
- **Mean Values:** `texture_mean`, `smoothness_mean`, `compactness_mean`, `concave points_mean`, `symmetry_mean`, `fractal_dimension_mean`
- **Standard Errors:** `texture_se`, `area_se`, `smoothness_se`, `compactness_se`, `concavity_se`, `concave points_se`, `symmetry_se`, `fractal_dimension_se`
- **Worst / Extreme Values:** `texture_worst`, `area_worst`, `smoothness_worst`, `compactness_worst`, `concavity_worst`, `concave points_worst`, `symmetry_worst`, `fractal_dimension_worst`

### 3. Cardiovascular Health (13 Parameters)
- `age`: Patient age (`years`)
- `sex`: Biological sex (1 = Male, 0 = Female)
- `cp`: Chest pain type (0: Typical Angina, 1: Atypical, 2: Non-anginal, 3: Asymptomatic)
- `trestbps`: Resting systolic blood pressure on hospital admission (`mmHg`)
- `chol`: Serum cholesterol (`mg/dL`)
- `fbs`: Fasting blood sugar &gt; 120 mg/dL (1 = True, 0 = False)
- `restecg`: Resting electrocardiographic findings (0: Normal, 1: ST-T Abnormality, 2: LVH)
- `thalach`: Maximum heart rate achieved during stress test (`bpm`)
- `exang`: Exercise-induced angina (1 = Yes, 0 = No)
- `oldpeak`: ST depression induced by exercise relative to rest
- `slope`: Slope of peak exercise ST segment (0: Upsloping, 1: Flat, 2: Downsloping)
- `ca`: Number of major vessels (0–3) visualized by fluoroscopy
- `thal`: Thallium scintigraphy defect (1: Normal, 2: Fixed, 3: Reversible)

### 4. Chronic Kidney Disease (24 Parameters)
- **Vitals & Urinalysis:** `age`, `blood_pressure`, `specific_gravity`, `albumin`, `sugar`, `red_blood_cells`, `pus_cell`, `pus_cell_clumps`, `bacteria`
- **Serum Chemistry:** `blood_glucose_random`, `blood_urea`, `serum_creatinine`, `sodium`, `potassium`, `haemoglobin`, `packed_cell_volume`, `white_blood_cell_count`, `red_blood_cell_count`
- **Comorbidities:** `hypertension`, `diabetes_mellitus`, `coronary_artery_disease`, `appetite`, `peda_edema`, `aanemia`

### 5. Hepatic Disease (10 Parameters)
- `Age`, `Gender`, `Total_Bilirubin` (`mg/dL`), `Direct_Bilirubin` (`mg/dL`), `Alkaline_Phosphotase` (`IU/L`), `Alamine_Aminotransferase` (`IU/L`), `Aspartate_Aminotransferase` (`IU/L`), `Total_Protiens` (`g/dL`), `Albumin` (`g/dL`), `Albumin_and_Globulin_Ratio`

### 6. Malaria Parasitemia Vision
- Accepts standard high-resolution or cropped thin blood film micrographs. Evaluates erythrocyte cytoplasm for ring-form trophozoites and chromatin dots.

### 7. Pneumonia Radiographic Vision
- Accepts standard anterior-posterior (AP) or posterior-anterior (PA) digital chest radiographs. Evaluates lung fields for consolidation, opacification, and air bronchograms.

---

## 👥 Authors

- **Kamalhiiny G**
- **Harini S**

---

## 📜 License

This project is licensed under the terms specified in the [LICENSE](LICENSE) file.
