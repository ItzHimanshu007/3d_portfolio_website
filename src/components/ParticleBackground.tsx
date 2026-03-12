import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import './ParticleBackground.css';

const ParticleBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        // Respect reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Reduce particle count on mobile/low-end devices
        const isMobile = window.innerWidth < 768;
        const coreCount = navigator.hardwareConcurrency || 4;
        const particleCount = isMobile ? 20 : coreCount < 4 ? 25 : 50;
        const connectionDistance = isMobile ? 80 : 120;

        const particles: Array<{
            x: number;
            y: number;
            size: number;
            speedX: number;
            speedY: number;
            opacity: number;
            cellX: number;
            cellY: number;
        }> = [];

        // Spatial grid for O(n) connection checks instead of O(n²)
        const cellSize = connectionDistance;
        let grid: Map<string, number[]> = new Map();

        const getCellKey = (col: number, row: number) => `${col},${row}`;

        const updateGrid = () => {
            grid.clear();
            particles.forEach((particle, index) => {
                const col = Math.floor(particle.x / cellSize);
                const row = Math.floor(particle.y / cellSize);
                particle.cellX = col;
                particle.cellY = row;
                const key = getCellKey(col, row);
                const cell = grid.get(key);
                if (cell) {
                    cell.push(index);
                } else {
                    grid.set(key, [index]);
                }
            });
        };

        // Create particles
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 3 + 1,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                opacity: Math.random() * 0.5 + 0.2,
                cellX: 0,
                cellY: 0,
            });
        }

        let animationFrameId: number;

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Update positions
            particles.forEach((particle) => {
                particle.x += particle.speedX;
                particle.y += particle.speedY;

                if (particle.x < 0) particle.x = canvas.width;
                if (particle.x > canvas.width) particle.x = 0;
                if (particle.y < 0) particle.y = canvas.height;
                if (particle.y > canvas.height) particle.y = 0;
            });

            // Rebuild spatial grid
            updateGrid();

            // Draw particles and connections using spatial grid
            particles.forEach((particle, index) => {
                // Draw particle
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 51, 51, ${particle.opacity})`;
                ctx.fill();

                // Only check neighboring cells (9 cells total instead of all particles)
                for (let dx = -1; dx <= 1; dx++) {
                    for (let dy = -1; dy <= 1; dy++) {
                        const neighborKey = getCellKey(particle.cellX + dx, particle.cellY + dy);
                        const neighbors = grid.get(neighborKey);
                        if (!neighbors) continue;

                        for (const otherIndex of neighbors) {
                            if (otherIndex <= index) continue; // Avoid duplicate connections

                            const other = particles[otherIndex];
                            const distX = particle.x - other.x;
                            const distY = particle.y - other.y;
                            const distance = Math.sqrt(distX * distX + distY * distY);

                            if (distance < connectionDistance) {
                                ctx.beginPath();
                                ctx.strokeStyle = `rgba(204, 0, 0, ${0.2 * (1 - distance / connectionDistance)})`;
                                ctx.lineWidth = 0.5;
                                ctx.moveTo(particle.x, particle.y);
                                ctx.lineTo(other.x, other.y);
                                ctx.stroke();
                            }
                        }
                    }
                }
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        // Debounced resize handler
        let resizeTimeout: ReturnType<typeof setTimeout>;
        const handleResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }, 250);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(animationFrameId);
            clearTimeout(resizeTimeout);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <motion.canvas
            ref={canvasRef}
            className="particle-background"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            aria-hidden="true"
        />
    );
};

export default ParticleBackground;
