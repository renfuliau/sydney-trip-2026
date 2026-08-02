import React, { useState } from 'react';

const SosSection = () => {
  const [activeTab, setActiveTab] = useState('food'); // 'food' | 'medical'
  const [selectedPerson, setSelectedPerson] = useState('ziv'); // 'linle' | 'ziv' | 'jan'

  // 語音發音函數
  const speakText = (text) => {
    if (!('speechSynthesis' in window)) {
      alert('您的瀏覽器不支援語音合成功能');
      return;
    }
    window.speechSynthesis.cancel(); // 停止先前的發音
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-AU'; // 澳洲英語
    utterance.rate = 0.9;     // 稍微放慢速度
    window.speechSynthesis.speak(utterance);
  };

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    alert('已複製英文句子：\n' + text);
  };

  const emergencyPhrases = [
    {
      en: "Please call an ambulance immediately!",
      zh: "請立刻幫我叫救護車！",
      detail: "緊急情況急救使用"
    },
    {
      en: "I need to see a doctor right now.",
      zh: "我現在需要看醫生。",
      detail: "身體極度不適時使用"
    },
    {
      en: "Where is the nearest hospital emergency room?",
      zh: "請問最近的醫院急診室在哪裡？",
      detail: "詢問急診位置"
    },
    {
      en: "I am having a severe allergic reaction.",
      zh: "我有嚴重的過敏反應。",
      detail: "食物或藥物過敏時使用"
    },
    {
      en: "Do you have anyone here who speaks Chinese?",
      zh: "請問這裡有會說中文的人員嗎？",
      detail: "尋求語言協助"
    }
  ];

  return (
    <div className="space-y-5">
      {/* 頁面標題 */}
      <div className="text-center">
        <div className="inline-flex items-center bg-red-50 text-red-600 px-3 py-1 rounded-full text-xs font-bold mb-2 border border-red-100 shadow-sm">
          <i className="fa-solid fa-heart-pulse mr-1.5 animate-pulse"></i> SOS 緊急與醫療協助
        </div>
        <h2 className="text-2xl font-black text-slate-800">求助與翻譯中心</h2>
        <p className="text-xs text-slate-500 mt-1">遇到緊急狀況或用餐時，可直接展示此卡片</p>
      </div>

      {/* Tab 切換 */}
      <div className="flex bg-slate-200/70 p-1 rounded-2xl">
        <button
          onClick={() => setActiveTab('food')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'food'
              ? 'bg-white text-sky-700 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <i className="fa-solid fa-utensils"></i> 飲食需求翻譯卡
        </button>
        <button
          onClick={() => setActiveTab('medical')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'medical'
              ? 'bg-red-500 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <i className="fa-solid fa-hospital"></i> 醫療與緊急救援
        </button>
      </div>

      {/* Panel 1: 飲食需求 */}
      {activeTab === 'food' && (
        <div className="space-y-4 animate-[fadeIn_0.3s_ease-out]">
          {/* 人物選擇器 */}
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => setSelectedPerson('linle')}
              className={`flex flex-col items-center gap-1 py-3 px-2 rounded-2xl border-2 transition-all ${
                selectedPerson === 'linle'
                  ? 'border-emerald-500 bg-emerald-50 shadow-md'
                  : 'border-slate-100 bg-white text-slate-500'
              }`}
            >
              <span className="text-2xl">😊</span>
              <span className="text-xs font-black text-emerald-800">霖 & 樂</span>
              <span className="text-[10px] text-emerald-600 bg-emerald-100 px-1.5 py-0.5 rounded-full font-bold">無限制</span>
            </button>

            <button
              onClick={() => setSelectedPerson('ziv')}
              className={`flex flex-col items-center gap-1 py-3 px-2 rounded-2xl border-2 transition-all ${
                selectedPerson === 'ziv'
                  ? 'border-red-500 bg-red-50 shadow-md'
                  : 'border-slate-100 bg-white text-slate-500'
              }`}
            >
              <span className="text-2xl">🙅</span>
              <span className="text-xs font-black text-slate-800">Ziv</span>
              <span className="text-[10px] text-red-600 bg-red-100 px-1.5 py-0.5 rounded-full font-bold">牛・馬 NG</span>
            </button>

            <button
              onClick={() => setSelectedPerson('jan')}
              className={`flex flex-col items-center gap-1 py-3 px-2 rounded-2xl border-2 transition-all ${
                selectedPerson === 'jan'
                  ? 'border-red-500 bg-red-50 shadow-md'
                  : 'border-slate-100 bg-white text-slate-500'
              }`}
            >
              <span className="text-2xl">🙅</span>
              <span className="text-xs font-black text-slate-800">Jan</span>
              <span className="text-[10px] text-red-600 bg-red-100 px-1.5 py-0.5 rounded-full font-bold">牛・馬・羊 NG</span>
            </button>
          </div>

          {/* 卡片：霖 & 樂 */}
          {selectedPerson === 'linle' && (
            <div className="bg-white rounded-3xl shadow-lg border-2 border-emerald-400 overflow-hidden">
              <div className="bg-emerald-500 text-white py-2.5 px-4 text-center font-black text-base flex items-center justify-center">
                <i className="fa-solid fa-user-check mr-2"></i> 霖 & 樂 — 飲食無限制
              </div>
              <div className="p-5 text-center space-y-3">
                <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100">
                  <p className="text-lg font-black text-emerald-800">I have no dietary restrictions!</p>
                  <p class="text-xs text-emerald-600 mt-1">我沒有任何飲食限制，什麼都可以吃！</p>
                </div>
                <p className="text-xs text-slate-500">Beef, Pork, Lamb, Chicken, Seafood & Vegetables are all OK!</p>
                <div className="flex justify-center gap-2 pt-2">
                  <button
                    onClick={() => speakText("I have no dietary restrictions. Beef, Pork, Lamb, Chicken and Seafood are all OK.")}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-sm transition"
                  >
                    <i className="fa-solid fa-volume-high"></i> 朗讀發音
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 卡片：Ziv */}
          {selectedPerson === 'ziv' && (
            <div className="bg-white rounded-3xl shadow-lg border-2 border-red-500 overflow-hidden">
              <div className="bg-red-500 text-white py-2.5 px-4 text-center font-black text-base flex items-center justify-center">
                <i className="fa-solid fa-ban mr-2"></i> Ziv — Dietary Request
              </div>
              <div className="p-5 space-y-4">
                <div className="text-center">
                  <p className="text-sm font-bold text-slate-500">Excuse me, I cannot eat:</p>
                  <div className="bg-red-50 p-3 rounded-2xl border border-red-200 my-2">
                    <p className="text-2xl font-black text-red-600 tracking-wide">
                      BEEF & HORSE MEAT
                    </p>
                    <p className="text-xs text-red-500 font-bold mt-0.5">（我不吃牛肉與馬肉）</p>
                  </div>
                </div>

                <div className="bg-emerald-50 p-3 rounded-2xl border border-emerald-200 text-center">
                  <p className="text-xs font-bold text-emerald-800">
                    Pork, Chicken, <span className="text-emerald-700 underline font-black">Lamb/Mutton</span>, Seafood & Vegetables are OK!
                  </p>
                  <p className="text-[11px] text-emerald-600 mt-0.5">（豬肉、雞肉、羊肉、海鮮及蔬菜皆可以吃）</p>
                </div>

                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => speakText("Excuse me, I cannot eat beef or horse meat. Pork, chicken, lamb, and seafood are all fine.")}
                    className="bg-red-500 hover:bg-red-600 text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-sm transition"
                  >
                    <i className="fa-solid fa-volume-high"></i> 朗讀英文
                  </button>
                  <button
                    onClick={() => copyText("Excuse me, I cannot eat beef or horse meat. Pork, chicken, lamb, and seafood are fine.")}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1 transition"
                  >
                    <i className="fa-regular fa-copy"></i> 複製
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 卡片：Jan */}
          {selectedPerson === 'jan' && (
            <div className="bg-white rounded-3xl shadow-lg border-2 border-red-500 overflow-hidden">
              <div className="bg-red-500 text-white py-2.5 px-4 text-center font-black text-base flex items-center justify-center">
                <i className="fa-solid fa-ban mr-2"></i> Jan — Dietary Request
              </div>
              <div className="p-5 space-y-4">
                <div className="text-center">
                  <p className="text-sm font-bold text-slate-500">Excuse me, I cannot eat:</p>
                  <div className="bg-red-50 p-3 rounded-2xl border border-red-200 my-2">
                    <p className="text-2xl font-black text-red-600 tracking-wide">
                      BEEF, HORSE & LAMB
                    </p>
                    <p className="text-xs text-red-500 font-bold mt-0.5">（我不吃牛肉、馬肉及羊肉）</p>
                  </div>
                </div>

                <div className="bg-emerald-50 p-3 rounded-2xl border border-emerald-200 text-center">
                  <p className="text-xs font-bold text-emerald-800">
                    Pork, Chicken, Seafood & Vegetables are OK!
                  </p>
                  <p className="text-[11px] text-emerald-600 mt-0.5">（豬肉、雞肉、海鮮及蔬菜皆可以吃）</p>
                </div>

                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => speakText("Excuse me, I cannot eat beef, horse, or lamb. Pork, chicken, and seafood are fine.")}
                    className="bg-red-500 hover:bg-red-600 text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-sm transition"
                  >
                    <i className="fa-solid fa-volume-high"></i> 朗讀英文
                  </button>
                  <button
                    onClick={() => copyText("Excuse me, I cannot eat beef, horse, or lamb. Pork, chicken, and seafood are fine.")}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1 transition"
                  >
                    <i className="fa-regular fa-copy"></i> 複製
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Panel 2: 醫療與緊急救援 */}
      {activeTab === 'medical' && (
        <div className="space-y-4 animate-[fadeIn_0.3s_ease-out]">
          {/* 緊急求助電話按鈕 */}
          <div className="bg-gradient-to-br from-red-500 to-rose-600 rounded-3xl p-5 text-white shadow-lg relative overflow-hidden">
            <div className="absolute right-2 bottom-0 opacity-10 text-8xl">
              <i className="fa-solid fa-truck-medical"></i>
            </div>
            <p className="text-xs font-bold tracking-widest text-red-100 uppercase mb-1">Australia Emergency Line</p>
            <h3 className="text-3xl font-black mb-3">澳洲緊急求助專線</h3>
            <div className="flex gap-2">
              <a
                href="tel:000"
                className="flex-1 bg-white text-red-600 hover:bg-red-50 font-black py-3 rounded-2xl flex items-center justify-center gap-2 shadow-md transition text-lg"
              >
                <i className="fa-solid fa-phone text-xl"></i> 撥打 000 (免費)
              </a>
            </div>
            <p className="text-[11px] text-red-100 mt-2.5 leading-tight">
              包含警察 (Police)、救護車 (Ambulance)、消防隊 (Fire)。英文不通時可告知專員：<strong className="underline">"Mandarin, please"</strong> 請求中文翻譯。
            </p>
          </div>

          {/* 外交部駐雪梨辦事處 */}
          <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="bg-blue-50 text-blue-600 p-2 rounded-xl">
                  <i className="fa-solid fa-building-columns"></i>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800">駐雪梨台北經濟文化辦事處</h4>
                  <p className="text-[11px] text-slate-500">旅外國人緊急救助專線</p>
                </div>
              </div>
              <a
                href="tel:+61412284825"
                className="bg-blue-50 text-blue-600 hover:bg-blue-100 px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1"
              >
                <i className="fa-solid fa-phone"></i> 撥打
              </a>
            </div>
            <p className="text-xs font-mono bg-slate-50 p-2 rounded-xl text-slate-600">
              專線：+61-412-284-825 (澳洲境內撥 0412-284-825)
            </p>
          </div>

          {/* 雪梨核心醫院 */}
          <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100 space-y-3">
            <h4 className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
              <i className="fa-solid fa-hospital-user text-red-500"></i> 雪梨市區主要醫院 (Emergency Dept)
            </h4>

            {/* Sydney Hospital */}
            <div className="p-3 bg-slate-50 rounded-2xl space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-800">Sydney Hospital (市中心)</span>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Sydney+Hospital+8+Macquarie+St"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[10px] text-sky-600 bg-sky-50 px-2 py-0.5 rounded-md font-bold"
                >
                  <i className="fa-solid fa-map-location-dot mr-1"></i>地圖
                </a>
              </div>
              <p className="text-[11px] text-slate-500">8 Macquarie St, Sydney NSW 2000</p>
              <p className="text-[11px] text-slate-600 font-mono">Ph: (02) 9382 7111</p>
            </div>

            {/* St Vincent's Hospital */}
            <div className="p-3 bg-slate-50 rounded-2xl space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-800">St Vincent's Hospital</span>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=St+Vincents+Hospital+Darlinghurst"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[10px] text-sky-600 bg-sky-50 px-2 py-0.5 rounded-md font-bold"
                >
                  <i className="fa-solid fa-map-location-dot mr-1"></i>地圖
                </a>
              </div>
              <p className="text-[11px] text-slate-500">390 Victoria St, Darlinghurst NSW 2010</p>
              <p className="text-[11px] text-slate-600 font-mono">Ph: (02) 9355 2000</p>
            </div>
          </div>

          {/* 緊急求救對話卡 */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-400 ml-1">緊急醫藥對話大字卡 (發音/展示)</h4>
            {emergencyPhrases.map((phrase, idx) => (
              <div key={idx} className="bg-white p-3.5 rounded-2xl shadow-sm border border-slate-100 space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-bold text-slate-800">{phrase.en}</p>
                    <p className="text-xs text-sky-600 font-medium mt-0.5">{phrase.zh}</p>
                  </div>
                  <button
                    onClick={() => speakText(phrase.en)}
                    className="bg-sky-50 text-sky-600 hover:bg-sky-100 p-2 rounded-xl text-xs font-bold transition flex-shrink-0 ml-2"
                    title="朗讀語音"
                  >
                    <i className="fa-solid fa-volume-high"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SosSection;
