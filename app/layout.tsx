// app/layout.tsx
export const metadata = {
  title: 'MiniApp Moneda Digital',
  description: 'Verificación con World ID',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
