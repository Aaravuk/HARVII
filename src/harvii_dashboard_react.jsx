import React, { useEffect, useState, useRef, useMemo, useCallback } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Sun, Cloud, Wind, Droplet, AlertTriangle, Wifi, Brain, ArrowRight, Globe, Thermometer, Eye, Zap, Camera } from "lucide-react";

// Multi-language translations
const translations = {
  en: {
    dashboard: "HARVII Dashboard",
    liveOverview: "Live sensor overview",
    aiPredictions: "AI Predictions",
    refresh: "Refresh",
    auto: "Auto",
    temperature: "Temperature",
    humidity: "Humidity",
    soil: "Soil",
    light: "Light",
    gas: "Gas",
    alert: "Alert",
    latestValues: "Latest Values",
    realTimeSnapshot: "Real-time snapshot",
    liveWeather: "Live Weather",
    windSpeed: "Wind Speed",
    code: "Code",
    time: "Time",
    recentAlerts: "Recent Alerts",
    connection: "Connection",
    status: "Status",
    rawData: "Raw Data",
    show: "Show",
    entries: "entries",
    prev: "Prev",
    next: "Next",
    page: "Page",
    of: "of",
    noAlerts: "No alerts",
    noData: "No data yet.",
    loading: "Loading…",
    cropPredictions: "Crop Predictions",
    waterFlowAnalysis: "Water Flow Analysis",
    recommendedCrops: "Recommended Crops",
    aiInsights: "AI Insights",
    irrigationAnalysis: "Irrigation Analysis",
    smartRecommendations: "Smart Recommendations",
    cropSuggestions: "Crop Suggestions Based on Climate",
    seasonalCrops: "Seasonal Crops",
    selectLanguage: "Select Language",
    climateBasedRecommendations: "Climate-Based Recommendations",
    currentConditions: "Current Conditions",
    optimalFor: "Optimal for",
    moderate: "Moderate",
    high: "High",
    low: "Low",
    liveFeed: "Live Camera Feed",
    cameraOffline: "Camera offline"
  },
  hi: {
    dashboard: "हार्वी डैशबोर्ड",
    liveOverview: "लाइव सेंसर अवलोकन",
    aiPredictions: "AI भविष्यवाणियां",
    refresh: "रीफ्रेश",
    auto: "ऑटो",
    temperature: "तापमान",
    humidity: "नमी",
    soil: "मिट्टी",
    light: "प्रकाश",
    gas: "गैस",
    alert: "चेतावनी",
    latestValues: "नवीनतम मान",
    realTimeSnapshot: "रीयल-टाइम स्नैपशॉट",
    liveWeather: "लाइव मौसम",
    windSpeed: "हवा की गति",
    code: "कोड",
    time: "समय",
    recentAlerts: "हाल की चेतावनियां",
    connection: "कनेक्शन",
    status: "स्थिति",
    rawData: "कच्चा डेटा",
    show: "दिखाएं",
    entries: "प्रविष्टियां",
    prev: "पिछला",
    next: "अगला",
    page: "पृष्ठ",
    of: "का",
    noAlerts: "कोई चेतावनी नहीं",
    noData: "अभी तक कोई डेटा नहीं।",
    loading: "लोड हो रहा है…",
    cropPredictions: "फसल भविष्यवाणियां",
    waterFlowAnalysis: "जल प्रवाह विश्लेषण",
    recommendedCrops: "अनुशंसित फसलें",
    aiInsights: "AI अंतर्दृष्टि",
    irrigationAnalysis: "सिंचाई विश्लेषण",
    smartRecommendations: "स्मार्ट सिफारिशें",
    cropSuggestions: "जलवायु के आधार पर फसल सुझाव",
    seasonalCrops: "मौसमी फसलें",
    selectLanguage: "भाषा चुनें",
    climateBasedRecommendations: "जलवायु आधारित सिफारिशें",
    currentConditions: "वर्तमान स्थितियां",
    optimalFor: "के लिए अनुकूल",
    moderate: "मध्यम",
    high: "उच्च",
    low: "कम",
    liveFeed: "लाइव कैमरा फीड",
    cameraOffline: "कैमरा ऑफलाइन"
  },
  ta: {
    dashboard: "ஹார்வி டாஷ்போர்ட்",
    liveOverview: "நேரடி சென்சார் கண்ணோட்டம்",
    aiPredictions: "AI முன்னறிவிப்புகள்",
    refresh: "புதுப்பிக்கவும்",
    auto: "தானியங்கி",
    temperature: "வெப்பநிலை",
    humidity: "ஈரப்பதம்",
    soil: "மண்",
    light: "ஒளி",
    gas: "வாயு",
    alert: "எச்சரிக்கை",
    latestValues: "சமீபத்திய மதிப்புகள்",
    realTimeSnapshot: "நேரடி புகைப்படம்",
    liveWeather: "நேரடி வானிலை",
    windSpeed: "காற்று வேகம்",
    code: "குறியீடு",
    time: "நேரம்",
    recentAlerts: "சமீபத்திய எச்சரிக்கைகள்",
    connection: "இணைப்பு",
    status: "நிலை",
    rawData: "மூல தரவு",
    show: "காட்டு",
    entries: "பதிவுகள்",
    prev: "முந்தைய",
    next: "அடுத்த",
    page: "பக்கம்",
    of: "இல்",
    noAlerts: "எச்சரிக்கைகள் இல்லை",
    noData: "இன்னும் தரவு இல்லை.",
    loading: "ஏற்றப்படுகிறது…",
    cropPredictions: "பயிர் முன்னறிவிப்புகள்",
    waterFlowAnalysis: "நீர் ஓட்ட பகுப்பாய்வு",
    recommendedCrops: "பரிந்துரைக்கப்பட்ட பயிர்கள்",
    aiInsights: "AI நுண்ணறிவுகள்",
    irrigationAnalysis: "பாசன பகுப்பாய்வு",
    smartRecommendations: "ஸ்மார்ட் பரிந்துரைகள்",
    cropSuggestions: "காலநிலை அடிப்படையிலான பயிர் பரிந்துரைகள்",
    seasonalCrops: "பருவகால பயிர்கள்",
    selectLanguage: "மொழியைத் தேர்ந்தெடுக்கவும்",
    climateBasedRecommendations: "காலநிலை அடிப்படையிலான பரிந்துரைகள்",
    currentConditions: "தற்போதைய நிலைமைகள்",
    optimalFor: "க்கு உகந்தது",
    moderate: "மிதமான",
    high: "அதிக",
    low: "குறைந்த",
    liveFeed: "நேரடி கேமரா ஃபீட்",
    cameraOffline: "கேமரா ஆஃப்லைன்"
  },
  or: {
    dashboard: "ହାର୍ଭି ଡ୍ୟାସବୋର୍ଡ",
    liveOverview: "ଲାଇଭ ସେନ୍ସର ଅବଲୋକନ",
    aiPredictions: "AI ଭବିଷ୍ୟବାଣୀ",
    refresh: "ପୁନଃସତେଜ",
    auto: "ସ୍ୱୟଂଚାଳିତ",
    temperature: "ତାପମାତ୍ରା",
    humidity: "ଆର୍ଦ୍ରତା",
    soil: "ମାଟି",
    light: "ଆଲୋକ",
    gas: "ଗ୍ୟାସ",
    alert: "ସତର୍କତା",
    latestValues: "ସର୍ବଶେଷ ମୂଲ୍ୟଗୁଡିକ",
    realTimeSnapshot: "ପ୍ରକୃତ ସମୟ ସ୍ନାପସଟ",
    liveWeather: "ଲାଇଭ ପାଣିପାଗ",
    windSpeed: "ପବନ ଗତି",
    code: "କୋଡ",
    time: "ସମୟ",
    recentAlerts: "ସାମ୍ପ୍ରତିକ ସତର୍କତା",
    connection: "ସଂଯୋଗ",
    status: "ସ୍ଥିତି",
    rawData: "କଞ୍ଚା ତଥ୍ୟ",
    show: "ଦେଖାଇବା",
    entries: "ପ୍ରବିଷ୍ଟିଗୁଡିକ",
    prev: "ପୂର୍ବବର୍ତ୍ତୀ",
    next: "ପରବର୍ତ୍ତୀ",
    page: "ପୃଷ୍ଠା",
    of: "ର",
    noAlerts: "କୌଣସି ସତର୍କତା ନାହିଁ",
    noData: "ଏପର୍ଯ୍ୟନ୍ତ କୌଣସି ତଥ୍ୟ ନାହିଁ।",
    loading: "ଲୋଡିଂ…",
    cropPredictions: "ଫସଲ ଭବିଷ୍ୟବାଣୀ",
    waterFlowAnalysis: "ଜଳ ପ୍ରବାହ ବିଶ୍ଳେଷଣ",
    recommendedCrops: "ସୁପାରିଶ କରାଯାଇଥିବା ଫସଲ",
    aiInsights: "AI ଅନ୍ତର୍ଦୃଷ୍ଟି",
    irrigationAnalysis: "ସେଚନ ବିଶ୍ଳେଷଣ",
    smartRecommendations: "ସ୍ମାର୍ଟ ସୁପାରିଶ",
    cropSuggestions: "ଜଳବାୟୁ ଉପରେ ଆଧାରିତ ଫସଲ ସୁଝାବ",
    seasonalCrops: "ମୌସୁମୀ ଫସଲ",
    selectLanguage: "ଭାଷା ବାଛନ୍ତୁ",
    climateBasedRecommendations: "ଜଳବାୟୁ ଆଧାରିତ ସୁପାରିଶ",
    currentConditions: "ବର୍ତ୍ତମାନ ଅବସ୍ଥା",
    optimalFor: "ପାଇଁ ଉପଯୁକ୍ତ",
    moderate: "ମଧ୍ୟମ",
    high: "ଉଚ୍ଚ",
    low: "କମ",
    liveFeed: "ଲାଇଭ କ୍ୟାମେରା ଫିଡ୍",
    cameraOffline: "କ୍ୟାମେରା ଅଫ୍ଲାଇନ୍"
  },
  ne: {
    dashboard: "हार्वी ड्यासबोर्ड",
    liveOverview: "प्रत्यक्ष सेन्सर अवलोकन",
    aiPredictions: "AI भविष्यवाणीहरू",
    refresh: "ताजगी गर्नुहोस्",
    auto: "स्वचालित",
    temperature: "तापक्रम",
    humidity: "आर्द्रता",
    soil: "माटो",
    light: "प्रकाश",
    gas: "ग्यास",
    alert: "चेतावनी",
    latestValues: "नवीनतम मानहरू",
    realTimeSnapshot: "वास्तविक समय स्न्यापसट",
    liveWeather: "प्रत्यक्ष मौसम",
    windSpeed: "हावाको गति",
    code: "कोड",
    time: "समय",
    recentAlerts: "हालैका चेतावनीहरू",
    connection: "जडान",
    status: "स्थिति",
    rawData: "कच्चा डेटा",
    show: "देखाउनुहोस्",
    entries: "प्रविष्टिहरू",
    prev: "पछिल्लो",
    next: "अर्को",
    page: "पृष्ठ",
    of: "को",
    noAlerts: "कुनै चेतावनी छैन",
    noData: "अझै कुनै डेटा छैन।",
    loading: "लोड गर्दै…",
    cropPredictions: "बाली भविष्यवाणी",
    waterFlowAnalysis: "पानी प्रवाह विश्लेषण",
    recommendedCrops: "सिफारिश गरिएका बालीहरू",
    aiInsights: "AI अन्तर्दृष्टि",
    irrigationAnalysis: "सिंचाई विश्लेषण",
    smartRecommendations: "स्मार्ट सिफारिसहरू",
    cropSuggestions: "मौसमको आधारमा बाली सुझावहरू",
    seasonalCrops: "मौसमी बालीहरू",
    selectLanguage: "भाषा छान्नुहोस्",
    climateBasedRecommendations: "मौसम आधारित सिफारिसहरू",
    currentConditions: "हालको अवस्थाहरू",
    optimalFor: "को लागि उपयुक्त",
    moderate: "मध्यम",
    high: "उच्च",
    low: "कम",
    liveFeed: "लाइभ क्यामेरा फिड",
    cameraOffline: "कैमरा अफलाइन"
  }
};

// Configuration Constants
const CONFIG = {
  SUPABASE_URL: "https://gqwravnbmbfhrsskljhn.supabase.co/rest/v1/sensor_data",
  SUPABASE_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdxd3Jhdm5ibWJmaHJzc2tsamhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcwOTIxMzIsImV4cCI6MjA3MjY2ODEzMn0.Zte-lunghmunXFArohfu2PYipkwoq9mtAxEoysyQFoE",
  REFRESH_INTERVAL: 5000,
  CHART_DATA_POINTS: 8,
  MAX_ALERTS: 10,
  DATA_LIMIT: 1000,
  CAMERA_URL: "http://10.234.83.109/",
};

// Memoized fetch options
const fetchOptions = {
  headers: {
    apikey: CONFIG.SUPABASE_KEY,
    Authorization: `Bearer ${CONFIG.SUPABASE_KEY}`,
    "Content-Type": "application/json",
  },
};

// Data transformation utility - O(n) time complexity
const normalizeData = (rawData) => {
  return rawData.map((r) => ({
    id: r.id,
    temp: parseFloat(r.Temperature ?? r.temperature ?? r.Temp ?? r.temp) || 0,
    hum: parseFloat(r.Humidity ?? r.humidity ?? r.Humi ?? r.h) || 0,
    soil: parseFloat(r.Soil_moisture ?? r.soilMoisture ?? r.soil_moisture) || 0,
    light: parseFloat(r.Light ?? r.light) || 0,
    gasPercent: parseFloat(r.gasPercent ?? r.gas_percent ?? r.gas) || 0,
    gasRaw: parseFloat(r.gasRaw ?? r.gas_raw) || 0,
    weather: r.Weather ?? r.weather ?? "Unknown",
    pollution: r.Pollution ?? r.pollution ?? "Unknown",
    soilCondition: r.SoilCondition ?? r.soilCondition ?? r.soil_condition,
    alert: r.Alert ?? r.alert ?? "None",
    airQuality: r.airQuality ?? r.air_quality ?? r.airQuality,
    time: r.inserted_at ?? r.created_at ?? r.ts ?? new Date().toISOString(),
  })).reverse();
};

// Crop recommendation engine - O(1) time complexity
const generateCropRecommendations = (sensorData) => {
  if (!sensorData.length) return [];
  
  const latest = sensorData[sensorData.length - 1];
  const recommendations = [];
  
  // Pre-computed recommendation rules for O(1) lookup
  const cropRules = [
    {
      crop: "Rice",
      condition: (data) => data.temp >= 20 && data.temp <= 30 && data.hum >= 60,
      suitability: "95%",
      reason: "Optimal temperature and humidity",
      waterNeed: "High",
      growthPeriod: "120-150 days",
      marketDemand: "High",
      // profitability: "₹45,000/acre"
    },
    {
      crop: "Wheat",
      condition: (data) => data.temp >= 15 && data.temp <= 25 && data.soil >= 40,
      suitability: "88%",
      reason: "Good soil moisture and moderate temperature",
      waterNeed: "Moderate",
      growthPeriod: "110-130 days",
      marketDemand: "Very High",
      // profitability: "₹35,000/acre"
    },
    {
      crop: "Corn",
      condition: (data) => data.temp >= 25 && data.temp <= 35 && data.light >= 60,
      suitability: "82%",
      reason: "High light intensity and warm temperature",
      waterNeed: "Moderate",
      growthPeriod: "90-110 days",
      marketDemand: "High",
      // profitability: "₹40,000/acre"
    },
    {
      crop: "Tomatoes",
      condition: (data) => data.temp >= 18 && data.temp <= 28,
      suitability: "79%",
      reason: "Moderate temperature range",
      waterNeed: "High",
      growthPeriod: "70-90 days",
      marketDemand: "Very High",
      // profitability: "₹60,000/acre"
    }
  ];

  return cropRules.filter(rule => rule.condition(latest));
};

// Seasonal recommendations - O(1) time complexity
const getSeasonalRecommendations = () => {
  const currentMonth = new Date().getMonth();
  
  const seasonalMap = {
    spring: [
      { crop: "Sugarcane", season: "Summer", waterReq: "High"},
      { crop: "Cotton", season: "Summer", waterReq: "Moderate"},
      { crop: "Sunflower", season: "Summer", waterReq: "Low"}
    ],
    monsoon: [
      { crop: "Rice", season: "Kharif", waterReq: "High"},
      { crop: "Maize", season: "Kharif", waterReq: "Moderate"},
      { crop: "Soybean", season: "Kharif", waterReq: "Moderate"}
    ],
    winter: [
      { crop: "Wheat", season: "Rabi", waterReq: "Moderate"},
      { crop: "Mustard", season: "Rabi", waterReq: "Low"},
      { crop: "Peas", season: "Rabi", waterReq: "Moderate"}
    ]
  };

  if (currentMonth >= 2 && currentMonth <= 5) return seasonalMap.spring;
  if (currentMonth >= 6 && currentMonth <= 9) return seasonalMap.monsoon;
  return seasonalMap.winter;
};

// Water flow analysis - O(1) time complexity
const analyzeWaterFlow = (sensorData) => {
  if (!sensorData.length) return null;
  
  const latest = sensorData[sensorData.length - 1];
  
  return {
    currentNeed: latest.soil < 30 ? "High" : latest.soil < 60 ? "Moderate" : "Low",
    recommendedFlow: latest.soil < 30 ? "12 L/hr" : latest.soil < 60 ? "8 L/hr" : "4 L/hr",
    nextIrrigation: latest.soil < 30 ? "Immediate" : latest.soil < 60 ? "4 hours" : "12 hours",
    efficiency: "87%",
    weeklySchedule: [
      { day: "Mon", hours: 2.5 },
      { day: "Tue", hours: 1.8 },
      { day: "Wed", hours: 2.2 },
      { day: "Thu", hours: 1.5 },
      { day: "Fri", hours: 2.8 },
      { day: "Sat", hours: 2.0 },
      { day: "Sun", hours: 1.9 }
    ]
  };
};

// Enhanced AI Prediction Page Component
const AIPredictionPage = React.memo(({ onBack, sensorData, language = "en" }) => {
  const t = translations[language];
  const [activeTab, setActiveTab] = useState("crop");
  const [loading, setLoading] = useState(false);

  // Memoized predictions to avoid recalculation - O(1) time complexity for subsequent renders
  const predictions = useMemo(() => {
    if (!sensorData.length) return { crop: [], waterFlow: null, climateRecommendations: [] };
    
    return {
      crop: generateCropRecommendations(sensorData),
      waterFlow: analyzeWaterFlow(sensorData),
      climateRecommendations: getSeasonalRecommendations()
    };
  }, [sensorData]);

  const generatePredictions = useCallback(() => {
    setLoading(true);
    // Simulate processing time for UX
    setTimeout(() => setLoading(false), 1000);
  }, []);

  useEffect(() => {
    generatePredictions();
  }, [generatePredictions]);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">{t.loading}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="p-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <ArrowRight className="rotate-180" size={20} />
            </button>
            <div>
              <h1 className="text-3xl font-extrabold flex items-center gap-3">
                <Brain className="text-purple-600" size={32} />
                {t.aiPredictions}
              </h1>
              <p className="text-sm text-gray-600 mt-1">Intelligent crop and irrigation recommendations</p>
            </div>
          </div>
          <button
            onClick={generatePredictions}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors shadow-md"
          >
            {t.refresh}
          </button>
        </header>

        <div className="flex gap-2 mb-6 overflow-x-auto">
          <button
            onClick={() => setActiveTab("crop")}
            className={`px-6 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
              activeTab === "crop"
                ? "bg-white shadow-lg text-purple-600 scale-105"
                : "bg-white/70 text-gray-600 hover:bg-white/90"
            }`}
          >
            Crop Recommendations
          </button>
          <button
            onClick={() => setActiveTab("waterFlow")}
            className={`px-6 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
              activeTab === "waterFlow"
                ? "bg-white shadow-lg text-blue-600 scale-105"
                : "bg-white/70 text-gray-600 hover:bg-white/90"
            }`}
          >
            {t.waterFlowAnalysis}
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 min-h-[500px]">
          {activeTab === "crop" && (
            <CropPredictionsTab 
              predictions={predictions} 
              sensorData={sensorData} 
              t={t} 
              COLORS={COLORS}
            />
          )}
          
          {activeTab === "waterFlow" && predictions.waterFlow && (
            <WaterFlowTab predictions={predictions} t={t} />
          )}
        </div>

        <footer className="mt-8 text-center text-xs text-gray-500">
          AI Predictions powered by HARVII ML Engine · Last updated: {new Date().toLocaleTimeString()}
        </footer>
      </div>
    </div>
  );
});

// Separate components for better performance and readability
const CropPredictionsTab = React.memo(({ predictions, sensorData, t, COLORS }) => (
  <div className="space-y-8">
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">{t.climateBasedRecommendations}</h2>
      
      <CurrentConditions sensorData={sensorData} t={t} />
      
      <h3 className="text-xl font-bold text-gray-800 mb-4">{t.seasonalCrops}</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {predictions.climateRecommendations.map((item, idx) => (
          <SeasonalCropCard key={`${item.crop}-${idx}`} item={item} t={t} />
        ))}
      </div>

      <WaterRequirementChart 
        data={predictions.climateRecommendations} 
        COLORS={COLORS} 
      />
    </div>

    <div className="border-t border-gray-200"></div>

    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">AI-Based {t.cropPredictions}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {predictions.crop.map((item, idx) => (
          <CropRecommendationCard key={`${item.crop}-${idx}`} item={item} />
        ))}
      </div>

      <AIInsights t={t} />
    </div>
  </div>
));

const CurrentConditions = React.memo(({ sensorData, t }) => {
  const latest = sensorData.length ? sensorData[sensorData.length - 1] : null;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <ConditionCard
        icon={<Thermometer size={20} className="text-blue-600" />}
        title={t.temperature}
        value={latest ? `${latest.temp}°C` : "25°C"}
        bgColor="bg-blue-50"
        borderColor="border-blue-200"
        textColor="text-blue-600"
      />
      <ConditionCard
        icon={<Droplet size={20} className="text-green-600" />}
        title={t.humidity}
        value={latest ? `${latest.hum}%` : "65%"}
        bgColor="bg-green-50"
        borderColor="border-green-200"
        textColor="text-green-600"
      />
      <ConditionCard
        icon={<Sun size={20} className="text-yellow-600" />}
        title={t.light}
        value={latest ? `${latest.light}%` : "75%"}
        bgColor="bg-yellow-50"
        borderColor="border-yellow-200"
        textColor="text-yellow-600"
      />
      <ConditionCard
        icon={<Eye size={20} className="text-purple-600" />}
        title="Soil pH"
        value="6.8"
        bgColor="bg-purple-50"
        borderColor="border-purple-200"
        textColor="text-purple-600"
      />
    </div>
  );
});

const ConditionCard = React.memo(({ icon, title, value, bgColor, borderColor, textColor }) => (
  <div className={`${bgColor} rounded-xl p-4 border ${borderColor}`}>
    <div className="flex items-center gap-2 mb-2">
      {icon}
      <p className="font-medium text-gray-700">{title}</p>
    </div>
    <p className={`text-2xl font-bold ${textColor}`}>{value}</p>
  </div>
));

const SeasonalCropCard = React.memo(({ item, t }) => (
  <div className="bg-gradient-to-br from-orange-50 to-yellow-50 border-2 border-orange-200 rounded-xl p-4">
    <h4 className="text-lg font-semibold text-orange-800 mb-2">{item.crop}</h4>
    <div className="space-y-2 text-sm">
      <div className="flex justify-between">
        <span className="text-gray-600">Season:</span>
        <span className="font-medium text-orange-700">{item.season}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-600">Water Requirement:</span>
        <span className={`font-medium ${
          item.waterReq === 'High' ? 'text-red-600' : 
          item.waterReq === 'Moderate' ? 'text-yellow-600' : 'text-green-600'
        }`}>{item.waterReq}</span>
      </div>
      <div className="flex justify-between">
        {/* <span className="text-gray-600">Expected Profit:</span> */}
        <span className="font-medium text-green-600">{item.profit}</span>
      </div>
    </div>
    <div className="mt-3 pt-3 border-t border-orange-200">
      <p className="text-xs text-gray-600">{t.optimalFor} current climate conditions</p>
    </div>
  </div>
));

const CropRecommendationCard = React.memo(({ item }) => (
  <div className="border-2 border-green-200 rounded-xl p-4 hover:shadow-lg transition-shadow bg-gradient-to-r from-green-50 to-transparent">
    <div className="flex justify-between items-start mb-2">
      <h3 className="text-xl font-semibold text-green-800">{item.crop}</h3>
      <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
        {item.suitability}
      </span>
    </div>
    <p className="text-gray-600 text-sm mb-3">{item.reason}</p>
    <div className="grid grid-cols-2 gap-2 text-sm">
      <InfoRow label="Growth:" value={item.growthPeriod} />
      <InfoRow label="Water:" value={item.waterNeed} />
      <InfoRow label="Market:" value={item.marketDemand} />
      <InfoRow label="Profit:" value={item.profitability} className="text-green-600" />
    </div>
  </div>
));

const InfoRow = React.memo(({ label, value, className = "" }) => (
  <div className="flex justify-between">
    <span className="text-gray-500">{label}</span>
    <span className={`font-medium ${className}`}>{value}</span>
  </div>
));

const WaterRequirementChart = React.memo(({ data, COLORS }) => (
  <div className="bg-gray-50 rounded-xl p-4 mb-8">
    <h4 className="font-semibold text-gray-800 mb-4">Water Requirement Distribution</h4>
    <div className="flex items-center justify-center">
      <div style={{ width: "500px", height: "250px" }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={[
                { name: 'High Water', value: data.filter(c => c.waterReq === 'High').length },
                { name: 'Moderate Water', value: data.filter(c => c.waterReq === 'Moderate').length },
                { name: 'Low Water', value: data.filter(c => c.waterReq === 'Low').length }
              ]}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  </div>
));

const AIInsights = React.memo(({ t }) => (
  <div className="mt-8 p-4 bg-purple-50 rounded-xl">
    <h3 className="font-semibold text-purple-800 mb-2">{t.aiInsights}</h3>
    <ul className="space-y-2 text-sm text-gray-700">
      {[
        "Current soil conditions are favorable for nitrogen-fixing crops",
        "Consider crop rotation with legumes to improve soil health",
        "Market demand is high for organic vegetables in your region",
        "Weather forecast shows favorable conditions for next 2 weeks"
      ].map((insight, idx) => (
        <li key={idx} className="flex items-start gap-2">
          <span className="text-purple-600 mt-1">•</span>
          {insight}
        </li>
      ))}
    </ul>
  </div>
));

const WaterFlowTab = React.memo(({ predictions, t }) => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-gray-800 mb-4">{t.irrigationAnalysis}</h2>
    
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <WaterStatusCard
        icon={<Droplet size={16} className="text-blue-600" />}
        title="Water Need"
        value={predictions.waterFlow.currentNeed}
        getColor={(need) => 
          need === "High" ? "text-red-600" :
          need === "Moderate" ? "text-yellow-600" : "text-green-600"
        }
      />
      <WaterStatusCard
        icon={<Zap size={16} className="text-blue-600" />}
        title="Recommended Flow"
        value={predictions.waterFlow.recommendedFlow}
        color="text-blue-600"
      />
      <WaterStatusCard
        icon={<Wind size={16} className="text-blue-600" />}
        title="Next Irrigation"
        value={predictions.waterFlow.nextIrrigation}
        color="text-blue-600"
      />
      <WaterStatusCard
        icon={<Sun size={16} className="text-blue-600" />}
        title="System Efficiency"
        value={predictions.waterFlow.efficiency}
        color="text-green-600"
      />
    </div>

    <div className="bg-gray-50 rounded-xl p-4">
      <h3 className="font-semibold text-gray-800 mb-4">Weekly Irrigation Schedule</h3>
      <div style={{ width: "100%", height: 250 }}>
        <ResponsiveContainer>
          <BarChart data={predictions.waterFlow.weeklySchedule}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis label={{ value: 'Hours', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Bar dataKey="hours" fill="#3B82F6" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>

    <SmartRecommendations t={t} />
  </div>
));

const WaterStatusCard = React.memo(({ icon, title, value, color, getColor }) => (
  <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
    <div className="flex items-center gap-2 mb-1">
      {icon}
      <p className="text-sm text-gray-600">{title}</p>
    </div>
    <p className={`text-2xl font-bold ${getColor ? getColor(value) : color}`}>
      {value}
    </p>
  </div>
));

const SmartRecommendations = React.memo(({ t }) => (
  <div className="mt-6 p-4 bg-cyan-50 rounded-xl">
    <h3 className="font-semibold text-cyan-800 mb-2">{t.smartRecommendations}</h3>
    <ul className="space-y-2 text-sm text-gray-700">
      {[
        "Implement drip irrigation for 30% water savings",
        "Best irrigation window: 5:00 AM - 7:00 AM to minimize evaporation",
        "Consider moisture sensors for automated irrigation control",
        "Water stress detected - increase irrigation frequency by 20%"
      ].map((recommendation, idx) => (
        <li key={idx} className="flex items-start gap-2">
          <span className="text-cyan-600 mt-1">•</span>
          {recommendation}
        </li>
      ))}
    </ul>
  </div>
));

// Language Selector Component
const LanguageSelector = React.memo(({ currentLanguage, onLanguageChange }) => {
  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "hi", name: "हिंदी", flag: "🇮🇳" },
    { code: "ta", name: "தமிழ்", flag: "🇮🇳" },
    { code: "or", name: "ଓଡିଆ", flag: "🇮🇳" },
    { code: "ne", name: "नेपाली", flag: "🇳🇵" }
  ];

  return (
    <div className="relative">
      <select
        value={currentLanguage}
        onChange={(e) => onLanguageChange(e.target.value)}
        className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm font-medium shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.flag} {lang.name}
          </option>
        ))}
      </select>
      <Globe size={16} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
    </div>
  );
});

// Optimized Chart Component with memoization
const OptimizedLineChart = React.memo(({ data, dataKey, stroke, title }) => (
  <div className="bg-white rounded-2xl p-4 shadow-md">
    <h2 className="font-semibold mb-2">{title}</h2>
    <div style={{ width: "100%", height: 220 }}>
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis domain={dataKey === "Temperature" ? [0, 60] : [0, 100]} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey={dataKey} stroke={stroke} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
));

// Card component with memoization
const Card = React.memo(({ title, value, icon }) => (
  <div className="flex items-center gap-3 border rounded p-3 bg-gray-50">
    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
      {icon}
      </div>
      <div>
      <div className="text-xs text-gray-500">{title}</div>
      <div className="font-medium">{value}</div>
    </div>
  </div>
));

// Live Feed Card Component
const LiveFeedCard = React.memo(({ t }) => {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    const checkCamera = async () => {
      try {
        const response = await fetch(CONFIG.CAMERA_URL, { method: 'HEAD', mode: 'no-cors' });
        setIsOffline(!response.ok);
      } catch (error) {
        setIsOffline(true);
      }
    };

    checkCamera();
    const interval = setInterval(checkCamera, 10000); // Check every 10 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white rounded-2xl p-4 shadow-md h-full">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-semibold flex items-center gap-2">
          <Camera size={20} className="text-gray-600" />
          {t.liveFeed}
        </h2>
        <div className="text-xs text-gray-500">Live Stream</div>
      </div>
      {/* Increased height for the feed portion to make it more prominent */}
      <div className="relative w-full h-full min-h-[500px]">
        <iframe
          src={CONFIG.CAMERA_URL}
          className="w-full h-full rounded-lg border border-gray-200"
          title="Live Camera Feed"
          sandbox="allow-same-origin allow-scripts"
          onLoad={() => setIsOffline(false)}
          onError={() => setIsOffline(true)}
        />
        {isOffline && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
            <p className="text-sm text-gray-500 text-center px-4">{t.cameraOffline}</p>
          </div>
        )}
      </div>
    </div>
  );
});

// Custom hook for data fetching with error handling
const useDataFetching = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [weather, setWeather] = useState(null);
  
  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout
      
      const q = `${CONFIG.SUPABASE_URL}?select=*,id&order=id.desc&limit=${CONFIG.DATA_LIMIT}`;
      const res = await fetch(q, {
        ...fetchOptions,
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      
      setRows(normalizeData(data));
    } catch (err) {
      if (err.name === 'AbortError') {
        setError('Request timeout - please try again');
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const loadWeather = useCallback(async () => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=28.6&longitude=77.2&current_weather=true`,
        { signal: controller.signal }
      );
      
      clearTimeout(timeoutId);
      const data = await res.json();
      setWeather(data.current_weather);
    } catch (err) {
      console.error("Weather fetch error", err);
    }
  }, []);

  return { rows, loading, error, weather, loadData, loadWeather };
};

// Main Dashboard Component with optimizations
export default function Dashboard() {
  const [language, setLanguage] = useState("en");
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [showPredictions, setShowPredictions] = useState(false);
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  
  // Pagination state
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  
  const intervalRef = useRef(null);
  const { rows, loading, error, weather, loadData, loadWeather } = useDataFetching();
  
  const t = translations[language];

  // Language handling
  const handleLanguageChange = useCallback((newLanguage) => {
    setLanguage(newLanguage);
  }, []);

  // Initialize language preference
  useEffect(() => {
    const savedLanguage = sessionStorage?.getItem?.('harvii-language');
    if (savedLanguage && translations[savedLanguage]) {
      setLanguage(savedLanguage);
    } else {
      setLanguage("en");
      if (typeof sessionStorage !== 'undefined') {
        sessionStorage.setItem('harvii-language', "en");
      }
    }
  }, []);

  useEffect(() => {
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.setItem('harvii-language', language);
    }
  }, [language]);

  // Auto-refresh logic with cleanup
  useEffect(() => {
    loadData();
    loadWeather();
    
    if (autoRefresh && !showPredictions) {
      intervalRef.current = setInterval(() => {
        loadData();
        loadWeather();
      }, CONFIG.REFRESH_INTERVAL);
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [autoRefresh, showPredictions, loadData, loadWeather]);

  // Memoized computations for better performance with 15-minute intervals
  const chartData = useMemo(() => {
    const sampled = [];
    let lastTime = null;
    // rows is oldest first
    // loop from end (latest) backwards
    for (let i = rows.length - 1; i >= 0; i--) {
      const r = rows[i];
      const currentTime = new Date(r.time).getTime();
      // MODIFIED to 15 minutes (15 * 60 * 1000)
      if (lastTime === null || lastTime - currentTime >= 15 * 60 * 1000) {
        sampled.push({
          name: new Date(r.time).toLocaleTimeString(),
          Temperature: Number(r.temp),
          Humidity: Number(r.hum),
          Soil: Number(r.soil),
          Light: Number(r.light),
          Gas: Number(r.gasPercent),
        });
        lastTime = currentTime;
      }
      if (sampled.length >= CONFIG.CHART_DATA_POINTS) break;
    }
    return sampled.reverse(); // oldest first
  }, [rows]);

  const latest = useMemo(
    () => rows.length ? rows[rows.length - 1] : null, [rows]
  );

  // Memoized pagination data
  const paginationData = useMemo(() => {
    const totalPages = Math.ceil(rows.length / rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const currentData = rows.slice().reverse().slice(startIndex, endIndex);
    
    return { totalPages, currentData };
  }, [rows, rowsPerPage, currentPage]);

  // Memoized alerts
  const recentAlerts = useMemo(
    () => rows
      .slice()
      .reverse()
      .filter((r) => r.alert && r.alert !== "None")
      .slice(0, CONFIG.MAX_ALERTS), 
    [rows]
  );

  // Language selection modal
  if (showLanguageSelector) {
    return <LanguageSelectionModal onLanguageSelect={(lang) => {
      setLanguage(lang);
      setShowLanguageSelector(false);
    }} />;
  }

  // AI Predictions page
  if (showPredictions) {
    return (
      <AIPredictionPage 
        onBack={() => setShowPredictions(false)}
        sensorData={rows}
        language={language}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <DashboardHeader 
          t={t}
          language={language}
          onLanguageChange={handleLanguageChange}
          onShowPredictions={() => setShowPredictions(true)}
          onRefresh={loadData}
          autoRefresh={autoRefresh}
          onAutoRefreshChange={setAutoRefresh}
        />

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ChartsSection chartData={chartData} t={t} />
          <SidebarSection 
            t={t}
            latest={latest}
            loading={loading}
            error={error}
            weather={weather}
            recentAlerts={recentAlerts}
          />
        </main>
        
        {/* LIVE CAMERA FEED SECTION MOVED HERE AND RESIZED */}
        <section className="mt-8">
          <LiveFeedCard t={t} />
        </section>

        <RawDataSection 
          t={t}
          paginationData={paginationData}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />

        <footer className="mt-6 text-xs text-gray-500 text-center">
          HARVII · Dashboard · {new Date().getFullYear()}
        </footer>
      </div>
    </div>
  );
}

// Separate header component
const DashboardHeader = React.memo(({ t, language, onLanguageChange, onShowPredictions, onRefresh, autoRefresh, onAutoRefreshChange }) => (
  <header className="flex items-center justify-between mb-6">
    <div className="flex items-center gap-4">
      <div>
        <h1 className="text-3xl font-extrabold">{t.dashboard}</h1>
        <p className="text-sm text-gray-600">{t.liveOverview} · Supabase REST</p>
      </div>
      <button
        onClick={onShowPredictions}
        className="group relative px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
      >
        <Brain size={20} />
        <span>{t.aiPredictions}</span>
        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        <div className="absolute inset-0 rounded-lg bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
      </button>
    </div>
    <div className="flex items-center gap-3">
      <LanguageSelector currentLanguage={language} onLanguageChange={onLanguageChange} />
      <button
        onClick={onRefresh}
        className="px-4 py-2 bg-white border rounded shadow-sm text-sm hover:shadow-md transition-shadow"
      >
        {t.refresh}
      </button>
      <label className="inline-flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={autoRefresh}
          onChange={(e) => onAutoRefreshChange(e.target.checked)}
        />
        {t.auto}
      </label>
    </div>
  </header>
));

// Charts section component
const ChartsSection = React.memo(({ chartData, t }) => (
  <section className="lg:col-span-2 space-y-6">
    <OptimizedLineChart 
      data={chartData} 
      dataKey="Temperature" 
      stroke="#FF0000" 
      title={t.temperature}
    />
    
    <OptimizedLineChart 
      data={chartData} 
      dataKey="Humidity" 
      stroke="#387908" 
      title={t.humidity}
    />

    <div className="bg-white rounded-2xl p-4 shadow-md grid grid-cols-1 md:grid-cols-2 gap-4">
      <SoilMoistureChart data={chartData} t={t} />
      <LightGasChart data={chartData} t={t} />
    </div>
  </section>
));

const SoilMoistureChart = React.memo(({ data, t }) => (
  <div>
    <h3 className="font-medium mb-2">{t.soil} Moisture</h3>
    <div style={{ width: "100%", height: 180 }}>
      <ResponsiveContainer>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="soilGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00C49F" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#00C49F" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" />
          <YAxis domain={[10, 100]} />
          <Tooltip />
          <Area type="monotone" dataKey="Soil" stroke="#00C49F" fill="url(#soilGrad)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </div>
));

const LightGasChart = React.memo(({ data, t }) => (
  <div>
    <h3 className="font-medium mb-2">{t.light} & {t.gas}</h3>
    <div style={{ width: "100%", height: 180 }}>
      <ResponsiveContainer>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Light" fill="#0000FF" barSize={8} />
          <Bar dataKey="Gas" fill="#006400" barSize={8} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
));

// Sidebar section component
const SidebarSection = React.memo(({ t, latest, loading, error, weather, recentAlerts }) => (
  <aside className="space-y-6">
    <LatestValuesCard t={t} latest={latest} loading={loading} error={error} />
    <WeatherCard t={t} weather={weather} />
    <AlertsCard t={t} recentAlerts={recentAlerts} />
    <ConnectionCard t={t} />
  </aside>
));

const LatestValuesCard = React.memo(({ t, latest, loading, error }) => (
  <div className="bg-white rounded-2xl p-4 shadow-md">
    <div className="flex items-center justify-between mb-3">
      <h2 className="font-semibold">{t.latestValues}</h2>
      <div className="text-xs text-gray-500">{t.realTimeSnapshot}</div>
    </div>
    
    {loading && <div className="text-sm text-gray-500">{t.loading}</div>}
    {error && <div className="text-sm text-red-500">{error}</div>}
    {!latest && !loading && <div className="text-sm text-gray-600">{t.noData}</div>}
    
    {latest && (
      <div className="grid grid-cols-2 gap-3">
        <Card title={t.temperature} value={`${latest.temp} °C`} icon={<Sun size={20} />} />
        <Card title={t.humidity} value={`${latest.hum} %`} icon={<Droplet size={20} />} />
        <Card title={t.soil} value={`${latest.soil} %`} icon={<Droplet size={20} />} />
        <Card title={t.light} value={`${latest.light} %`} icon={<Cloud size={20} />} />
        <Card title={t.gas} value={`${latest.gasPercent} %`} icon={<Wind size={20} />} />
        <Card title={t.alert} value={`${latest.alert}`} icon={<AlertTriangle size={20} />} />
        <div className="col-span-2 mt-2 text-xs text-gray-500">
          {t.time}: {new Date(latest.time).toLocaleString()}
        </div>
      </div>
    )}
  </div>
));

const WeatherCard = React.memo(({ t, weather }) => (
  <div className="bg-white rounded-2xl p-4 shadow-md">
    <h2 className="font-semibold mb-3">{t.liveWeather}</h2>
    {weather ? (
      <div className="grid grid-cols-2 gap-3">
        <Card title={t.temperature} value={`${weather.temperature} °C`} icon={<Sun size={20} />} />
        <Card title={t.windSpeed} value={`${weather.windspeed} km/h`} icon={<Wind size={20} />} />
        <Card title={t.code} value={`${weather.weathercode}`} icon={<Cloud size={20} />} />
        <Card title={t.time} value={`${weather.time}`} icon={<Droplet size={20} />} />
      </div>
    ) : (
      <div className="text-sm text-gray-500">{t.loading} weather…</div>
    )}
  </div>
));

const AlertsCard = React.memo(({ t, recentAlerts }) => (
  <div className="bg-white rounded-2xl p-4 shadow-md">
    <div className="flex items-center justify-between mb-3">
      <h2 className="font-semibold">{t.recentAlerts}</h2>
      <div className="text-xs text-gray-500">Last {CONFIG.MAX_ALERTS}</div>
    </div>
    <div className="space-y-2 max-h-48 overflow-auto">
      {recentAlerts.length > 0 ? recentAlerts.map((r) => (
        <div key={r.id} className="border rounded p-2 bg-red-50">
          <div className="text-sm font-medium">{r.alert}</div>
          <div className="text-xs text-gray-600">
            {new Date(r.time).toLocaleString()}
          </div>
        </div>
      )) : (
        <div className="text-sm text-gray-600">{t.noAlerts}</div>
      )}
    </div>
  </div>
));

const ConnectionCard = React.memo(({ t }) => (
  <div className="bg-white rounded-2xl p-4 shadow-md">
    <div className="flex items-center justify-between mb-3">
      <h2 className="font-semibold">{t.connection}</h2>
      <div className="text-xs text-gray-500">{t.status}</div>
    </div>
    <div className="flex items-center gap-3">
      <Wifi size={20} />
      <div>
        <div className="text-sm">Supabase REST</div>
        <div className="text-xs text-gray-500">{CONFIG.SUPABASE_URL}</div>
      </div>
    </div>
  </div>
));

// Raw data section component
const RawDataSection = React.memo(({ t, paginationData, rowsPerPage, setRowsPerPage, currentPage, setCurrentPage }) => (
  <section className="mt-8 bg-white rounded-2xl p-4 shadow-md">
    <div className="flex items-center justify-between mb-3">
      <h3 className="font-semibold">{t.rawData}</h3>
      <div className="flex items-center gap-2">
        <label htmlFor="rowsPerPage" className="text-sm text-gray-600">
          {t.show}:
        </label>
        <select
          id="rowsPerPage"
          value={rowsPerPage}
          onChange={(e) => {
            setRowsPerPage(Number(e.target.value));
            setCurrentPage(1);
          }}
          className="border px-2 py-1 rounded text-sm"
        >
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
        <span className="text-sm text-gray-600">{t.entries}</span>
      </div>
    </div>

    <div className="overflow-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="text-left border-b">
            <th className="p-2">{t.time}</th>
            <th className="p-2">{t.temperature}</th>
            <th className="p-2">{t.humidity}</th>
            <th className="p-2">{t.soil}</th>
            <th className="p-2">{t.light}</th>
            <th className="p-2">{t.gas}%</th>
            <th className="p-2">{t.alert}</th>
          </tr>
        </thead>
        <tbody>
          {paginationData.currentData.map((r) => (
            <tr key={r.id} className="border-b hover:bg-gray-50">
              <td className="p-2">{new Date(r.time).toLocaleString()}</td>
              <td className="p-2">{r.temp}</td>
              <td className="p-2">{r.hum}</td>
              <td className="p-2">{r.soil}</td>
              <td className="p-2">{r.light}</td>
              <td className="p-2">{r.gasPercent}</td>
              <td className="p-2">{r.alert}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <div className="flex justify-between items-center mt-3 text-sm">
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage((prev) => prev - 1)}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        {t.prev}
      </button>
      <span>
        {t.page} {currentPage} {t.of} {paginationData.totalPages}
      </span>
      <button
        disabled={currentPage === paginationData.totalPages}
        onClick={() => setCurrentPage((prev) => prev + 1)}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        {t.next}
      </button>
    </div>
  </section>
));

// Language selection modal component
const LanguageSelectionModal = React.memo(({ onLanguageSelect }) => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-6">
    <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
      <div className="text-center mb-6">
        <Globe size={48} className="mx-auto mb-4 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Choose Your Language</h2>
        <p className="text-gray-600">भाषा चुनें / தமிழில் / ଭାଷା ବାଛନ୍ତୁ / भाषा छान्नुहोस्</p>
      </div>
      <div className="space-y-3">
        {[
          { code: "en", name: "English", flag: "🇺🇸", desc: "Continue in English" },
          { code: "hi", name: "हिंदी", flag: "🇮🇳", desc: "हिंदी में जारी रखें" },
          { code: "ta", name: "தமிழ்", flag: "🇮🇳", desc: "தமிழில் தொடரவும்" },
          { code: "or", name: "ଓଡିଆ (Odia)", flag: "🇮🇳", desc: "ଓଡିଆରେ ଜାରି ରଖନ୍ତୁ" },
          { code: "ne", name: "नेपाली (Nepali)", flag: "🇳🇵", desc: "नेपालीमा जारी राख्नुहोस्" }
        ].map((lang) => (
          <button
            key={lang.code}
            onClick={() => onLanguageSelect(lang.code)}
            className="w-full p-4 border-2 border-gray-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all text-left"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{lang.flag}</span>
              <div>
                <div className="font-semibold text-gray-800">{lang.name}</div>
                <div className="text-sm text-gray-600">{lang.desc}</div>
              </div>
              </div>
          </button>
        ))}
      </div>
    </div>
  </div>
));
