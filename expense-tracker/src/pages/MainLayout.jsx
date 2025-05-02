import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/mainLayout.css';
import UserDashboard from './UserDashboard';
import bankingImage from '../assets/online-banking.png';
import { loginUser, registerUser } from '../services/api';

const MainLayout = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [cameraActive, setCameraActive] = useState(false);
    const [capturedImage, setCapturedImage] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [user, setUser] = useState(null);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const navigate = useNavigate();

    const refreshPage = () => {
        window.location.reload();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();


        const userData = {
            username: username,
            password: password,
            email: email,
            name: name,
            lastname: lastName,
            phone: phone,
        };
        console.log('User data:', userData);
        try {
            
            if (isLogin) {
                const response = await loginUser(userData);
                const responseData = response;
                const userData2 = {
                    user_id: responseData.id_user,
                }
                console.log('Response data:', responseData);
                if (response.message === "Login exitoso") {
                    console.log(responseData)
                    alert('Login successful!');
                    navigate('/dashboard', { state: { user:userData2 } });
                } else {
                    alert('Login failed. Please check your credentials.');
                }
            } else {
                if (password !== confirmPassword) {
                    alert('Las contraseñas no coinciden.');
                    return;
                } 
                const response = await registerUser(userData);
                if (response.message === "usuario registrado correctamente") {
                    setUser(response.data);
                    alert('Registration successful!');
                    refreshPage();
                } else {
                    alert('Registration failed. Please check your details.');
                }
            }
        } catch (error) {
            console.error('Error during form submission:', error);
            alert('An error occurred. Please try again later.');
        }
    };


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
        if (videoRef.current && videoRef.current.srcObject) {
            videoRef.current.srcObject.getTracks().forEach(track => track.stop());
            videoRef.current.srcObject = null;
        }
        setCameraActive(false);
    };


    const capturePhoto = () => {
        if (videoRef.current && canvasRef.current) {
            const context = canvasRef.current.getContext('2d');
            context.drawImage(videoRef.current, 0, 0, 320, 240);
            const imageData = canvasRef.current.toDataURL('image/png');
            setCapturedImage(imageData);

            setTimeout(() => {
                stopCamera();
            }, 100);
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
                                <input type="text" placeholder="Nombre" required onChange={(e) => setName(e.target.value)} />
                                <input type="text" placeholder="Apellido" required onChange={(e) => setLastName(e.target.value)} />
                                <input type="text" placeholder="Username" required onChange={(e) => setUsername(e.target.value)} />
                                <input type="email" placeholder="Email" required onChange={(e) => setEmail(e.target.value)} />
                                <input type="text" placeholder="Teléfono" required onChange={(e) => setPhone(e.target.value)} />
                                <input type="password" placeholder="Contraseña" required onChange={(e) => setPassword(e.target.value)} />
                                <input type="password" placeholder="Confirmar Contraseña" required onChange={(e) => setConfirmPassword(e.target.value)} />
                                <label>Foto del Usuario (Requerido): </label><br />
                                {!cameraActive && (
                                    <button type="button" className="camera-button" onClick={startCamera}>
                                        Activar Cámara
                                    </button>
                                )}
                            </>
                        )}
                        {isLogin && (
                            <>
                                <input type="text" placeholder="Username" required onChange={(e) => setUsername(e.target.value)} />
                                <input type="password" placeholder="Contraseña" required onChange={(e) => setPassword(e.target.value)} />
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
                                <button type="button" onClick={stopCamera}>Detener Cámara</button>
                            </div>
                        )}

                        {capturedImage && (
                            <div className="photo-preview">
                                <p>Foto capturada:</p>
                                <img src={capturedImage} alt="Foto capturada" width="160" />
                            </div>
                        )}

                        <canvas ref={canvasRef} width="320" height="240" style={{ display: 'none' }} />

                        <button type="submit" className="login-button" onClick={handleSubmit}>
                            {isLogin ? 'Login 🔒' : 'Registrar 📝'}
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
