import React, { useState, useEffect } from 'react';
import { X, Check, AlertCircle, Loader } from 'lucide-react';

const PopupHeader = ({ onClose }) => (
  <div className="flex justify-between items-center p-2 bg-gray-800 bg-opacity-40">
    <h2 className="text-base font-bold tracking-tight">Heavy Waste Types</h2>
    <button 
      onClick={onClose}
      className="text-gray-400 hover:text-white transition-all duration-300 transform hover:rotate-90"
      aria-label="Close"
    >
      <X size={18} />
    </button>
  </div>
);


const WarningBanner = () => (
  <div className="bg-gradient-to-r from-amber-900 to-amber-950 bg-opacity-30 border-l-4 border-amber-500 p-1 mx-3 mb-2 rounded-r-md shadow-sm">
    <p className="font-bold text-amber-300 text-xs">Important Notice</p>
    <p className="text-xs text-amber-100/90">
      Heavy waste types have specific requirements and restrictions. Some skip sizes may not be available for heavy waste disposal.
    </p>
  </div>
);

const SectionHeader = ({ title }) => (
  <h3 className="font-semibold text-blue-200 mb-1 text-xs flex items-center">
    <span className="w-1 h-3 bg-blue-500 rounded mr-2 inline-block"></span>
    {title}
  </h3>
);

const WasteTypeSelector = ({ selectedWasteTypes, toggleWasteType }) => {
  const heavyWasteTypes = [
    'Soil',
    'Concrete',
    'Bricks',
    'Tiles',
    'Sand',
    'Gravel',
    'Rubble'
  ];

  return (
    <div className="pb-2">
      <SectionHeader title="Select heavy waste types:" />
      <div className="flex flex-wrap gap-1 mb-2">
        {heavyWasteTypes.map((wasteType) => (
          <button
            key={wasteType}
            onClick={() => toggleWasteType(wasteType)}
            className={`px-2 py-0.5 rounded text-xs font-medium transition-all duration-300 ${
              selectedWasteTypes.includes(wasteType)
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-sm'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
            }`}
          >
            {selectedWasteTypes.includes(wasteType) && (
              <Check size={8} className="inline-block mr-1" />
            )}
            {wasteType}
          </button>
        ))}
      </div>
    </div>
  );
};

const percentageOptions = [
  { id: 'none', label: 'No heavy waste', description: 'No heavy waste in your skip', image: null },
  { id: 'low', label: 'Up to 5%', description: 'A small amount of heavy waste' , image: "/src/assets/heavywaste-up-to-5.png" },
  { id: 'medium', label: '5-20%', description: 'A moderate amount of heavy waste', image: "/src/assets/heavywaste-5-to-20.png" },
  { id: 'high', label: 'Over 20%', description: 'A large amount of heavy waste', image:  "/src/assets/heavywaste-over20.png"}
];

const PercentageSelector = ({ selectedWasteTypes, selectedPercentage, selectPercentage }) => {
 
  return (
    <div className="pb-2">
      <SectionHeader title="Approximate percentage of heavy waste:" />
      <div className="flex flex-wrap gap-1 mb-1">
        {percentageOptions.map((option) => {
          const isDisabled = option.id !== 'none' && selectedWasteTypes.length === 0;
          return (
            <button
              key={option.id}
              onClick={() => selectPercentage(option.id)}
              disabled={isDisabled}
              className={`px-2 py-0.5 rounded text-xs font-medium transition-all duration-300 ${
                selectedPercentage === option.id
                  ? 'bg-gradient-to-r from-teal-600 to-blue-700 text-white shadow-sm'
                  : isDisabled
                    ? 'bg-gray-800/40 text-gray-500 cursor-not-allowed border border-gray-700/50'
                    : 'bg-gray-800/70 text-gray-300 hover:bg-gray-700 border border-gray-700'
              }`}
            >
              {selectedPercentage === option.id && (
                <div className="w-1.5 h-1.5 bg-white rounded-full inline-block mr-1"></div>
              )}
              {option.label}
            </button>
          );
        })}
      </div>
      
      {selectedPercentage && (
        <p className="text-xs italic text-blue-200/80 mt-1 mb-2">
          {percentageOptions.find(option => option.id === selectedPercentage)?.description}
        </p>
      )}
    </div>
  );
};

const SkipSizeSelector = ({ isLoading, error, availableSkips, selectedSkip, selectSkip, showSkipSizes }) => {

  if (!showSkipSizes) {
    return null; 
  }

  return (
    <div className="pb-2">
      <SectionHeader title="Available skip sizes:" />
      
      {isLoading ? (
        <div className="flex justify-center items-center py-2">
          <Loader size={16} className="text-blue-400 animate-spin mr-1" />
          <span className="text-xs text-gray-300">Loading skip options...</span>
        </div>
      ) : error ? (
        <div className="bg-red-900/20 border border-red-800/50 rounded p-1">
          <h4 className="text-red-300 font-medium text-xs flex items-center">
            <AlertCircle size={10} className="mr-1" />
            Error Loading Skip Options
          </h4>
          <p className="text-xs text-red-200/80">{error}</p>
        </div>
      ) : availableSkips.length > 0 ? (
        <>
          <div className="grid grid-cols-3 gap-1 mb-1">
            {availableSkips.map((skip) => (
              <button
                key={skip.id}
                onClick={() => selectSkip(skip)}
                className={`px-1 py-0.5 rounded text-xs font-medium transition-all duration-300 ${
                  selectedSkip && selectedSkip.id === skip.id
                    ? 'bg-gradient-to-r from-teal-600 to-blue-700 text-white shadow-sm'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
                }`}
              >
                {skip.size}y - £{skip.price_before_vat}
              </button>
            ))}
          </div>
          
          {selectedSkip && (
            <div className="px-1 py-1 bg-gray-800/50 rounded border border-gray-700/50 text-xs mt-1">
              <div className="flex justify-between items-center">
                <span className="font-semibold">{selectedSkip.size} Yard Skip</span>
                <span className="text-teal-300">£{selectedSkip.price_before_vat}</span>
              </div>
              <div className="text-gray-400 flex flex-wrap gap-x-2 text-xs">
                <span>Hire: {selectedSkip.hire_period_days}d</span>
                <span>VAT: {selectedSkip.vat}%</span>
                <span>{selectedSkip.allowed_on_road ? 'Road OK' : 'Off-road'}</span>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="bg-red-900/20 border border-red-800/50 rounded p-1">
          <h4 className="text-red-300 font-medium text-xs flex items-center">
            <AlertCircle size={10} className="mr-1" />
            No Skips Available
          </h4>
          <p className="text-xs text-red-200/80">
            Based on your heavy waste selection, there are no suitable skips available.
          </p>
        </div>
      )}
    </div>
  );
};

const VisualRepresentation = ({ selectedWasteTypes, selectedPercentage }) => {
  const selectedOption = percentageOptions.find(option => option.id === selectedPercentage);

  return (
    <div className="pb-2 h-full flex flex-col">
      <SectionHeader title="Visual representation:" />
      
      {selectedWasteTypes.length > 0 ? (
        <div className="rounded-lg overflow-hidden shadow-sm border border-gray-700 flex-grow flex flex-col">
          <div className="bg-gray-800 p-1 flex justify-center flex-grow">
          {selectedOption?.image && (
              <img 
                src={selectedOption.image}
                alt={selectedOption.label}
                className="rounded object-cover w-full h-full min-h-[140px]"
              />
            )}
          </div>
          <div className="p-1 bg-gray-800/70">
            <p className="text-xs text-center text-gray-300">
              {selectedPercentage === 'none' && 'Regular skip without heavy waste'}
              {selectedPercentage === 'low' && 'Skip with a small amount of heavy waste (up to 5%)'}
              {selectedPercentage === 'medium' && 'Skip with a moderate amount of heavy waste (5-20%)'}
              {selectedPercentage === 'high' && 'Skip with a large amount of heavy waste (over 20%)'}
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-red-900/20 border border-red-800/50 rounded p-3 flex-grow flex flex-col justify-center">
          <h4 className="text-red-300 font-medium text-xs flex items-center">
            <AlertCircle size={10} className="mr-1" />
            Skip Size Restrictions
          </h4>
          <p className="text-xs text-red-200/80">
            For safety reasons, heavy waste can only be disposed of in skips up to 8 yards. 
            Larger skips will not be available if heavy waste is selected.
          </p>
        </div>
      )}
    </div>
  );
};

const PopupFooter = ({ selectedSkip, isLoading, error }) => {
  return (
    <div className="bg-gray-800/50 p-2 border-t border-gray-800">
      <div className="flex justify-between items-center">
        {selectedSkip && !isLoading && !error && (
          <div className="text-xs flex items-center">
            <span className="text-gray-400 mr-1">Total:</span>
            <span className="text-white font-bold">£{(selectedSkip.price_before_vat * (1 + selectedSkip.vat/100)).toFixed(2)}</span>
          </div>
        )}
        <button 
          className={`px-3 py-1 text-xs rounded transition-all duration-300 font-medium ${
            selectedSkip && !isLoading && !error
              ? 'bg-gradient-to-r from-teal-500 to-blue-600 text-white hover:from-teal-600 hover:to-blue-700 shadow-sm' 
              : 'bg-gray-700 text-gray-400 cursor-not-allowed'
          }`}
          disabled={!selectedSkip || isLoading || error}
        >
          {isLoading ? 'Loading...' : 'Continue'}
        </button>
      </div>
    </div>
  );
};

const HeavyWastePopup = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedWasteTypes, setSelectedWasteTypes] = useState([]);
  const [selectedPercentage, setSelectedPercentage] = useState('none');
  const [selectedSkip, setSelectedSkip] = useState(null);
  const [skipData, setSkipData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSkipData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft');
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        setSkipData(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching skip data:', err);
        setError('Failed to load skip options. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSkipData();
  }, []);

  const getAvailableSkips = () => {
    const needsHeavyWasteSupport = selectedWasteTypes.length > 0;
    return skipData
      .filter(skip => !needsHeavyWasteSupport || skip.allows_heavy_waste)
      .sort((a, b) => a.size - b.size);
  };

  useEffect(() => {
    if (selectedWasteTypes.length === 0) {
      setSelectedPercentage('none'); 
    } else if (selectedPercentage === 'none') {
     
      setSelectedPercentage('low');
    } 
    
   
    const availableSkips = getAvailableSkips();
    if (selectedSkip && !availableSkips.some(skip => skip.id === selectedSkip.id)) {
      setSelectedSkip(null);
    }
  }, [selectedWasteTypes, selectedPercentage]);

  const toggleWasteType = (wasteType) => {
    if (selectedWasteTypes.includes(wasteType)) {
      setSelectedWasteTypes(selectedWasteTypes.filter(type => type !== wasteType));
    } else {
      setSelectedWasteTypes([...selectedWasteTypes, wasteType]);
    }
  };

  const selectPercentage = (percentageId) => {
   
    if (percentageId !== 'none' && selectedWasteTypes.length === 0) {
      return; 
    }
    setSelectedPercentage(percentageId);
  };

  const selectSkip = (skip) => {
    setSelectedSkip(skip);
  };

  const closePopup = () => {
    setIsOpen(false);
    setSelectedWasteTypes([]);
    setSelectedPercentage('none');
    setSelectedSkip(null);
  };

  if (!isOpen) {
    return (
      <div className="flex justify-center">
        <button 
          onClick={() => setIsOpen(true)}
          className="mt-4 px-6 py-3 bg-gradient-to-r from-teal-500 to-blue-600 text-white rounded-md hover:from-teal-600 hover:to-blue-700 shadow-lg transition-all duration-300 font-medium"
        >
          Reopen Popup
        </button>
      </div>
    );
  }

  const availableSkips = getAvailableSkips();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gradient-to-b from-gray-900 to-gray-950 text-gray-100 rounded-xl shadow-xl w-full max-w-2xl mx-auto overflow-hidden border border-gray-800 max-h-[90vh] overflow-y-auto">
        <PopupHeader onClose={closePopup} />
        <div className="h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-40"></div>
        <WarningBanner />
        
       
        <div className="grid sm:grid-cols-2 grid-cols-1 gap-2 px-2 sm:min-h-[400px]">
         
          <div>
            <WasteTypeSelector 
              selectedWasteTypes={selectedWasteTypes} 
              toggleWasteType={toggleWasteType} 
            />
            
            <PercentageSelector 
              selectedWasteTypes={selectedWasteTypes}
              selectedPercentage={selectedPercentage}
              selectPercentage={selectPercentage}
            />
            
           
            <div className="sm:hidden">
              <VisualRepresentation 
                selectedWasteTypes={selectedWasteTypes}
                selectedPercentage={selectedPercentage}
              />
            </div>
            
            <SkipSizeSelector 
              isLoading={isLoading}
              error={error}
              availableSkips={availableSkips}
              selectedSkip={selectedSkip}
              selectSkip={selectSkip}
              showSkipSizes={selectedPercentage !== 'none'}
            />
          </div>
          
         
          <div className="hidden sm:block h-full">
            <VisualRepresentation 
              selectedWasteTypes={selectedWasteTypes}
              selectedPercentage={selectedPercentage}
            />
          </div>
        </div>
        
        <PopupFooter 
          selectedSkip={selectedSkip}
          isLoading={isLoading}
          error={error}
        />
      </div>
    </div>
  );
};

export default HeavyWastePopup;