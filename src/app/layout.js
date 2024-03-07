import './global.css'
import { TrendingUp } from 'lucide-react';

export default function RootLayout({children}) {
  return (
    <html lang="en">
      <body>
        <div className="bg-black w-full h-[15vh] flex items-center justify-center gap-14">
          {[1, 2, 3, 4].map((num) => (
            <TrendingUp key={num} className="text-white h-20 w-20"/>
          ))}
          <h1 className="text-white text-6xl font-semibold">Watchlists</h1>
          {[1, 2, 3, 4].map((num) => (
            <TrendingUp key={num} className="text-white h-20 w-20"/>
          ))}
        </div>
        <main>{children}</main>
      </body>
    </html>
  )
}