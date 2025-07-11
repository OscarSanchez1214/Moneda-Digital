'use client';
import { useEffect, useState } from 'react';
import { MiniKit, VerificationLevel, ISuccessResult } from '@worldcoin/minikit-js';

export default function Home() {
  const [status, setStatus] = useState('Esperando verificación...');
  const [kitStatus, setKitStatus] = useState('Verificando si MiniKit está disponible...');

  useEffect(() => {
    const checkKit = () => {
      const installed = MiniKit.isInstalled();
      setKitStatus(installed ? '✅ MiniKit está instalado' : '❌ MiniKit NO está instalado');
    };
    checkKit();
  }, []);

  const verifyPayload = {
    action: 'voting-action',
    signal: '0x12312',
    verification_level: VerificationLevel.Orb,
  };

  const handleVerify = async () => {
    if (!MiniKit.isInstalled()) {
      setStatus('❌ MiniKit NO está instalado. Abre esta MiniApp desde World App.');
      return;
    }

    try {
      const { finalPayload } = await MiniKit.commandsAsync.verify(verifyPayload);
      if (finalPayload.status === 'error') {
        setStatus('❌ Verificación cancelada o fallida.');
        return;
      }

      const response = await fetch('/api/verify', {
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
      setStatus('❌ Error en la verificación.');
    }
  };

  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>MiniApp Moneda Digital</h1>
      <p><strong>Estado de MiniKit:</strong> {kitStatus}</p>
      <p><strong>Estado de verificación:</strong> {status}</p>
      <button onClick={handleVerify}>Verificar con World ID</button>
    </main>
  );
}
