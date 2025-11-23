import Button from '@/components/ui/Button';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center">
      <h1 className="text-4xl font-bold text-fami-blue mb-6">FAMI Web</h1>
      <div className="w-full max-w-4xl h-64 bg-white rounded-lg shadow-lg flex items-center justify-center border-2 border-dashed border-fami-cyan mb-8">
        <span className="text-fami-cyan font-medium">Hero Carousel Placeholder</span>
      </div>
      <div className="flex gap-4">
        <Button variant="primary">Agendar Cita</Button>
        <Button variant="outline">Conocer Más</Button>
      </div>
    </div>
  );
}
