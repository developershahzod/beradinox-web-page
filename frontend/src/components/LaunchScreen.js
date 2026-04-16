import React, { useState, useEffect } from 'react';

const LaunchScreen = ({ onDone }) => {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    // Start exit animation at 2.2s, call onDone after it finishes
    const exitTimer = setTimeout(() => setExiting(true), 2200);
    const doneTimer = setTimeout(() => onDone(), 2800);
    return () => { clearTimeout(exitTimer); clearTimeout(doneTimer); };
  }, [onDone]);

  return (
    <div
      className={exiting ? 'launch-exit' : ''}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#0f172a',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Background grid pattern */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
        `,
        backgroundSize: '48px 48px',
      }} />

      {/* Radial glow center */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Animated corner lines */}
      <div style={{ position: 'absolute', top: '48px', left: '48px', width: '40px', height: '40px',
        borderTop: '2px solid rgba(255,255,255,0.15)', borderLeft: '2px solid rgba(255,255,255,0.15)' }} />
      <div style={{ position: 'absolute', top: '48px', right: '48px', width: '40px', height: '40px',
        borderTop: '2px solid rgba(255,255,255,0.15)', borderRight: '2px solid rgba(255,255,255,0.15)' }} />
      <div style={{ position: 'absolute', bottom: '48px', left: '48px', width: '40px', height: '40px',
        borderBottom: '2px solid rgba(255,255,255,0.15)', borderLeft: '2px solid rgba(255,255,255,0.15)' }} />
      <div style={{ position: 'absolute', bottom: '48px', right: '48px', width: '40px', height: '40px',
        borderBottom: '2px solid rgba(255,255,255,0.15)', borderRight: '2px solid rgba(255,255,255,0.15)' }} />

      {/* Main content */}
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>

        {/* Logo container with ring */}
        <div className="launch-logo" style={{ position: 'relative' }}>
          {/* Outer ring */}
          <div style={{
            position: 'absolute',
            inset: '-20px',
            borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.08)',
            animation: 'spin 8s linear infinite',
          }} />
          {/* Inner ring */}
          <div style={{
            position: 'absolute',
            inset: '-10px',
            borderRadius: '50%',
            border: '1px dashed rgba(255,255,255,0.12)',
            animation: 'spin 4s linear infinite reverse',
          }} />

          {/* Logo */}
          <div style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(10px)',
          }}>
            <img
              src="/logo-beradinox.png"
              alt="Beradinox"
              style={{ width: '70px', height: '70px', objectFit: 'contain', filter: 'brightness(0) invert(1)' }}
            />
          </div>
        </div>

        {/* Brand name */}
        <div className="launch-text" style={{ textAlign: 'center' }}>
          <p style={{
            fontSize: '26px',
            fontWeight: '800',
            color: '#ffffff',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: '6px',
            fontFamily: 'Inter, sans-serif',
          }}>
            BERADINOX
          </p>
          <p style={{
            fontSize: '11px',
            color: 'rgba(255,255,255,0.4)',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            fontFamily: 'Inter, sans-serif',
          }}>
            Терминал металлопродукции №1
          </p>
        </div>

        {/* Progress bar */}
        <div style={{ width: '160px', height: '2px', background: 'rgba(255,255,255,0.08)', borderRadius: '2px', overflow: 'hidden', marginTop: '8px' }}>
          <div className="launch-bar" style={{
            height: '100%',
            background: 'linear-gradient(90deg, rgba(255,255,255,0.3), rgba(255,255,255,0.9), rgba(255,255,255,0.3))',
            transformOrigin: 'left center',
            borderRadius: '2px',
          }} />
        </div>

        {/* Dots */}
        <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
          {[0, 1, 2].map(i => (
            <div key={i} style={{
              width: '3px',
              height: '14px',
              borderRadius: '2px',
              background: 'rgba(255,255,255,0.5)',
              animation: `dot-bounce 1.2s ease-in-out ${i * 0.15}s infinite`,
            }} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default LaunchScreen;
