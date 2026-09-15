"""
Converts the trained Keras .h5 model into a TensorFlow.js layers model
under public/model/, which the React app loads at runtime via
tf.loadLayersModel('/model/model.json').

Usage:
    python convert_to_tfjs.py
"""
import os

import tensorflowjs as tfjs
from tensorflow.keras.models import load_model

HERE = os.path.dirname(__file__)
H5_PATH = os.path.join(HERE, "artifacts", "hand_gesture_model.h5")
OUT_DIR = os.path.join(HERE, "..", "public", "model")


def main():
    print(f"Loading {H5_PATH}")
    model = load_model(H5_PATH)

    os.makedirs(OUT_DIR, exist_ok=True)
    tfjs.converters.save_keras_model(model, OUT_DIR)
    print(f"Wrote TensorFlow.js model to {OUT_DIR}")


if __name__ == "__main__":
    main()
