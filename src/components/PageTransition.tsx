import React, { useMemo } from 'react';
import { motion, type Variants } from 'framer-motion';

const containerVariants: Variants = {
    initial: {
        opacity: 0,
        scale: 0.98,
        filter: 'blur(10px)',
    },
    enter: {
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.4
        }
    },
    exit: {
        opacity: 0,
        scale: 1.02,
        filter: 'blur(10px)',
        transition: {
            duration: 0.4,
            ease: "easeInOut"
        }
    }
};

const pixelVariants: Variants = {
    initial: {
        opacity: 1,
        scale: 1
    },
    enter: (i: number) => ({
        opacity: 0,
        scale: 0,
        transition: {
            duration: 0.3,
            delay: 0.02 * (i % 10) + 0.01 * Math.floor(i / 10)
        }
    }),
    exit: (i: number) => ({
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.3,
            delay: 0.02 * (i % 10) + 0.01 * Math.floor(i / 10)
        }
    })
};

interface PageTransitionProps {
    children: React.ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
    // Determine grid size
    const cols = 10;
    const rows = 6;
    const totalPixels = cols * rows;

    // Shuffle indices for a more "random noise" feel or keep ordered for "wave"
    // Let's create a deterministic random pattern for a cool "data load" effect
    const shuffledIndices = useMemo(() => {
        return Array.from({ length: totalPixels }, (_, i) => i).sort(() => Math.random() - 0.5);
    }, [totalPixels]);

    return (
        <div style={{ position: 'relative', width: '100%', minHeight: '100vh' }}>
            {/* The Mosaic Overlay */}
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    display: 'flex',
                    flexWrap: 'wrap',
                    pointerEvents: 'none',
                    zIndex: 9999
                }}
            >
                {Array.from({ length: totalPixels }).map((_, i) => (
                    <motion.div
                        key={i}
                        variants={pixelVariants}
                        initial="initial"
                        animate="enter"
                        exit="exit"
                        custom={shuffledIndices[i]} // Use shuffled index for delay
                        style={{
                            width: `${100 / cols}%`,
                            height: `${100 / rows}%`,
                            background: '#0a0a0a',
                            border: '1px solid rgba(20, 20, 20, 0.5)',
                            boxSizing: 'border-box'
                        }}
                    />
                ))}
            </div>

            {/* Page Content */}
            <motion.div
                variants={containerVariants}
                initial="initial"
                animate="enter"
                exit="exit"
                style={{ width: '100%' }}
            >
                {children}
            </motion.div>
        </div>
    );
};

export default PageTransition;
