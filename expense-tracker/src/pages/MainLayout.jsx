import React, { useState, useRef } from 'react';
import '../styles/mainLayout.css';
import UserDashboard from './UserDashboard';
import bankingImage from '../assets/online-banking.png';

const MainLayout = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [cameraActive, setCameraActive] = useState(false);
    const [capturedImage, setCapturedImage] = useState(null);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    const toggleForm = () => {
        setIsLogin(!isLogin);
        stopCamera();
        setCapturedImage(null);
    };

    const startCamera = async () => {
        try {
            setCameraActive(true);
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            videoRef.current.srcObject = stream;
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        }
        catch (error) {
            console.error('Error accessing the camera:', error);
        }
    };

    const stopCamera = () => {
        if (videoRef.current && videoRef.currentsrcObject) {
            videoRef.current.srcObject.getTracks().forEach(track => track.stop());
        }
        setCameraActive(false);
    };

    const capturePhoto = () => {
        if (videoRef.current && canvasRef.current) {
            const context = canvasRef.current.getContext('2d');
            context.drawImage(videoRef.current, 0, 0, 320, 240);
            const imageData = canvasRef.current.toDataURL('image/png');
            setCapturedImage(imageData);
            stopCamera();
        }
    };

    return (
        <div className="main-container">
            <div className="left-section">
                <h1>Bienvenido a Expense-Traker</h1>
                <img src={bankingImage} alt="Online Banking Illustration" className="banking-image" />
            </div>

            <div className="right-section">
                <nav className="navbar">
                    <a href="#">Home</a>
                    <a href="#">About Us</a>
                    <a href="#">Service</a>
                    <a href="#">Contact</a>
                </nav>

                <div className="form-container">
                    <h2>{isLogin ? 'Inicia Sesión' : 'Crear Cuenta'}</h2>
                    <h3>Que tu cartera deje de llorar.</h3>

                    <form>
                        {!isLogin && (
                            <>
                                <input type="text" placeholder="Nombre" required />
                                <input type="text" placeholder="Apellido" required />
                                <input type="text" placeholder="Username" required />
                                <input type="email" placeholder="Email" required />
                                <input type="text" placeholder="Teléfono" required />
                                <input type="password" placeholder="Contraseña" required />
                                <input type="password" placeholder="Confirmar Contraseña" required />

                                {!cameraActive && (
                                    <button type="button" className="camera-button" onClick={startCamera}>
                                        Activar Cámara
                                    </button>
                                )}
                                <input type="file" accept="image/*" />

                            </>
                        )}
                        {isLogin && (
                            <>
                                <input type="text" placeholder="Username" required />
                                <input type="password" placeholder="Password" required />
                                {!cameraActive && (
                                    <button type="button" className="camera-button" onClick={startCamera}>
                                        Activar Cámara
                                    </button>
                                )}
                            </>
                        )}

                        {cameraActive && (
                            <div className="camera-section">
                                <video ref={videoRef} autoPlay width="320" height="240" />
                                <button type="button" onClick={capturePhoto}>Capturar Foto</button>
                            </div>
                        )}

                        {capturedImage && (
                            <div className="photo-preview">
                                <p>Foto capturada:</p>
                                <img src={capturedImage} alt="Foto capturada" width="160" />
                            </div>
                        )}

                        <canvas ref={canvasRef} width="320" height="240" style={{ display: 'none' }} />

                        <button type="submit" className="login-button">
                            {isLogin ? 'Login 🔒' : 'Register 📝'}
                        </button>
                    </form>

                    <p className="toggle-text">
                        {isLogin ? '¿No tienes una cuenta?' : '¿Ya tienes una cuenta?'}{' '}
                        <span onClick={toggleForm}>
                            {isLogin ? 'Registrate' : 'Inicia Sesión'}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MainLayout;
