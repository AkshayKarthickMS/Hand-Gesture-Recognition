"""
Trains the hand gesture CNN on the LeapGestRecog dataset and exports it as
Keras .h5 (kept locally, gitignored) plus a TensorFlow.js model under
public/model/ so the React app can load a real model instead of the mock one.

Usage:
    python train_model.py --data-dir <path to leapGestRecog folder>
"""
import argparse
import json
import os

import cv2
import numpy as np
from sklearn.model_selection import train_test_split
from tensorflow.keras import backend as K
from tensorflow.keras.callbacks import EarlyStopping, ReduceLROnPlateau
from tensorflow.keras.layers import Activation, Conv2D, Dense, Flatten, MaxPooling2D
from tensorflow.keras.models import Sequential
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.utils import to_categorical

IMG_SIZE = 150


def load_dataset(data_dir):
    lookup = {}
    reverselookup = {}
    count = 0
    subject0 = os.path.join(data_dir, "00")
    for j in sorted(os.listdir(subject0)):
        if not j.startswith("."):
            lookup[j] = count
            reverselookup[count] = j
            count += 1

    x_data, y_data = [], []
    datacount = 0
    for i in range(10):
        subject_dir = os.path.join(data_dir, f"0{i}")
        for gesture_folder in sorted(os.listdir(subject_dir)):
            if gesture_folder.startswith("."):
                continue
            gesture_path = os.path.join(subject_dir, gesture_folder)
            n = 0
            for img_name in os.listdir(gesture_path):
                img_path = os.path.join(gesture_path, img_name)
                img = cv2.imread(img_path, cv2.IMREAD_GRAYSCALE)
                img = cv2.resize(img, (IMG_SIZE, IMG_SIZE))
                x_data.append(np.array(img))
                n += 1
            y_data.append(np.full((n, 1), lookup[gesture_folder]))
            datacount += n

    x_data = np.array(x_data, dtype="float32")
    y_data = np.array(y_data).reshape(datacount, 1)
    return x_data, y_data, reverselookup, datacount


def build_model():
    model = Sequential()
    model.add(Conv2D(32, (5, 5), padding="same", activation="relu", input_shape=(IMG_SIZE, IMG_SIZE, 1)))
    model.add(MaxPooling2D(pool_size=(2, 2)))

    model.add(Conv2D(64, (3, 3), padding="same", activation="relu"))
    model.add(MaxPooling2D(pool_size=(2, 2), strides=(2, 2)))

    model.add(Conv2D(96, (3, 3), padding="same", activation="relu"))
    model.add(MaxPooling2D(pool_size=(2, 2), strides=(2, 2)))

    model.add(Conv2D(96, (3, 3), padding="same", activation="relu"))
    model.add(MaxPooling2D(pool_size=(2, 2), strides=(2, 2)))

    model.add(Flatten())
    model.add(Dense(512))
    model.add(Activation("relu"))
    model.add(Dense(10, activation="softmax"))
    return model


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--data-dir", required=True, help="Path to the leapGestRecog folder (contains 00..09)")
    parser.add_argument("--epochs", type=int, default=10)
    parser.add_argument("--batch-size", type=int, default=128)
    parser.add_argument("--out-dir", default=os.path.join(os.path.dirname(__file__), "artifacts"))
    args = parser.parse_args()

    os.makedirs(args.out_dir, exist_ok=True)

    print("Loading dataset...")
    x_data, y_data, reverselookup, datacount = load_dataset(args.data_dir)
    print(f"Loaded {datacount} images")

    y_data = to_categorical(y_data)
    x_data = x_data.reshape((datacount, IMG_SIZE, IMG_SIZE, 1))
    x_data = x_data / 255.0

    x_train, x_test, y_train, y_test = train_test_split(x_data, y_data, test_size=0.25, random_state=42)

    model = build_model()
    model.compile(optimizer=Adam(learning_rate=0.001), loss="categorical_crossentropy", metrics=["accuracy"])
    model.summary()

    callbacks = [
        EarlyStopping(monitor="val_loss", min_delta=0.001, patience=5, verbose=1, mode="auto"),
        ReduceLROnPlateau(monitor="val_loss", factor=0.1, patience=3, verbose=1, mode="auto"),
    ]

    history = model.fit(
        x_train,
        y_train,
        epochs=args.epochs,
        batch_size=args.batch_size,
        verbose=1,
        validation_data=(x_test, y_test),
        callbacks=callbacks,
    )

    val_loss, val_acc = model.evaluate(x_test, y_test)
    print(f"\nValidation Accuracy: {val_acc * 100:.2f}%")

    h5_path = os.path.join(args.out_dir, "hand_gesture_model.h5")
    model.save(h5_path)
    print(f"Saved Keras model to {h5_path}")

    labels_path = os.path.join(args.out_dir, "labels.json")
    with open(labels_path, "w") as f:
        json.dump(reverselookup, f, indent=2)
    print(f"Saved label map to {labels_path}")

    metrics_path = os.path.join(args.out_dir, "metrics.json")
    with open(metrics_path, "w") as f:
        json.dump(
            {
                "val_accuracy": float(val_acc),
                "val_loss": float(val_loss),
                "epochs_run": len(history.history["loss"]),
                "dataset_size": datacount,
            },
            f,
            indent=2,
        )
    print(f"Saved metrics to {metrics_path}")


if __name__ == "__main__":
    main()
