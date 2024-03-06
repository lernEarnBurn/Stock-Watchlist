import './global.css'

export default function RootLayout({children}) {
  return (
    <html lang="en">
      <body>
        <div className="bg-black w-full h-[10vh]"></div>
        <main>{children}</main>
      </body>
    </html>
  )
}