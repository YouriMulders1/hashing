import { useState } from 'react';

export default function Login() {
    // State hooks voor e-mail, wachtwoord en bericht
    const [email, setEmail] = useState(''); // Houdt de e-mailwaarde bij
    const [password, setPassword] = useState(''); // Houdt de wachtwoordwaarde bij
    const [message, setMessage] = useState(''); // Houdt berichten bij (succes/fout)

    // Functie die wordt aangeroepen bij het inloggen
    const handleLogin = async () => {
        // Stuur een POST-verzoek naar de backend API
        const res = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }), // Verstuur e-mail en wachtwoord als JSON
        });

        // Verkrijg het antwoord van de backend
        const data = await res.json();

        // Zet het bericht op basis van de serverrespons (succes of fout)
        setMessage(data.message || data.error);
    };

    return (
        <div>
            <h1>Login</h1>
            {/* E-mail invoerveld */}
            <input
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Werk de e-mailstate bij
            />
            {/* Wachtwoord invoerveld */}
            <input
                type="password"
                placeholder="Wachtwoord"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Werk de wachtwoordstate bij
            />
            
            {/* Inlogknop die de handleLogin functie aanroept */}
            <button onClick={handleLogin}>Inloggen</button>
            
            {/* Toon het bericht als het aanwezig is */}
            {message && <p>{message}</p>}
        </div>
    );
}