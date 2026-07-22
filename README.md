# 🧬 BenchWise

**An intelligent laboratory protocol review platform for biotechnology students and wet-lab researchers.**

BenchWise is an AI-powered web application designed to help biotechnology students and laboratory researchers review experimental protocols, troubleshoot failed experiments, and perform accurate master mix calculations. It combines artificial intelligence with practical laboratory utilities to improve experimental planning, reproducibility, and learning.

---

## 🌍 Live Demo

**Live Application:**
https://bench-wise.vercel.app

---

## 💡 The Problem

During laboratory courses and practical sessions, I noticed that experimental protocols can often be difficult to interpret, especially for students who are still developing their laboratory skills. Small omissions—such as missing reagent concentrations, incubation times, control samples, or safety considerations—can affect reproducibility and lead to failed experiments.

As a biotechnology student, I have personally experienced how challenging it can be to troubleshoot laboratory experiments when something goes wrong. Students often spend significant time trying to identify possible causes of failure by searching through notes, laboratory manuals, or multiple online resources.

I built **BenchWise** to provide an educational assistant that helps users review laboratory protocols, identify missing information, troubleshoot common experimental problems, and perform laboratory calculations in one centralized platform. The goal is not to replace laboratory instructors or institutional SOPs, but to support learning, encourage best laboratory practices, and improve confidence while preparing experiments.

---

# ✨ Features

- 🤖 AI-powered laboratory protocol review
- 📊 Overall protocol quality score
- 📈 AI confidence meter with explanation
- ⚠️ Detection of missing protocol information
- 🔬 Laboratory safety recommendations
- 🧪 Good Laboratory Practice (GLP) guidance
- 📝 Suggested protocol improvements
- 🔍 AI-powered experiment troubleshooting
- 📋 Root cause analysis with ranked probabilities
- ✅ Interactive verification checklist
- 🧮 Deterministic Master Mix Calculator (no AI required)
- 📄 Copy, Print, and Export reports
- 🌙 Responsive modern interface with dark and light mode
- 📱 Mobile-friendly design

---

# 🤖 AI Feature

BenchWise uses Google's Gemini model to perform structured laboratory protocol reviews and experiment troubleshooting.

Unlike a general chatbot, the AI is instructed to behave as an educational laboratory assistant that:

- Reviews biotechnology laboratory protocols
- Identifies missing experimental information
- Detects reproducibility concerns
- Highlights laboratory safety considerations
- Suggests improvements following accepted laboratory best practices
- Provides probability-based troubleshooting instead of absolute conclusions
- Clearly communicates confidence levels and uncertainty when information is incomplete

The Master Mix Calculator intentionally performs deterministic mathematical calculations locally without using AI to ensure precise and reproducible laboratory calculations.

---

# 🧠 System Prompt Summary

The AI is instructed to:

- Act as an educational laboratory protocol reviewer.
- Never replace institutional laboratory SOPs.
- Avoid fabricating scientific information.
- Clearly communicate uncertainty.
- Recommend Good Laboratory Practices (GLP).
- Encourage reproducibility and laboratory safety.
- Base suggestions on accepted biotechnology laboratory practices.

---

# 🛠 Tech Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS

### Backend

- Node.js
- Express
- Vercel Serverless Functions

### Artificial Intelligence

- Google Gemini 3.6 Flash
- Google GenAI SDK

### Deployment

- GitHub
- Vercel

---

# 📷 Screenshots

### Home Page

<img width="1378" height="804" alt="Homepage " src="https://github.com/user-attachments/assets/87146106-4a50-49bd-a6eb-3f408425d881" />

---

### Protocol Review

<img width="1389" height="818" alt="Protocol Review" src="https://github.com/user-attachments/assets/1e9116e6-0f6f-48d4-834f-0bd66299dcb0" />
<img width="1387" height="819" alt="Protocol review 2" src="https://github.com/user-attachments/assets/7c279257-feed-43a4-b0c1-36d927ad2d0f" />

---

### Experiment Troubleshooter

<img width="1389" height="817" alt="Troubleshooter" src="https://github.com/user-attachments/assets/411fa3b3-f089-4cae-937e-5ee2dc576224" />

---

### Master Mix Calculator

<img width="1390" height="818" alt="Master Mix Calculator" src="https://github.com/user-attachments/assets/b8e7516d-c331-4bca-98ba-e4056fff171c" />

<img width="1381" height="816" alt="About" src="https://github.com/user-attachments/assets/33ce6d9c-9bba-4b0a-ba04-651806473b5a" />

---

# 🚀 How to Run the Project

Clone the repository:

```bash
https://github.com/bhuttamaryam41-ctrl/BenchWise.git
```

Install dependencies:

```bash
npm install
```

Configure your environment variables:

```env
GEMINI_API_KEY=YOUR_API_KEY
```

Run the development server:

```bash
npm run dev
```

---

# ⚠️ Educational Disclaimer

BenchWise is intended solely as an educational and research-support platform.

It does not replace institutional laboratory protocols, professional supervision, or biosafety regulations. Users should always follow their organization's Standard Operating Procedures (SOPs), laboratory safety guidelines, and consult qualified personnel before conducting experiments.

---

# 🌱 Future Improvements

- Laboratory notebook integration
- PDF protocol upload
- Image-based gel analysis
- Protocol version history
- User authentication
- Saved experiment workspace
- Collaboration features
- Additional biotechnology calculators

---

# 👩‍🔬 Author

**Maryam Bhutta**

BS Biotechnology  
International Islamic University Islamabad

Built as the final project for ACT AI.
