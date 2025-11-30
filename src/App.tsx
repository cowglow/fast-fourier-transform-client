import './App.css'
import AudioMediaStream from "./AudioMediaStream.tsx";

export default function App() {

    return (
        <div>
            <h1>WS FFT SOCKETS</h1>
            <div className="card">
                <AudioMediaStream/>
            </div>
            <p className="read-the-docs">
                GitHub Repo: Link Coming Soon
            </p>
        </div>
    )
}