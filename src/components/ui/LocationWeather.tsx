import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Cloud, Sun, CloudRain, CloudSnow, Zap } from 'lucide-react';

interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  icon: string;
}

const LocationWeather: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [currentDate, setCurrentDate] = useState<string>('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  // Update time every second
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const brisbaneTime = new Intl.DateTimeFormat('en-AU', {
        timeZone: 'Australia/Brisbane',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      }).format(now);

      const brisbaneDate = new Intl.DateTimeFormat('en-AU', {
        timeZone: 'Australia/Brisbane',
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(now);

      setCurrentTime(brisbaneTime);
      setCurrentDate(brisbaneDate);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Fetch weather data (you'll need to add your API key)
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // For demonstration - you'll need to replace with actual API
        // const API_KEY = 'your_openweathermap_api_key';
        // const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Brisbane,AU&appid=${API_KEY}&units=metric`);
        
        // Mock data for demo (replace with actual API call)
        setTimeout(() => {
          setWeather({
            temperature: 24,
            condition: 'Partly Cloudy',
            humidity: 65,
            windSpeed: 12,
            icon: 'partly-cloudy'
          });
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching weather:', error);
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
      case 'clear':
        return <Sun className="text-yellow-400" size={24} />;
      case 'partly-cloudy':
      case 'partly cloudy':
        return <Cloud className="text-blue-300" size={24} />;
      case 'rainy':
      case 'rain':
        return <CloudRain className="text-blue-500" size={24} />;
      case 'snowy':
      case 'snow':
        return <CloudSnow className="text-blue-200" size={24} />;
      case 'stormy':
      case 'thunderstorm':
        return <Zap className="text-purple-400" size={24} />;
      default:
        return <Cloud className="text-gray-400" size={24} />;
    }
  };

  return (
    <motion.div
      className="bg-dark-600/80 backdrop-blur-sm rounded-xl border border-dark-400 p-6 w-full max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Horizontal Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        
        {/* Location Header */}
        <div className="text-center md:text-left">
          <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <MapPin className="text-primary-400" size={20} />
            </motion.div>
            <h3 className="text-lg font-semibold text-white">Brisbane, Australia</h3>
          </div>
        </div>

        {/* Time Display */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-2 justify-center mb-2">
            <Clock className="text-secondary-400" size={16} />
            <span className="text-sm text-gray-400">Local Time</span>
          </div>
          <div className="font-mono text-xl font-bold text-white mb-1">
            {currentTime}
          </div>
          <div className="text-xs text-gray-300">
            {currentDate}
          </div>
        </motion.div>

        {/* Weather Display */}
        <motion.div
          className="text-center md:text-right"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {loading ? (
            <div className="flex items-center justify-center py-4">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-6 h-6 border-2 border-primary-500 border-t-transparent rounded-full"
              />
            </div>
          ) : weather ? (
            <div>
              <div className="flex items-center justify-center md:justify-end gap-2 mb-2">
                {getWeatherIcon(weather.condition)}
                <span className="text-white font-medium">{weather.condition}</span>
                <div className="text-xl font-bold text-white ml-2">
                  {weather.temperature}°C
                </div>
              </div>
              
              <div className="flex justify-center md:justify-end gap-4 text-xs">
                <div className="text-gray-300">
                  <span className="text-gray-400">Humidity:</span> {weather.humidity}%
                </div>
                <div className="text-gray-300">
                  <span className="text-gray-400">Wind:</span> {weather.windSpeed} km/h
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-400 py-2">
              Weather data unavailable
            </div>
          )}
        </motion.div>
      </div>

      {/* Subtle animation effect */}
      <motion.div
        className="absolute inset-0 rounded-xl pointer-events-none"
        style={{
          background: 'linear-gradient(45deg, transparent 0%, rgba(139, 92, 246, 0.05) 50%, transparent 100%)',
        }}
        animate={{
          background: [
            'linear-gradient(45deg, transparent 0%, rgba(139, 92, 246, 0.05) 50%, transparent 100%)',
            'linear-gradient(225deg, transparent 0%, rgba(59, 130, 246, 0.05) 50%, transparent 100%)',
            'linear-gradient(45deg, transparent 0%, rgba(139, 92, 246, 0.05) 50%, transparent 100%)',
          ]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
};

export default LocationWeather;