import { createContext, useContext, useEffect, useState } from 'react';
import staticCopy from '../data/copywriting';
import staticPortfolio, { categories } from '../data/portfolio';
import staticExperience from '../data/experience';
import staticTestimonials from '../data/testimonials';
import staticSkills from '../data/skills';
import staticAwards from '../data/awards';

const DataContext = createContext(null);

export function DataProvider({ children }) {
  const [copy, setCopy] = useState(staticCopy);
  const [portfolio, setPortfolio] = useState(staticPortfolio);
  const [experience, setExperience] = useState(staticExperience);
  const [testimonials, setTestimonials] = useState(staticTestimonials);
  const [skills, setSkills] = useState(staticSkills);
  const [awards, setAwards] = useState(staticAwards);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [pRes, eRes, tRes, pkRes, skRes, awRes, copyRes] = await Promise.allSettled([
          fetch('/api/portfolio').then(r => r.json()),
          fetch('/api/experience').then(r => r.json()),
          fetch('/api/testimonials').then(r => r.json()),
          fetch('/api/paket').then(r => r.json()),
          fetch('/api/skills').then(r => r.json()),
          fetch('/api/awards').then(r => r.json()),
          fetch('/api/settings/copywriting').then(r => r.json()),
        ]);

        if (pRes.status === 'fulfilled' && Array.isArray(pRes.value)) setPortfolio(pRes.value);
        if (eRes.status === 'fulfilled' && Array.isArray(eRes.value)) setExperience(eRes.value);
        if (tRes.status === 'fulfilled' && Array.isArray(tRes.value)) setTestimonials(tRes.value);
        if (skRes.status === 'fulfilled' && Array.isArray(skRes.value)) setSkills(skRes.value);
        if (awRes.status === 'fulfilled' && Array.isArray(awRes.value)) setAwards(awRes.value);

        let mergedCopy = { ...staticCopy };
        // copyRes.value is { key: "copywriting", value: {...} } from GET /api/settings/:key
        const copyData = copyRes.value?.value;
        if (copyRes.status === 'fulfilled' && copyData && typeof copyData === 'object') {
          mergedCopy = deepMerge(staticCopy, copyData);
        }
        if (pkRes.status === 'fulfilled' && Array.isArray(pkRes.value) && pkRes.value.length > 0) {
          mergedCopy = { ...mergedCopy, paket: { ...mergedCopy.paket, tiers: pkRes.value } };
        }
        setCopy(mergedCopy);
      } catch {}
    };
    fetchAll();
  }, []);

  return (
    <DataContext.Provider value={{ copy, portfolio, experience, testimonials, skills, awards, categories }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
}

function deepMerge(base, override) {
  if (!override || typeof override !== 'object') return base;
  const result = { ...base };
  for (const key of Object.keys(override)) {
    if (override[key] && typeof override[key] === 'object' && !Array.isArray(override[key]) && base[key] && typeof base[key] === 'object' && !Array.isArray(base[key])) {
      result[key] = deepMerge(base[key], override[key]);
    } else {
      result[key] = override[key];
    }
  }
  return result;
}
