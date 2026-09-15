# Hand Gesture Recognition

A real-time hand gesture recognition system powered by deep learning. This web application uses a trained CNN model to recognize 10 different hand gestures with **99.96% accuracy**.

## Features

🖐️ **Real-time Detection** - Recognizes gestures in real-time using your webcam

📊 **High Accuracy** - CNN model trained with 99.96% validation accuracy

🎯 **10 Gesture Classes** - Palm, L-shape, Fist, Thumb, OK sign, and more

🚀 **Fast Inference** - Runs entirely in your browser using TensorFlow.js

📱 **Responsive Design** - Works on desktop and mobile devices

🎨 **Modern UI** - Beautiful, intuitive interface with real-time feedback

## Supported Gestures

1. **✋ Palm** - Open hand
2. **👉 L Shape** - Index and thumb extended
3. **✊ Fist** - Closed hand
4. **👊 Fist Moved** - Moving closed hand
5. **👍 Thumb** - Thumbs up
6. **☝️ Index** - Pointing finger
7. **👌 OK Sign** - OK/Circle gesture
8. **🤚 Palm Moved** - Moving open hand
9. **🤌 C Shape** - Hand in C position
10. **👎 Down** - Thumbs down

## Model Architecture

- **Type**: Convolutional Neural Network (CNN)
- **Input**: 150×150 grayscale images
- **Layers**: 4 Conv2D + MaxPooling, Dense layers
- **Parameters**: 4.1M trainable parameters
- **Accuracy**: 99.96% on validation set
- **Framework**: TensorFlow.js

## Installation

### Prerequisites
- Node.js 16+ and npm

### Local Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/hand-gesture-recognition.git
cd hand-gesture-recognition

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:3000`

## Usage

1. **Allow Camera Access** - The app will request permission to access your webcam
2. **Position Your Hand** - Place your hand in the camera frame
3. **See Real-time Results** - The detected gesture appears instantly with confidence score
4. **View Predictions** - See top predictions and confidence levels for all gestures

## Deployment

### Deploy to Vercel (Recommended)

Vercel provides the fastest deployment for React apps with automatic builds and free hosting.

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

Or connect your GitHub repository to Vercel for automatic deployments.

**Vercel Dashboard**: https://vercel.com

### Deploy to Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build the project
npm run build

# Deploy
netlify deploy --prod --dir=dist
```

Or drag and drop the `dist` folder at https://app.netlify.com/drop

**Netlify Dashboard**: https://netlify.com

### Deploy to GitHub Pages

```bash
# Build the project
npm run build

# Push dist folder to gh-pages branch
npm install --save-dev gh-pages

# Update package.json with:
# "homepage": "https://yourusername.github.io/hand-gesture-recognition",
# Add to scripts: "deploy": "gh-pages -d dist"

npm run deploy
```

### Deploy to Hugging Face Spaces (Great for ML projects)

1. Create account at https://huggingface.co
2. Create new Space (select Docker template)
3. Upload your project files
4. Hugging Face will handle deployment automatically

## Technology Stack

- **Frontend**: React 18 + Vite
- **ML Framework**: TensorFlow.js
- **Styling**: Tailwind CSS
- **Video Processing**: HTML5 Canvas API
- **Build Tool**: Vite

## Performance

- **Inference Time**: ~100ms per frame
- **Webcam FPS**: 10-30 fps (depending on device)
- **Model Size**: ~15 MB
- **Browser Support**: All modern browsers (Chrome, Firefox, Safari, Edge)

## Browser Requirements

- Modern browser with WebGL support
- Webcam/camera access
- 4GB RAM minimum
- High-speed internet recommended for model download

## File Structure

```
├── index.html              # Main HTML file
├── src/
│   ├── main.jsx           # React entry point
│   ├── App.jsx            # Main app component
│   ├── index.css          # Global styles
│   └── components/
│       ├── GestureRecognizer.jsx  # Main logic
│       ├── WebcamFeed.jsx         # Camera feed
│       ├── GestureDisplay.jsx     # Gesture results
│       └── ModelInfo.jsx          # Model details
├── package.json           # Dependencies
├── vite.config.js         # Vite configuration
├── tailwind.config.js     # Tailwind CSS config
└── postcss.config.js      # PostCSS configuration
```

## Model Training Details

The CNN model was trained on the Leap Gesture Recognition Dataset:
- **Dataset**: 10 gesture classes
- **Training Images**: ~20,000 samples
- **Validation Split**: 25%
- **Epochs**: 3
- **Batch Size**: 128
- **Optimizer**: Adam (lr=0.001)
- **Loss**: Categorical Crossentropy

## Optimization Tips for Interview

1. **Good Lighting**: Ensure well-lit environment for best accuracy
2. **Clear Hand Position**: Position entire hand within frame
3. **Stable Camera**: Avoid shaking for better predictions
4. **Different Angles**: Test from various angles to show robustness

## Troubleshooting

**Camera not working?**
- Check browser permissions
- Try a different browser
- Ensure camera is not in use by another app

**Model loading slowly?**
- This is normal for first load (~20-30s)
- Model is cached after first load
- Use a faster internet connection

**Low accuracy?**
- Ensure good lighting
- Position hand fully in frame
- Try different hand angles
- Check camera resolution

## Future Enhancements

- [ ] Add hand skeleton visualization
- [ ] Support for two-hand detection
- [ ] Gesture sequence recognition
- [ ] Performance analytics dashboard
- [ ] Export predictions to CSV
- [ ] Multi-language support

## License

MIT License - Feel free to use this project for personal or commercial purposes.

## Author

Created by Akshay Karthick MS

## Contact & Support

- **GitHub**: https://github.com/AkshayKarthickMS
- **Email**: akshaykarthick486@gmail.com
- **LinkedIn**: [Your LinkedIn]

---

**Made with ❤️ for Interview Preparation**

If you find this project helpful, please star ⭐ the repository!
