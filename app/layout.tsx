export const metadata = {
  title: 'Moneda Digital',
  description: 'MiniApp con World ID',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
