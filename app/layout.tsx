import './globals.css';

export const metadata = {
  title: 'Dribble Clone',
  description: 'From a JSMastery YouTube course',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        Navbar
          <main>
            {children}
          </main>
        Footer
      </body>
    </html>
  )
}
