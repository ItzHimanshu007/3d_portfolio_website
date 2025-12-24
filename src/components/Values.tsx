import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import './Values.css';

const valuesData = [
    {
        title: 'INNOVATION',
        desc: 'Redefining the digital landscape through disruptive technologies.',
        badge: '01 / R&D'
    },
    {
        title: 'PRECISION',
        desc: 'Meticulous engineering meeting flawless aesthetic standards.',
        badge: '02 / DEV'
    },
    {
        title: 'PASSION',
        desc: 'Soul-infused code that creates deeper emotional connections.',
        badge: '03 / ART'
    },
    {
        title: 'FUTURE',
        desc: 'Architecting today for the challenges of tomorrow.',
        badge: '04 / EVO'
    }
];

const KineticChar: React.FC<{
    char: string;
    i: number;
    total: number;
    progress: MotionValue<number>;
}> = ({ char, i, total, progress }) => {
    const offset = (i - total / 2) * 15;
    // Characters assemble earlier and stay assembled longer
    const charX = useTransform(progress, [0, 0.3, 0.7, 1], [offset * 2.5, 0, 0, offset * -2.5]);
    const charZ = useTransform(progress, [0, 0.3, 0.7, 1], [-250, 0, 0, -250]);
    const charRotate = useTransform(progress, [0, 0.3, 0.7, 1], [offset * 1.5, 0, 0, -offset * 1.5]);
    const charOpacity = useTransform(progress, [0, 0.2, 0.3, 0.7, 0.8, 1], [0, 0.5, 1, 1, 0.5, 0]);

    return (
        <motion.span
            className="kinetic-char"
            style={{
                x: charX,
                z: charZ,
                rotateY: charRotate,
                opacity: charOpacity,
            }}
        >
            {char}
        </motion.span>
    );
};

const KineticTitle: React.FC<{ title: string; progress: MotionValue<number> }> = ({ title, progress }) => {
    return (
        <div className="kinetic-title-wrapper">
            {title.split('').map((char, i) => (
                <KineticChar
                    key={i}
                    char={char}
                    i={i}
                    total={title.length}
                    progress={progress}
                />
            ))}
        </div>
    );
};

const ValueBlock: React.FC<{ value: typeof valuesData[0] }> = ({ value }) => {
    const blockRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: blockRef,
        offset: ["start end", "end start"]
    });

    const descY = useTransform(scrollYProgress, [0.3, 0.4], [20, 0]); // Slide in as heading assembles
    const descOpacity = useTransform(scrollYProgress, [0.3, 0.4, 0.7, 0.8], [0, 1, 1, 0]); // Hold opacity
    const lineScale = useTransform(scrollYProgress, [0.3, 0.4], [0, 1]); // Grow line with text

    return (
        <div ref={blockRef} className="value-kinetic-block">
            <motion.div
                className="value-badge-kinetic"
                style={{ opacity: descOpacity }}
            >
                {value.badge}
            </motion.div>

            <KineticTitle title={value.title} progress={scrollYProgress} />

            <motion.div
                className="value-desc-kinetic"
                style={{ y: descY, opacity: descOpacity }}
            >
                <div className="desc-content">{value.desc}</div>
                <motion.div
                    className="desc-progress-line"
                    style={{ scaleX: lineScale }}
                />
            </motion.div>
        </div>
    );
};

export default function Values() {
    return (
        <section className="values-kinetic-section" id="philosophy">
            <div className="kinetic-background-grid"></div>
            <div className="outer-glow-vignette"></div>

            <div className="container">
                <div className="kinetic-stack">
                    {valuesData.map((v) => (
                        <ValueBlock key={v.title} value={v} />
                    ))}
                </div>
            </div>
        </section>
    );
}
