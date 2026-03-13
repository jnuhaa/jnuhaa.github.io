import React, { useState, useEffect, memo } from 'react';
import { Sun, Cloud, CloudRain, Wind, Snowflake } from 'lucide-react';
import { TYPOGRAPHY } from '../layouts/case-study';

const fetchMunichWeather = async () => {
  try {
    const response = await fetch(
      'https://wttr.in/Munich?format=j1&lang=en',
      { method: 'GET', mode: 'cors', headers: { Accept: 'application/json' } }
    );
    if (!response.ok) throw new Error(`Weather service unavailable: ${response.status}`);

    const data = await response.json();
    if (!data.current_condition?.[0]) throw new Error('Invalid weather data format');

    const current = data.current_condition[0];
    const temp = Math.round(parseFloat(current.temp_C || 18));
    const conditionCode = parseInt(current.weatherCode || 116);
    const description = (current.weatherDesc?.[0]?.value ?? 'partly cloudy').toLowerCase();

    let condition = 'sunny';
    if (description.includes('sunny') || description.includes('clear')) condition = 'sunny';
    else if (description.includes('partly cloudy') || description.includes('partly')) condition = 'partly-cloudy';
    else if (description.includes('cloudy') || description.includes('overcast')) condition = 'cloudy';
    else if (description.includes('rain') || description.includes('drizzle') || description.includes('shower') || description.includes('thunder')) condition = 'rainy';
    else if (description.includes('snow') || description.includes('sleet') || description.includes('blizzard')) condition = 'snowy';
    else if (description.includes('wind') || description.includes('mist') || description.includes('fog') || description.includes('haze')) condition = 'windy';
    else {
      if (conditionCode >= 200 && conditionCode < 600) condition = 'rainy';
      else if (conditionCode >= 600 && conditionCode < 700) condition = 'snowy';
      else if (conditionCode >= 700 && conditionCode < 800) condition = 'windy';
      else if (conditionCode === 113 || conditionCode === 800) condition = 'sunny';
      else if (conditionCode === 116) condition = 'partly-cloudy';
      else if (conditionCode >= 119 && conditionCode <= 122) condition = 'cloudy';
    }

    return { temp, condition, description };
  } catch (error) {
    console.error('Weather fetch error:', error);
    return { temp: 18, condition: 'partly-cloudy', description: 'partly cloudy' };
  }
};

const conditionText = {
  sunny: 'Picnic perfect',
  'partly-cloudy': "Happy it's not raining",
  cloudy: "Happy it's not raining",
  rainy: 'City shower',
  snowy: 'yay, snow!',
  windy: "Happy it's not raining"
};

const getWeatherIcon = (condition) => {
  const iconProps = { size: 16 };
  const baseClassName = 'animate-pulse';
  switch (condition) {
    case 'sunny': return <Sun {...iconProps} className={baseClassName} style={{ animationDuration: '2s' }} />;
    case 'partly-cloudy':
    case 'cloudy': return <Cloud {...iconProps} className={baseClassName} style={{ animationDuration: '2s' }} />;
    case 'rainy': return <CloudRain {...iconProps} className={baseClassName} style={{ animationDuration: '2s' }} />;
    case 'snowy': return <Snowflake {...iconProps} className={baseClassName} style={{ animationDuration: '2s' }} />;
    case 'windy': return <Wind {...iconProps} className={baseClassName} style={{ animationDuration: '2s' }} />;
    default: return <Sun {...iconProps} className={baseClassName} style={{ animationDuration: '2s' }} />;
  }
};

const MunichWeather = memo(() => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadWeather = async () => {
      setLoading(true);
      setError(false);
      try {
        const data = await fetchMunichWeather();
        if (isMounted) setWeather(data);
      } catch {
        if (isMounted) {
          setError(true);
          setWeather({ temp: 18, condition: 'partly-cloudy', description: 'partly cloudy' });
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadWeather();
    const interval = setInterval(loadWeather, 10 * 60 * 1000);
    return () => { isMounted = false; clearInterval(interval); };
  }, []);

  if (loading && !weather) {
    return (
      <div className={`${TYPOGRAPHY.caption} pointer-events-auto`}>
        <span className="text-slate-400 normal-case">Weather loading...</span>
      </div>
    );
  }

  return (
    <div className={`flex items-center space-x-2 ${TYPOGRAPHY.caption} pointer-events-auto min-w-[200px] justify-end`}>
      {weather && (
        <>
          <span className="flex-shrink-0">{getWeatherIcon(weather.condition)}</span>
          <span className="flex-shrink-0">{weather.temp}°C</span>
          <span className="text-slate-400 flex-shrink-0">{conditionText[weather.condition] ?? "Happy it's not raining"}</span>
        </>
      )}
      {error && <span className="text-slate-400 flex-shrink-0">Weather unavailable</span>}
    </div>
  );
});

MunichWeather.displayName = 'MunichWeather';
export default MunichWeather;
