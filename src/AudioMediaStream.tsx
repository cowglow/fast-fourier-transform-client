import OscilloscopeCanvas from "./OscilloscopeCanvas.tsx";
import {useEffect, useRef, useState} from "react";

export default function AudioMediaStream() {
    const audioCtxRef = useRef<AudioContext | null>(null);
    const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);

    useEffect(() => {
        const audioCtx = new AudioContext();
        audioCtxRef.current = audioCtx;

        navigator.mediaDevices.getUserMedia({audio: true}).then(stream => {
            const source = audioCtx.createMediaStreamSource(stream);

            const analyser = audioCtx.createAnalyser();
            analyser.fftSize = 2048;

            source.connect(analyser);
            setAnalyser(analyser);
            audioCtxRef.current?.resume();
        });



        return () => {
            audioCtxRef.current?.close();
        };
    }, []);

    return <OscilloscopeCanvas analyser={analyser}/>;
}
