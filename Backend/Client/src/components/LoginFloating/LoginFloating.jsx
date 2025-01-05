import React from 'react';

const LoginFloat = () => {
  const handleGoogleLogin = () => {
    window.location.href = 'http://belga.com.ar:6080/api/sessions/google/web';
  };

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      backgroundColor: 'white',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      borderRadius: '8px',
      padding: '10px',
      zIndex: 9999,
    }}>
      <p>Inicia sesión con Google</p>
      <button onClick={handleGoogleLogin}>Login con Google</button>
    </div>
  );
};

export default LoginFloat;
