'use client'; 
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

const GoogleAdsCalculator = () => {
  const [spend, setSpend] = useState(10000);
  const [cpc, setCpc] = useState(0.30);
  const [conversionRate, setConversionRate] = useState(20);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(value);
  };

  const logScaleSpend = (value) => {
    const minp = 0;
    const maxp = 100;
    const minv = Math.log(100);
    const maxv = Math.log(1000000);
    const scale = (maxv - minv) / (maxp - minp);
    return Math.exp(minv + scale * value);
  };

  const logScaleCpc = (value) => {
    const minp = 0;
    const maxp = 100;
    const minv = Math.log(0.01);
    const maxv = Math.log(100);
    const scale = (maxv - minv) / (maxp - minp);
    return Math.exp(minv + scale * value);
  };

  const inverseLogScaleSpend = (value) => {
    const minp = 0;
    const maxp = 100;
    const minv = Math.log(100);
    const maxv = Math.log(1000000);
    const scale = (maxv - minv) / (maxp - minp);
    return (Math.log(value) - minv) / scale;
  };

  const inverseLogScaleCpc = (value) => {
    const minp = 0;
    const maxp = 100;
    const minv = Math.log(0.01);
    const maxv = Math.log(100);
    const scale = (maxv - minv) / (maxp - minp);
    return (Math.log(value) - minv) / scale;
  };

  const sessions = Math.round(spend / cpc);
  const conversions = Math.round(sessions * (conversionRate / 100));
  const costPerInquiry = spend / conversions;

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen p-8">
      <Card className="w-full max-w-3xl mx-auto bg-gray-800 text-gray-100 border-gray-700 shadow-lg relative">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-gray-100">Google Ads Kosten-Rechner</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            <div>
              <Label htmlFor="spend" className="text-sm font-medium mb-2 block text-gray-300">Google Ads Ausgaben pro Monat</Label>
              <Slider
                id="spend"
                min={0}
                max={100}
                step={0.1}
                value={[inverseLogScaleSpend(spend)]}
                onValueChange={(value) => setSpend(Math.round(logScaleSpend(value[0])))}
                className="mt-2"
              />
              <div className="flex justify-between text-xs mt-1 text-gray-400">
                <span>100 €</span>
                <span>1.000.000 €</span>
              </div>
              <p className="text-lg font-semibold mt-2 text-gray-100">{formatCurrency(spend)}</p>
            </div>
            <div>
              <Label htmlFor="cpc" className="text-sm font-medium mb-2 block text-gray-300">Durchschnittliche Kosten pro Klick</Label>
              <Slider
                id="cpc"
                min={0}
                max={100}
                step={0.1}
                value={[inverseLogScaleCpc(cpc)]}
                onValueChange={(value) => setCpc(Number(logScaleCpc(value[0]).toFixed(2)))}
                className="mt-2"
              />
              <div className="flex justify-between text-xs mt-1 text-gray-400">
                <span>0,01 €</span>
                <span>100,00 €</span>
              </div>
              <p className="text-lg font-semibold mt-2 text-gray-100">{formatCurrency(cpc)}</p>
            </div>
            <div>
              <Label htmlFor="conversionRate" className="text-sm font-medium mb-2 block text-gray-300">Lead-Konversionsrate (%)</Label>
              <Slider
                id="conversionRate"
                min={1}
                max={100}
                step={1}
                value={[conversionRate]}
                onValueChange={(value) => setConversionRate(value[0])}
                className="mt-2"
              />
              <div className="flex justify-between text-xs mt-1 text-gray-400">
                <span>1%</span>
                <span>100%</span>
              </div>
              <p className="text-lg font-semibold mt-2 text-gray-100">{conversionRate}%</p>
            </div>
          </div>

          <div className="mt-12">
            <h3 className="text-xl font-semibold mb-6 text-gray-100">Google Ads Lead-Metriken</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-gray-700 border-gray-600">
                <CardContent className="pt-6">
                  <p className="text-sm text-gray-300">Gesamte Website-Besuche von Google Ads</p>
                  <p className="text-2xl font-bold mt-2 text-gray-100">{sessions.toLocaleString('de-DE')}</p>
                </CardContent>
              </Card>
              <Card className="bg-gray-700 border-gray-600">
                <CardContent className="pt-6">
                  <p className="text-sm text-gray-300">Konversionen/Leads/Anfragen</p>
                  <p className="text-2xl font-bold mt-2 text-gray-100">{conversions.toLocaleString('de-DE')}</p>
                </CardContent>
              </Card>
              <Card className="bg-gray-700 border-gray-600">
                <CardContent className="pt-6">
                  <p className="text-sm text-gray-300">Kosten pro Anfrage</p>
                  <p className="text-2xl font-bold mt-2 text-gray-100">{formatCurrency(costPerInquiry)}</p>
                </CardContent>
              </Card>
            </div>
          </div>

          <button 
            className="w-full mt-12 text-white font-semibold py-2 px-4 rounded"
            onClick={() => window.open('https://calendly.com/patrick-klickkultur', '_blank')}
            style={{
              background: 'linear-gradient(to top right, #f47889, #fd9019)',
              transition: 'opacity 0.3s ease',
            }}
            onMouseEnter={(e) => e.target.style.opacity = '0.9'}
            onMouseLeave={(e) => e.target.style.opacity = '1'}
          >
            Kostenloses Strategie-Gespräch mit Patrick
          </button>

          <p className="text-sm text-center mt-4 text-gray-400">
            In 15 Minuten analysiert Patrick Ihre Google Ads Kampagne und zeigt Ihnen, wie Sie Ihre Ergebnisse verbessern können - unverbindlich und maßgeschneidert für Ihr Unternehmen.
          </p>
        </CardContent>
        <CardFooter className="flex justify-end mt-8">
          <a href="https://klickkultur.de" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-gray-200 transition-colors">
            made by KlickKultur
          </a>
        </CardFooter>
      </Card>
    </div>
  );
};

export default GoogleAdsCalculator;

