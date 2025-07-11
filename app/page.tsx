'use client';
import { useState } from 'react';
import { MiniKit, VerificationLevel, ISuccessResult } from '@worldcoin/minikit-js';

export default function Home() {
  const [status, setStatus] = useState('Esperando verificación...');

  const verifyPayload = {
    action: 'voting-action', // REEMPLAZAR por tu Action ID
    signal: '0x12312', // Opcional
    verification_level: VerificationLevel.Orb,
  };

  const handleVerify = async () => {
    if (!MiniKit.isInstalled()) {
      setStatus('Abre esta MiniApp desde World App para verificar.');
      return;
    }

    try {
      const { finalPayload } = await MiniKit.commandsAsync.verify(verifyPayload);

      if (finalPayload.status === 'error') {
        setStatus('Verificación cancelada o fallida.');
        return;
      }

      const response = await fetch('/api/verificar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          payload: finalPayload,
          action: verifyPayload.action,
          signal: verifyPayload.signal,
        }),
      });

      const result = await response.json();
      if (result.status === 200) {
        setStatus('✅ Verificación exitosa');
      } else {
        setStatus('❌ Verificación fallida');
      }

    } catch (err) {
      console.error(err);
      setStatus('Ocurrió un error en la verificación.');
    }
  };

  return (
    <main>
      <h1>MiniApp World ID</h1>
      <p>{status}</p>
      <button onClick={handleVerify}>Verificar con World ID</button>
    </main>
  );
}