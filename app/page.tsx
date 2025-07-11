'use client';
import { useState } from 'react';
import { MiniKit, VerificationLevel, ISuccessResult } from '@worldcoin/minikit-js';

export default function Home() {
  const [status, setStatus] = useState('Esperando verificación...');

  const verifyPayload = {
    action: 'voting-action', // Reemplaza con tu Action ID real
    signal: '0x12312',
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
      setStatus(result.status === 200 ? '✅ Verificación exitosa' : '❌ Verificación fallida');

    } catch (err) {
      console.error(err);
      setStatus('Ocurrió un error en la verificación.');
    }
  };

  return (
    <main>
      <h1>MiniApp Moneda Digital</h1>
      <p>{status}</p>
      <button onClick={handleVerify}>Verificar con World ID</button>
    </main>
  );
}