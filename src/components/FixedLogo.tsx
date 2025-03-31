import Image from 'next/image';

const FixedLogo = () => {
  return (
    <div className="fixed top-28 left-8 z-40 pointer-events-none fixed-logo-watermark flex flex-col items-center">
      <Image 
        src="/logo.png" 
        alt="Sanghachadwam Logo" 
        width={100} 
        height={100}
        priority
        className="select-none mb-2"
      />
      <div className="text-center">
        <h3 className="text-base font-bold text-green-800 opacity-80">
          Sanghachadwam Foundation
        </h3>
        <div className="flex items-center justify-center space-x-1 opacity-80">
          <span className="text-green-600 text-sm font-medium">Agri</span>
          <span className="text-green-500 text-sm font-bold">+</span>
          <span className="text-amber-600 text-sm font-medium">
            Preneurship & Beyond
          </span>
        </div>
      </div>
    </div>
  );
};

export default FixedLogo;
