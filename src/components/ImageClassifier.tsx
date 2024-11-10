import React, { useState, useEffect } from 'react';
import * as mobilenet from '@tensorflow-models/mobilenet';
import '@tensorflow/tfjs';

// Define the Classification type here
type Classification = {
    className: string;
    probability: number;
};

const ImageClassifier: React.FC = () => {
    const [model, setModel] = useState<mobilenet.MobileNet | null>(null);
    const [image, setImage] = useState<string | null>(null);
    const [predictions, setPredictions] = useState<Classification[]>([]);

    // Load the model on component mount
    useEffect(() => {
        const loadModel = async () => {
            const loadedModel = await mobilenet.load();
            setModel(loadedModel);
            console.log('Model loaded successfully');
        };
        loadModel();
    }, []);

    // Handle image upload
    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImage(imageUrl);
            setPredictions([]);
        }
    };

    // Make predictions when an image is set
    useEffect(() => {
        const classifyImage = async () => {
            if (model && image) {
                const imgElement = document.getElementById('uploaded-image') as HTMLImageElement;
                const results = await model.classify(imgElement);
                setPredictions(results);
            }
        };
        classifyImage();
    }, [model, image]);

    return (
        <div style={{ textAlign: 'center' }}>
            <h1>AI Image Classifier</h1>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            {image && <img id="uploaded-image" src={image} alt="Uploaded" style={{ width: '300px', marginTop: '20px' }} />}
            {predictions.length > 0 && (
                <div>
                    <h2>Predictions:</h2>
                    <ul>
                        {predictions.map((pred, index) => (
                            <li key={index}>
                                {pred.className} - {(pred.probability * 100).toFixed(2)}%
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ImageClassifier;
