import { useEffect, useRef } from "react";

interface Props {
    analyser: AnalyserNode | null;
}

export default function OscilloscopeCanvas({ analyser }: Props) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const rafRef = useRef<number | null>(null);

    useEffect(() => {
        if (!analyser) return;

        const canvas = canvasRef.current!;
        const ctx = canvas.getContext("2d")!;
        const buffer = new Float32Array(analyser.fftSize);

        const WIDTH = canvas.width;
        const HEIGHT = canvas.height;

        const draw = () => {
            analyser.getFloatTimeDomainData(buffer);

            // const rms = buffer.reduce((a, v) => a + v * v, 0) / buffer.length;
            // console.log("RMS:", rms);

            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, WIDTH, HEIGHT);

            ctx.lineWidth = 2;
            ctx.strokeStyle = "lime";
            ctx.beginPath();

            const sliceWidth = WIDTH / buffer.length;
            buffer.forEach((v, i) => {
                const x = i * sliceWidth;
                const y = (1 - (v + 1) / 2) * HEIGHT;

                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
            });

            ctx.stroke();
            rafRef.current = requestAnimationFrame(draw);
        };


        draw();

        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [analyser]);

    return (
        <canvas
            ref={canvasRef}
            width={800}
            height={200}
            style={{
                width: "100%",
                height: "200px",
                background: "black",
                display: "block",
            }}
        />
    );
}
