import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './IronManPreloader.css';

const IronManPreloader = ({ onComplete }: { onComplete: () => void }) => {
    const [progress, setProgress] = useState(0);
    const [statusIndex, setStatusIndex] = useState(0);
    const [isComplete, setIsComplete] = useState(false);
    const [latency, setLatency] = useState("0.00");
    const [coords, setCoords] = useState({ x: 0, y: 0, z: 0 });

    const statusMessages = useMemo(() => [
        "BOOTING_MARK_85_OS...",
        "INITIALIZING_NEURAL_UPLINK...",
        "POWERING_ARC_REACTOR_CORE...",
        "STABILIZING_THERMAL_LEVELS...",
        "CALIBRATING_HUD_INTERFACE...",
        "DIVERSION_FOR_AUXILIARY_POWER...",
        "SCANNING_LOCAL_ENVIRONMENT...",
        "SYSTEMS_READY_SIR"
    ], []);

    // Generate static random hex data for background
    const hexGrid = useMemo(() => Array.from({ length: 48 }, (_, i) => i), []);

    useEffect(() => {
        const duration = 1200;
        const start = performance.now();
        let frame = 0;
        let doneTimer: ReturnType<typeof setTimeout> | undefined;
        let finished = false;

        const finish = () => {
            if (finished) return;
            finished = true;
            cancelAnimationFrame(frame);
            setProgress(100);
            setIsComplete(true);
            doneTimer = setTimeout(onComplete, 300);
        };

        const update = () => {
            const p = Math.min((performance.now() - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 4);
            setProgress(Math.round(eased * 100));
            setCoords({
                x: Math.floor(Math.random() * 9999),
                y: Math.floor(Math.random() * 9999),
                z: Math.floor(Math.random() * 999)
            });
            setLatency((Math.random() * 10).toFixed(2));
            setStatusIndex(Math.floor(eased * (statusMessages.length - 1)));

            if (p < 1) {
                frame = requestAnimationFrame(update);
            } else {
                finish();
            }
        };

        frame = requestAnimationFrame(update);

        // Any click, tap or key press skips the intro
        window.addEventListener('pointerdown', finish);
        window.addEventListener('keydown', finish);

        return () => {
            cancelAnimationFrame(frame);
            clearTimeout(doneTimer);
            window.removeEventListener('pointerdown', finish);
            window.removeEventListener('keydown', finish);
        };
    }, [onComplete, statusMessages]);

    return (
        <AnimatePresence>
            {!isComplete && (
                <motion.div
                    className="ironman-preloader"
                    role="status"
                    aria-label="Loading portfolio"
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                    {/* Background Hex Grid */}
                    <div className="hex-background">
                        {hexGrid.map(i => (
                            <motion.div
                                key={i}
                                className="hex-cell"
                                animate={{ opacity: [0.05, 0.15, 0.05] }}
                                transition={{ repeat: Infinity, duration: 3, delay: i * 0.1 }}
                            />
                        ))}
                    </div>

                    <div className="hud-advanced-container">
                        {/* Corner Data Streams */}
                        <div className="data-stream top-left-stream">
                            <div className="stream-label">SYS_LATENCY</div>
                            <div className="stream-value">{latency}ms</div>
                            <div className="stream-label">CORE_TEMP</div>
                            <div className="stream-value">42.5°C</div>
                        </div>

                        <div className="data-stream top-right-stream">
                            <div className="stream-label">X_COORD: {coords.x}</div>
                            <div className="stream-label">Y_COORD: {coords.y}</div>
                            <div className="stream-label">Z_COORD: {coords.z}</div>
                        </div>

                        {/* Central Arc Reactor Complex */}
                        <div className="arc-reactor-complex">
                            <motion.div
                                className="reactor-pulse-field"
                                animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.3, 0.1] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                            />

                            {/* Mechanical Rotating Rings */}
                            <motion.div className="ring core-ring" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 4, ease: "linear" }} />
                            <motion.div className="ring mid-ring-1" animate={{ rotate: -360 }} transition={{ repeat: Infinity, duration: 8, ease: "linear" }} />
                            <motion.div className="ring mid-ring-2" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 12, ease: "linear" }} />
                            <motion.div className="ring outer-ring-segmented" animate={{ rotate: -360 }} transition={{ repeat: Infinity, duration: 20, ease: "linear" }}>
                                {[...Array(8)].map((_, i) => (
                                    <div key={i} className="segment" style={{ transform: `rotate(${i * 45}deg)` }} />
                                ))}
                            </motion.div>

                            <div className="reactor-center">
                                <motion.div
                                    className="inner-glow"
                                    animate={{ opacity: [0.7, 1, 0.7], scale: [1, 1.2, 1] }}
                                    transition={{ repeat: Infinity, duration: 1.5 }}
                                />
                            </div>

                            {/* Circular Scan HUD */}
                            <svg className="hud-svg-overlay" viewBox="0 0 200 200">
                                <motion.circle
                                    cx="100" cy="100" r="95"
                                    className="progress-circle"
                                    strokeDasharray="597"
                                    animate={{ strokeDashoffset: 597 - (597 * progress / 100) }}
                                />
                            </svg>
                        </div>

                        {/* Status Panel */}
                        <div className="status-panel">
                            <div className="loading-title">ANALYZING_SYSTEM_INTEGRITY</div>
                            <div className="loading-progress">
                                <span className="value">{progress}</span>
                                <span className="unit">%</span>
                            </div>
                            <div className="preloader-skip-hint">Click or press any key to skip</div>
                            <motion.div
                                key={statusIndex}
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="jarvis-console"
                            >
                                {">"} {statusMessages[statusIndex]}
                            </motion.div>
                        </div>

                        {/* Horizontal Scanning Bars */}
                        <div className="scanning-bars">
                            {[...Array(3)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="scan-bar"
                                    animate={{ y: ['-100%', '300%'] }}
                                    transition={{ repeat: Infinity, duration: 4, delay: i * 1.5, ease: "linear" }}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="hud-vignette" />
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default IronManPreloader;
