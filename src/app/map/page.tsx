'use client';

import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { Search, Filter, Navigation, Loader2, MapPin } from 'lucide-react';

const libraries: ('places' | 'geometry')[] = ['places', 'geometry'];

const mapContainerStyle = {
  width: '100%',
  height: 'calc(100vh - 64px)',
};

const defaultCenter = {
  lat: 37.7749,
  lng: -122.4194,
};

interface Business {
  _id?: string;
  id?: string;
  name: string;
  category: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  safetyScore: number;
  features: {
    accessibility?: string[];
    identity?: string[];
    neurodiversity?: string[];
  };
  photos?: string[];
}

export default function MapPage() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries,
  });

  const [center, setCenter] = useState(defaultCenter);
  const [zoom, setZoom] = useState(12);
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch businesses when map loads
  useEffect(() => {
    fetchBusinesses();
  }, []);

  const fetchBusinesses = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/businesses');
      const data = await response.json();
      setBusinesses(data.businesses || []);
    } catch (error) {
      console.error('Error fetching businesses:', error);
    } finally {
      setLoading(false);
    }
  };

  // Get user's current location
  const handleGetLocation = useCallback(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newCenter = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCenter(newCenter);
          setZoom(14);
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Unable to get your location. Please enable location services.');
        }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  }, []);

  // Search businesses
  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      fetchBusinesses();
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/businesses?search=${encodeURIComponent(searchTerm)}`);
      const data = await response.json();
      setBusinesses(data.businesses || []);
    } catch (error) {
      console.error('Error searching businesses:', error);
    } finally {
      setLoading(false);
    }
  };

  // Custom map options
  const mapOptions = useMemo<google.maps.MapOptions>(
    () => ({
      disableDefaultUI: false,
      clickableIcons: false,
      scrollwheel: true,
      zoomControl: true,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: true,
      styles: [
        {
          featureType: 'poi',
          elementType: 'labels',
          stylers: [{ visibility: 'off' }],
        },
      ],
    }),
    []
  );

  // Get marker color based on safety score
  const getMarkerColor = (safetyScore: number): string => {
    if (safetyScore >= 80) return '#10b981'; // green
    if (safetyScore >= 60) return '#f59e0b'; // yellow
    return '#ef4444'; // red
  };

  // Flatten features array for display
  const getFeaturesArray = (business: Business): string[] => {
    const features: string[] = [];
    if (business.features?.accessibility) features.push(...business.features.accessibility);
    if (business.features?.identity) features.push(...business.features.identity);
    if (business.features?.neurodiversity) features.push(...business.features.neurodiversity);
    return features;
  };

  if (loadError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
        <div className="text-center max-w-2xl w-full p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <div className="mb-4 text-red-500">
            <MapPin className="h-12 w-12 mx-auto" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Google Maps API Error
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {loadError.message || 'Unable to load Google Maps'}
          </p>
          
          <div className="text-sm text-gray-500 dark:text-gray-400 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 rounded-lg mb-4">
            <p className="font-semibold mb-2 text-red-700 dark:text-red-400">⚠️ Setup Required</p>
            <ol className="text-left space-y-2 ml-4 list-decimal">
              <li><strong>Enable APIs:</strong> Go to Google Cloud Console → APIs & Services → Library</li>
              <li>Enable <strong>"Maps JavaScript API"</strong> and <strong>"Places API"</strong></li>
              <li><strong>Configure API Key:</strong> Add HTTP referrers (localhost:3000)</li>
              <li><strong>Enable Billing:</strong> Required for Maps API ($200/month free credit)</li>
            </ol>
            <p className="mt-3 text-xs">
              📖 Detailed instructions: <code className="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded">GOOGLE_MAPS_SETUP.md</code>
            </p>
          </div>

          <div className="flex gap-3 justify-center">
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Retry
            </button>
            <a
              href="https://console.cloud.google.com/apis/library"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Open Google Cloud Console
            </a>
          </div>
          
          <div className="mt-6 text-xs text-gray-500 dark:text-gray-400">
            <p>Current API Key: {process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ? '✓ Configured' : '✗ Missing'}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary-600 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading map...</p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
            {!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY && 
              '⚠️ Google Maps API key not found'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-screen">
      {/* Search and Filter Bar */}
      <div className="absolute top-4 left-4 right-4 z-10 flex gap-2">
        <div className="flex-1 bg-white rounded-lg shadow-lg p-2 flex items-center gap-2">
          <Search className="h-5 w-5 text-gray-400 ml-2" />
          <input
            type="text"
            placeholder="Search for safe spaces..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            className="flex-1 px-2 py-2 focus:outline-none"
          />
          <button 
            onClick={handleSearch}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            Search
          </button>
        </div>
        <button 
          onClick={handleGetLocation}
          className="bg-white rounded-lg shadow-lg p-3 hover:bg-gray-50 transition-colors"
          title="Get my location"
        >
          <Navigation className="h-5 w-5 text-gray-600" />
        </button>
      </div>

      {/* Map */}
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={zoom}
        options={mapOptions}
        onClick={() => setSelectedBusiness(null)}
      >
        {/* Business Markers */}
        {businesses.map((business) => {
          const businessId = business._id || business.id || '';
          return (
            <Marker
              key={businessId}
              position={business.coordinates}
              onClick={() => setSelectedBusiness(business)}
              title={business.name}
              icon={{
                path: google.maps.SymbolPath.CIRCLE,
                scale: 10,
                fillColor: getMarkerColor(business.safetyScore),
                fillOpacity: 0.9,
                strokeWeight: 2,
                strokeColor: '#ffffff',
              }}
            />
          );
        })}

        {/* Info Window for selected business */}
        {selectedBusiness && (
          <InfoWindow
            position={selectedBusiness.coordinates}
            onCloseClick={() => setSelectedBusiness(null)}
          >
            <div className="p-2 max-w-xs">
              <h3 className="font-bold text-lg mb-1">{selectedBusiness.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{selectedBusiness.category}</p>
              
              {/* Safety Score Bar */}
              <div className="flex items-center gap-2 mb-2">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full"
                    style={{ 
                      width: `${selectedBusiness.safetyScore}%`,
                      backgroundColor: getMarkerColor(selectedBusiness.safetyScore)
                    }}
                  />
                </div>
                <span className="text-sm font-medium">{selectedBusiness.safetyScore}</span>
              </div>
              
              <p className="text-xs text-gray-500 mb-2">{selectedBusiness.address}</p>
              
              {/* Features */}
              <div className="flex flex-wrap gap-1 mb-3">
                {getFeaturesArray(selectedBusiness).slice(0, 3).map((feature, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full"
                  >
                    {feature.replace(/-/g, ' ')}
                  </span>
                ))}
                {getFeaturesArray(selectedBusiness).length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                    +{getFeaturesArray(selectedBusiness).length - 3} more
                  </span>
                )}
              </div>
              
              <a
                href={`/business/${selectedBusiness._id || selectedBusiness.id}`}
                className="block text-center px-4 py-2 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700 transition-colors"
              >
                View Details
              </a>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>

      {/* Loading Indicator */}
      {loading && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg px-4 py-2 flex items-center gap-2">
          <Loader2 className="h-4 w-4 text-indigo-600 animate-spin" />
          <p className="text-sm text-gray-600">Loading businesses...</p>
        </div>
      )}

      {/* Business Count */}
      <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg px-4 py-2">
        <p className="text-sm font-medium">
          <span className="text-indigo-600">{businesses.length}</span> safe space{businesses.length !== 1 ? 's' : ''} found
        </p>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-lg p-4">
        <p className="text-xs font-semibold text-gray-700 mb-2">Safety Score</p>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-xs text-gray-600">80-100 (Excellent)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span className="text-xs text-gray-600">60-79 (Good)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-xs text-gray-600">0-59 (Fair)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
