import React, { useState, useEffect } from 'react';

const VoiceTranslator = () => {
  const [customText, setCustomText] = useState('');
  const [speechRate, setSpeechRate] = useState(0.9);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);

  // 實用英語短句資料庫
  const phrasesDatabase = [
    // 點餐與餐廳
    { cat: 'dining', en: "Table for four, please.", zh: "我們有四位，請問有位置嗎？" },
    { cat: 'dining', en: "Could we have the menu, please?", zh: "可以麻煩給我們菜單嗎？" },
    { cat: 'dining', en: "What do you recommend here?", zh: "請問這裡有什麼推薦的招牌菜？" },
    { cat: 'dining', en: "Does this dish contain beef or lamb?", zh: "請問這道菜含有牛肉或羊肉嗎？" },
    { cat: 'dining', en: "Could we get the bill, please? Separate checks if possible.", zh: "麻煩買單，請問可以分開付嗎？" },
    { cat: 'dining', en: "Can I have a glass of tap water, please?", zh: "請給我一杯免費的自來水/飲用水。" },
    
    // 退稅與購物
    { cat: 'shopping', en: "Can I get a TRS tax refund invoice for this purchase?", zh: "請問這筆消費可以開具 TRS 澳洲退稅發票嗎？" },
    { cat: 'shopping', en: "Is there any discount if we buy more?", zh: "如果我們買比較多的話有折扣嗎？" },
    { cat: 'shopping', en: "Can I pay by credit card / Apple Pay?", zh: "可以用信用卡或 Apple Pay 結帳嗎？" },
    { cat: 'shopping', en: "Where is the TRS tax refund counter at Sydney Airport?", zh: "請問雪梨機場的 TRS 退稅櫃檯在哪裡？" },

    // 加油與自駕
    { cat: 'driving', en: "Unleaded 91, full tank please on Pump 3.", zh: "3 號加油槍，請幫我加滿 91 無鉛汽油。" },
    { cat: 'driving', en: "Where can I pay for fuel?", zh: "請問加油費用要在哪裡付款？" },
    { cat: 'driving', en: "Is parking free here, or do I need to pay at the meter?", zh: "請問這裡停車免費嗎？還是需要去繳費機付費？" },
    { cat: 'driving', en: "Excuse me, how do I get to the Blue Mountains Motorway?", zh: "請問要怎麼走才能上前往藍山的高速公路？" },

    // 交通與問路
    { cat: 'transit', en: "How much is an Opal card, and where can I top it up?", zh: "一張 Opal 卡多少錢？要去哪裡加值？" },
    { cat: 'transit', en: "Which platform goes to Circular Quay?", zh: "請問哪一個月台是開往環形碼頭 (Circular Quay) 的？" },
    { cat: 'transit', en: "Does this train go directly to Sydney Central Station?", zh: "這班火車有直達雪梨中央車站嗎？" },

    // 住宿 Check-in
    { cat: 'hotel', en: "Hi, I have a reservation under the name of Ziv.", zh: "你好，我有預約訂房，名字是 Ziv。" },
    { cat: 'hotel', en: "Can we leave our luggage here before check-in?", zh: "在辦理入住前，可以先寄放我們的行李嗎？" },
    { cat: 'hotel', en: "What is the Wi-Fi password, please?", zh: "請問 Wi-Fi 密碼是多少？" }
  ];

  // 播放語音
  const handleSpeak = (text) => {
    if (!('speechSynthesis' in window)) {
      alert('您的瀏覽器不支援 Web Speech 語音發音');
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-AU';
    utterance.rate = speechRate;

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    window.speechSynthesis.speak(utterance);
  };

  // 停止播放
  const handleStop = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    }
  };

  // 複製文字
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert('已複製：\n' + text);
  };

  // 過濾短句
  const filteredPhrases = phrasesDatabase.filter(item => {
    const matchCat = activeCategory === 'all' || item.cat === activeCategory;
    const matchSearch =
      item.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.zh.includes(searchQuery);
    return matchCat && matchSearch;
  });

  return (
    <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 space-y-6">
      {/* 標題 */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="bg-sky-50 text-sky-600 p-2.5 rounded-2xl">
            <i className="fa-solid fa-language text-xl"></i>
          </div>
          <div>
            <h3 className="text-base font-black text-slate-800">語音翻譯與對話助手</h3>
            <p className="text-xs text-slate-400">Web Speech API 英語發音與日常用語</p>
          </div>
        </div>
      </div>

      {/* 自由輸入即時發音 (Text-to-Speech) */}
      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/60 space-y-3">
        <label className="text-xs font-bold text-slate-600 flex items-center justify-between">
          <span><i className="fa-solid fa-keyboard text-sky-500 mr-1.5"></i>自訂文字即時朗讀</span>
          <span className="text-[10px] text-slate-400">en-AU (澳洲語音)</span>
        </label>
        
        <div className="flex gap-2">
          <input
            type="text"
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            placeholder="輸入任何英文句子 (例如: Where is the restroom?)"
            className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-sky-500 bg-white"
          />
          {isPlaying ? (
            <button
              onClick={handleStop}
              className="bg-rose-500 hover:bg-rose-600 text-white px-3 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1"
            >
              <i className="fa-solid fa-square"></i> 停止
            </button>
          ) : (
            <button
              onClick={() => customText && handleSpeak(customText)}
              disabled={!customText.trim()}
              className="bg-sky-600 hover:bg-sky-700 disabled:opacity-50 text-white px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1 shadow-sm"
            >
              <i className="fa-solid fa-volume-high"></i> 發音
            </button>
          )}
        </div>

        {/* 語速控制 */}
        <div className="flex items-center gap-3 pt-1">
          <span className="text-[10px] font-bold text-slate-500">語速 ({speechRate}x):</span>
          <input
            type="range"
            min="0.6"
            max="1.2"
            step="0.1"
            value={speechRate}
            onChange={(e) => setSpeechRate(parseFloat(e.target.value))}
            className="w-28 accent-sky-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg"
          />
        </div>
      </div>

      {/* 日常用語快查庫 (Phrases Library) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold text-slate-700 flex items-center gap-1">
            <i className="fa-solid fa-book-open text-sky-500"></i> 雪梨旅遊常用對話庫
          </h4>
          <span className="text-[10px] font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded-full">
            共 {filteredPhrases.length} 句
          </span>
        </div>

        {/* 搜尋框 */}
        <div className="relative">
          <i className="fa-solid fa-magnifying-glass absolute left-3 top-2.5 text-xs text-slate-400"></i>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="搜尋中英文關鍵字 (例如: 菜單, Opal, refund)..."
            className="w-full pl-8 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-sky-500 bg-slate-50/50"
          />
        </div>

        {/* 分類按鈕 */}
        <div className="flex space-x-1.5 overflow-x-auto pb-1 hide-scrollbar">
          {[
            { id: 'all', label: '全部' },
            { id: 'dining', label: '🥐 點餐' },
            { id: 'shopping', label: '🛒 退稅購物' },
            { id: 'driving', label: '⛽ 加油自駕' },
            { id: 'transit', label: '🚌 交通' },
            { id: 'hotel', label: '🏨 住宿' }
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex-none px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all ${
                activeCategory === cat.id
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* 卡片清單 */}
        <div className="space-y-2.5 pt-1">
          {filteredPhrases.map((phrase, idx) => (
            <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 hover:bg-sky-50/50 border border-slate-100 transition space-y-1.5">
              <div className="flex justify-between items-start gap-2">
                <p className="text-xs font-bold text-slate-800 leading-snug">{phrase.en}</p>
                <div className="flex gap-1 flex-shrink-0">
                  <button
                    onClick={() => handleSpeak(phrase.en)}
                    className="p-1.5 bg-white text-sky-600 hover:bg-sky-600 hover:text-white rounded-lg text-xs shadow-sm transition"
                    title="朗讀發音"
                  >
                    <i className="fa-solid fa-volume-high"></i>
                  </button>
                  <button
                    onClick={() => handleCopy(phrase.en)}
                    className="p-1.5 bg-white text-slate-500 hover:bg-slate-700 hover:text-white rounded-lg text-xs shadow-sm transition"
                    title="複製"
                  >
                    <i className="fa-regular fa-copy"></i>
                  </button>
                </div>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">{phrase.zh}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VoiceTranslator;
