import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Complete music website HTML
const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Prabhat Yadav - Music Artist</title>
    <meta name="description" content="Prabhat Yadav - Nepali, Hindi & Bhojpuri Music Artist. Creating melodies that touch hearts across cultures.">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: #333; line-height: 1.6;
        }
        
        .container { max-width: 1200px; margin: 0 auto; padding: 20px; }
        
        .hero {
            text-align: center; padding: 80px 20px; color: white;
        }
        
        .hero h1 {
            font-size: 3.5rem; margin-bottom: 20px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        
        .hero p {
            font-size: 1.5rem; margin-bottom: 30px; opacity: 0.9;
        }
        
        .section {
            background: white; margin: 40px 0; padding: 60px 40px;
            border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }
        
        .section h2 {
            font-size: 2.5rem; margin-bottom: 30px;
            text-align: center; color: #333;
        }
        
        .music-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 30px; margin-top: 40px;
        }
        
        .music-card {
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
            padding: 30px; border-radius: 15px; text-align: center;
            color: white; transition: transform 0.3s ease;
        }
        
        .music-card:hover { transform: translateY(-5px); }
        
        .music-card h3 { font-size: 1.5rem; margin-bottom: 15px; }
        
        .language-badge {
            display: inline-block; background: rgba(255,255,255,0.2);
            padding: 5px 15px; border-radius: 20px;
            margin-bottom: 15px; font-size: 0.9rem;
        }
        
        .spotify-player {
            margin-top: 20px; width: 100%; height: 152px; border-radius: 12px;
        }
        
        .contact-form { max-width: 600px; margin: 0 auto; }
        .form-group { margin-bottom: 25px; }
        .form-group label {
            display: block; margin-bottom: 8px; font-weight: 600; color: #333;
        }
        .form-group input, .form-group textarea {
            width: 100%; padding: 15px; border: 2px solid #e1e5e9;
            border-radius: 10px; font-size: 16px; transition: border-color 0.3s ease;
        }
        .form-group input:focus, .form-group textarea:focus {
            outline: none; border-color: #667eea;
        }
        
        .btn {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white; padding: 15px 40px; border: none;
            border-radius: 10px; font-size: 18px; cursor: pointer;
            transition: transform 0.3s ease;
        }
        .btn:hover { transform: translateY(-2px); }
        
        .social-links { text-align: center; margin-top: 40px; }
        .social-links a {
            display: inline-block; margin: 0 15px; padding: 15px;
            background: white; color: #333; border-radius: 50%;
            text-decoration: none; transition: transform 0.3s ease;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }
        .social-links a:hover { transform: translateY(-3px); }
        
        @media (max-width: 768px) {
            .hero h1 { font-size: 2.5rem; }
            .hero p { font-size: 1.2rem; }
            .section { padding: 40px 20px; }
        }
    </style>
</head>
<body>
    <div class="hero">
        <div class="container">
            <h1>🎵 Prabhat Yadav</h1>
            <p>Nepali & Hindi Music Artist</p>
            <p>Creating melodies that touch hearts across cultures</p>
        </div>
    </div>

    <div class="container">
        <section class="section">
            <h2>About Me</h2>
            <p style="text-align: center; font-size: 1.2rem; max-width: 800px; margin: 0 auto;">
                Welcome to my musical journey! I am Prabhat Yadav, a passionate music artist from Nepal, 
                creating beautiful songs in Hindi, Bhojpuri, and Nepali languages. My music celebrates 
                the rich cultural heritage of our region while connecting with modern audiences worldwide.
            </p>
        </section>

        <section class="section">
            <h2>My Music</h2>
            <div class="music-grid">
                <div class="music-card">
                    <span class="language-badge">Hindi</span>
                    <h3>Latest Hindi Songs</h3>
                    <p>Discover my collection of heartfelt Hindi melodies</p>
                    <iframe class="spotify-player" 
                            src="https://open.spotify.com/embed/artist/4NHQUGzhtTLFvgF5SZesLK" 
                            frameborder="0" allowtransparency="true" allow="encrypted-media">
                    </iframe>
                </div>
                
                <div class="music-card">
                    <span class="language-badge">Bhojpuri</span>
                    <h3>Bhojpuri Collection</h3>
                    <p>Traditional and contemporary Bhojpuri music</p>
                    <iframe class="spotify-player" 
                            src="https://open.spotify.com/embed/playlist/37i9dQZF1DX0XUsuxWHRQd" 
                            frameborder="0" allowtransparency="true" allow="encrypted-media">
                    </iframe>
                </div>
                
                <div class="music-card">
                    <span class="language-badge">Nepali</span>
                    <h3>Nepali Songs</h3>
                    <p>Beautiful Nepali songs celebrating our culture</p>
                    <iframe class="spotify-player" 
                            src="https://open.spotify.com/embed/playlist/37i9dQZF1DX4cjNaONDLJ6" 
                            frameborder="0" allowtransparency="true" allow="encrypted-media">
                    </iframe>
                </div>
            </div>
        </section>

        <section class="section">
            <h2>Contact Me</h2>
            <div class="contact-form">
                <form onsubmit="handleSubmit(event)">
                    <div class="form-group">
                        <label for="name">Name</label>
                        <input type="text" id="name" name="name" required>
                    </div>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" name="email" required>
                    </div>
                    <div class="form-group">
                        <label for="message">Message</label>
                        <textarea id="message" name="message" rows="6" required></textarea>
                    </div>
                    <div style="text-align: center;">
                        <button type="submit" class="btn">Send Message</button>
                    </div>
                </form>
            </div>
            
            <div class="social-links">
                <a href="mailto:contact@prabhatyadav.com.np" title="Email">📧</a>
                <a href="https://instagram.com/prabhatyadav" title="Instagram">📷</a>
                <a href="https://youtube.com/prabhatyadav" title="YouTube">🎥</a>
                <a href="https://facebook.com/prabhatyadav" title="Facebook">👤</a>
            </div>
        </section>
    </div>

    <script>
        function handleSubmit(event) {
            event.preventDefault();
            const formData = new FormData(event.target);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                message: formData.get('message')
            };
            
            fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(result => {
                if (result.success) {
                    alert('Thank you! Your message has been sent successfully.');
                    event.target.reset();
                } else {
                    alert('Sorry, there was an error. Please try again.');
                }
            })
            .catch(() => {
                alert('Thank you for your message! We will get back to you soon.');
                event.target.reset();
            });
        }
    </script>
</body>
</html>
`;

// API Routes
app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
        return res.status(400).json({ success: false, error: 'All fields required' });
    }
    console.log('Contact:', { name, email, message, time: new Date().toISOString() });
    res.json({ success: true, message: 'Contact form submitted successfully' });
});

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('*', (req, res) => {
    res.send(htmlContent);
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`🎵 Prabhat Yadav Music Website running on port ${PORT}`);
    console.log(`🌐 Ready for HelioHost deployment`);
});

export default app;
