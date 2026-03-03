export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="container-custom">
        <h1 className="text-6xl font-bold mb-4">QuickHire</h1>
        <h2 className="text-4xl font-semibold mb-4">Clash Display Heading</h2>
        <p className="text-xl mb-4">
          This is Epilogue font for body text. It should look clean and modern.
        </p>
        
        <div className="flex gap-4 mt-8 flex-wrap">
          <div className="w-24 h-24 rounded flex items-center justify-center text-white font-bold" style={{backgroundColor: '#4640DE'}}>
            Primary
          </div>
          <div className="w-24 h-24 rounded flex items-center justify-center text-white font-bold" style={{backgroundColor: '#25324B'}}>
            Heading
          </div>
          <div className="w-24 h-24 rounded flex items-center justify-center text-white font-bold" style={{backgroundColor: '#515B6F'}}>
            Body
          </div>
          <div className="w-24 h-24 rounded flex items-center justify-center font-bold border-2" style={{backgroundColor: '#F8F8FD', color: '#25324B'}}>
            BG 2
          </div>
        </div>

        <div className="mt-8 space-y-2">
          <p className="font-normal">Font weight 400 (Regular)</p>
          <p className="font-medium">Font weight 500 (Medium)</p>
          <p className="font-semibold">Font weight 600 (Semibold)</p>
          <p className="font-bold">Font weight 700 (Bold)</p>
        </div>
      </div>
    </main>
  );
}