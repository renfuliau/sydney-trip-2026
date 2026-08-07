import re

with open('d:\\Gemini科研\\2026-雪梨\\index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Accommodation
acc_old = """                        <!-- 連接線 -->
                        <div class="absolute left-[11px] top-2 bottom-2 w-0.5 bg-gray-100"></div>
                        
                        <li class="relative pl-6">
                            <div class="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-white border-4 border-indigo-100 flex items-center justify-center -ml-px">
                                <div class="w-2 h-2 rounded-full bg-indigo-500"></div>
                            </div>
                            <div class="flex justify-between items-start">
                                <div>
                                    <span class="text-xs font-bold text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded">D1-D2, D4, D8-D9</span>
                                    <p class="font-bold mt-1">Vicky 雪梨市區家</p>
                                    <p class="text-xs text-gray-500">雪梨市區 (共5晚)</p>
                                </div>
                            </div>
                        </li>
                        
                        <li class="relative pl-6">
                            <div class="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-white border-4 border-red-100 flex items-center justify-center -ml-px">
                                <div class="w-2 h-2 rounded-full bg-red-500"></div>
                            </div>
                            <div class="flex justify-between items-start">
                                <div>
                                    <span class="text-xs font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded">D3</span>
                                    <p class="font-bold mt-1">獵人谷度假村包棟</p>
                                    <p class="text-xs text-gray-500">Pokolbin 區 (1晚)</p>
                                </div>
                            </div>
                        </li>

                        <li class="relative pl-6">
                            <div class="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-white border-4 border-teal-100 flex items-center justify-center -ml-px">
                                <div class="w-2 h-2 rounded-full bg-teal-500"></div>
                            </div>
                            <div class="flex justify-between items-start">
                                <div>
                                    <span class="text-xs font-bold text-teal-600 bg-teal-50 px-2 py-0.5 rounded">D5</span>
                                    <p class="font-bold mt-1">Katoomba / Leura 公寓</p>
                                    <p class="text-xs text-gray-500">藍山國家公園 (1晚)</p>
                                </div>
                            </div>
                        </li>

                        <li class="relative pl-6">
                            <div class="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-white border-4 border-sky-100 flex items-center justify-center -ml-px">
                                <div class="w-2 h-2 rounded-full bg-sky-500"></div>
                            </div>
                            <div class="flex justify-between items-start">
                                <div>
                                    <span class="text-xs font-bold text-sky-500 bg-sky-50 px-2 py-0.5 rounded">D6-D7</span>
                                    <p class="font-bold mt-1">Kiama 海景公寓</p>
                                    <p class="text-xs text-gray-500">南部濱海 (連住2晚)</p>
                                </div>
                            </div>
                        </li>"""

acc_new = """                        <!-- 連接線 -->
                        <div class="absolute left-[11px] top-2 bottom-2 w-0.5 bg-gray-100"></div>
                        
                        <li class="relative pl-6">
                            <div class="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-white border-4 border-indigo-100 flex items-center justify-center -ml-px">
                                <div class="w-2 h-2 rounded-full bg-indigo-500"></div>
                            </div>
                            <div class="flex justify-between items-start">
                                <div>
                                    <span class="text-xs font-bold text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded">D1, D3, D5, D7-D9</span>
                                    <p class="font-bold mt-1">Vicky 雪梨家</p>
                                    <p class="text-xs text-gray-500">雪梨市區/Auburn (共6晚)</p>
                                </div>
                            </div>
                        </li>
                        
                        <li class="relative pl-6">
                            <div class="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-white border-4 border-teal-100 flex items-center justify-center -ml-px">
                                <div class="w-2 h-2 rounded-full bg-teal-500"></div>
                            </div>
                            <div class="flex justify-between items-start">
                                <div>
                                    <span class="text-xs font-bold text-teal-600 bg-teal-50 px-2 py-0.5 rounded">D2</span>
                                    <p class="font-bold mt-1">Kyah Boutique Hotel</p>
                                    <p class="text-xs text-gray-500">藍山 Katoomba (1晚)</p>
                                </div>
                            </div>
                        </li>
                        
                        <li class="relative pl-6">
                            <div class="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-white border-4 border-red-100 flex items-center justify-center -ml-px">
                                <div class="w-2 h-2 rounded-full bg-red-500"></div>
                            </div>
                            <div class="flex justify-between items-start">
                                <div>
                                    <span class="text-xs font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded">D4</span>
                                    <p class="font-bold mt-1">Bellevue House</p>
                                    <p class="text-xs text-gray-500">獵人谷 (1晚)</p>
                                </div>
                            </div>
                        </li>

                        <li class="relative pl-6">
                            <div class="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-white border-4 border-sky-100 flex items-center justify-center -ml-px">
                                <div class="w-2 h-2 rounded-full bg-sky-500"></div>
                            </div>
                            <div class="flex justify-between items-start">
                                <div>
                                    <span class="text-xs font-bold text-sky-500 bg-sky-50 px-2 py-0.5 rounded">D6</span>
                                    <p class="font-bold mt-1">Swell Kiama</p>
                                    <p class="text-xs text-gray-500">南部濱海 (1晚)</p>
                                </div>
                            </div>
                        </li>"""
content = content.replace(acc_old, acc_new)

# 2. Day Buttons
btn_old = """                <button onclick="showDay(1, this)" class="day-btn flex-none px-4 py-2.5 bg-primary text-white rounded-xl shadow-md text-sm font-bold transition-all">D1<span class="text-[10px] font-normal block opacity-80 mt-0.5">9/27</span></button>
                <button onclick="showDay(2, this)" class="day-btn flex-none px-4 py-2.5 bg-white text-gray-500 rounded-xl shadow-sm border border-gray-100 text-sm font-bold transition-all">D2<span class="text-[10px] font-normal block opacity-80 mt-0.5">9/28</span></button>
                <button onclick="showDay(3, this)" class="day-btn flex-none px-4 py-2.5 bg-white border border-red-200 text-red-500 rounded-xl shadow-sm text-sm font-bold transition-all">D3 🚗<span class="text-[10px] font-normal block opacity-80 mt-0.5">9/29 自駕</span></button>
                <button onclick="showDay(4, this)" class="day-btn flex-none px-4 py-2.5 bg-white border border-red-200 text-red-500 rounded-xl shadow-sm text-sm font-bold transition-all">D4 🚗<span class="text-[10px] font-normal block opacity-80 mt-0.5">9/30 自駕</span></button>
                <button onclick="showDay(5, this)" class="day-btn flex-none px-4 py-2.5 bg-white border border-red-200 text-red-500 rounded-xl shadow-sm text-sm font-bold transition-all">D5 🚗<span class="text-[10px] font-normal block opacity-80 mt-0.5">10/1 自駕</span></button>
                <button onclick="showDay(6, this)" class="day-btn flex-none px-4 py-2.5 bg-white border border-red-200 text-red-500 rounded-xl shadow-sm text-sm font-bold transition-all">D6 🚗<span class="text-[10px] font-normal block opacity-80 mt-0.5">10/2 自駕</span></button>
                <button onclick="showDay(7, this)" class="day-btn flex-none px-4 py-2.5 bg-white border border-red-200 text-red-500 rounded-xl shadow-sm text-sm font-bold transition-all">D7 🚗<span class="text-[10px] font-normal block opacity-80 mt-0.5">10/3 續住</span></button>
                <button onclick="showDay(8, this)" class="day-btn flex-none px-4 py-2.5 bg-white border border-red-200 text-red-500 rounded-xl shadow-sm text-sm font-bold transition-all">D8 🚗<span class="text-[10px] font-normal block opacity-80 mt-0.5">10/4 返城</span></button>
                <button onclick="showDay(9, this)" class="day-btn flex-none px-4 py-2.5 bg-white text-gray-500 rounded-xl shadow-sm border border-gray-100 text-sm font-bold transition-all">D9<span class="text-[10px] font-normal block opacity-80 mt-0.5">10/5</span></button>
                <button onclick="showDay(10, this)" class="day-btn flex-none px-4 py-2.5 bg-white text-gray-500 rounded-xl shadow-sm border border-gray-100 text-sm font-bold transition-all">D10<span class="text-[10px] font-normal block opacity-80 mt-0.5">10/6</span></button>"""

btn_new = """                <button onclick="showDay(1, this)" class="day-btn flex-none px-4 py-2.5 bg-primary text-white rounded-xl shadow-md text-sm font-bold transition-all">D1<span class="text-[10px] font-normal block opacity-80 mt-0.5">9/27</span></button>
                <button onclick="showDay(2, this)" class="day-btn flex-none px-4 py-2.5 bg-white border border-red-200 text-red-500 rounded-xl shadow-sm text-sm font-bold transition-all">D2 🚗<span class="text-[10px] font-normal block opacity-80 mt-0.5">9/28 自駕</span></button>
                <button onclick="showDay(3, this)" class="day-btn flex-none px-4 py-2.5 bg-white border border-red-200 text-red-500 rounded-xl shadow-sm text-sm font-bold transition-all">D3 🚗<span class="text-[10px] font-normal block opacity-80 mt-0.5">9/29 返城</span></button>
                <button onclick="showDay(4, this)" class="day-btn flex-none px-4 py-2.5 bg-white border border-red-200 text-red-500 rounded-xl shadow-sm text-sm font-bold transition-all">D4 🚗<span class="text-[10px] font-normal block opacity-80 mt-0.5">9/30 自駕</span></button>
                <button onclick="showDay(5, this)" class="day-btn flex-none px-4 py-2.5 bg-white border border-red-200 text-red-500 rounded-xl shadow-sm text-sm font-bold transition-all">D5 🚗<span class="text-[10px] font-normal block opacity-80 mt-0.5">10/1 返城</span></button>
                <button onclick="showDay(6, this)" class="day-btn flex-none px-4 py-2.5 bg-white border border-red-200 text-red-500 rounded-xl shadow-sm text-sm font-bold transition-all">D6 🚗<span class="text-[10px] font-normal block opacity-80 mt-0.5">10/2 自駕</span></button>
                <button onclick="showDay(7, this)" class="day-btn flex-none px-4 py-2.5 bg-white border border-red-200 text-red-500 rounded-xl shadow-sm text-sm font-bold transition-all">D7 🚗<span class="text-[10px] font-normal block opacity-80 mt-0.5">10/3 返城</span></button>
                <button onclick="showDay(8, this)" class="day-btn flex-none px-4 py-2.5 bg-white text-gray-500 rounded-xl shadow-sm border border-gray-100 text-sm font-bold transition-all">D8<span class="text-[10px] font-normal block opacity-80 mt-0.5">10/4</span></button>
                <button onclick="showDay(9, this)" class="day-btn flex-none px-4 py-2.5 bg-white text-gray-500 rounded-xl shadow-sm border border-gray-100 text-sm font-bold transition-all">D9<span class="text-[10px] font-normal block opacity-80 mt-0.5">10/5</span></button>
                <button onclick="showDay(10, this)" class="day-btn flex-none px-4 py-2.5 bg-white text-gray-500 rounded-xl shadow-sm border border-gray-100 text-sm font-bold transition-all">D10<span class="text-[10px] font-normal block opacity-80 mt-0.5">10/6</span></button>"""
content = content.replace(btn_old, btn_new)

# 3. Weather
w_old = """                    let locKey = 'sydney';
                    if (dayNum === 3) locKey = 'hunter';
                    else if (dayNum === 5) locKey = 'katoomba';
                    else if (dayNum === 6 || dayNum === 7) locKey = 'kiama';"""

w_new = """                    let locKey = 'sydney';
                    if (dayNum === 2) locKey = 'katoomba';
                    else if (dayNum === 4) locKey = 'hunter';
                    else if (dayNum === 6 || dayNum === 7) locKey = 'kiama';"""
content = content.replace(w_old, w_new)

# 4. Day 2 to Day 7 HTML
pattern = re.compile(r'<!-- Day 2 Content -->.*?<!-- Day 8 Content -->', re.DOTALL)
new_days = """<!-- Day 2 Content -->
            <div id="day-2" class="day-content mt-4 hidden">
                <div class="mb-4 flex items-center">
                    <div class="bg-teal-100 text-teal-600 p-2.5 rounded-xl mr-3 shadow-sm">
                        <i class="fa-solid fa-mountain-sun text-xl"></i>
                    </div>
                    <div>
                        <h2 class="text-lg font-bold text-dark">全員會合！直奔藍山與絕景夕陽</h2>
                        <p class="text-xs text-gray-500">Day 2: 9/28 (日)</p>
                    </div>
                </div>
                <div class="grid grid-cols-2 gap-3 mb-5">
                    <div class="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center">
                        <span class="text-[10px] text-gray-400 mb-0.5"><i class="fa-solid fa-bed mr-1"></i>住宿</span>
                        <span class="text-xs font-bold text-gray-700 leading-tight">Kyah Boutique Hotel</span>
                    </div>
                    <div class="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center">
                        <span class="text-[10px] text-gray-400 mb-0.5"><i class="fa-solid fa-wallet mr-1"></i>預算估計</span>
                        <span class="text-xs font-bold text-gray-700 leading-tight">依實際花費</span>
                    </div>
                </div>
                <div class="bg-white p-5 rounded-3xl shadow-sm border border-gray-100">
                    <div class="timeline-container">
                        <div class="timeline-item highlight">
                            <p class="text-xs font-bold text-primary tracking-widest mb-1">10:45</p>
                            <h4 class="font-bold text-dark text-sm">接機全員會合</h4>
                            <p class="text-xs text-gray-500 mt-1">Patty 抵達雪梨機場（SYD），接機後全員會合！</p>
                        </div>
                        <div class="timeline-item highlight">
                            <p class="text-xs font-bold text-primary tracking-widest mb-1">11:30 – 13:00</p>
                            <h4 class="font-bold text-dark text-sm">早餐/早午餐</h4>
                            <p class="text-xs text-gray-500 mt-1">機場周邊或沿途市區享用，慶祝 4 人到齊。</p>
                        </div>
                        <div class="timeline-item highlight">
                            <p class="text-xs font-bold text-primary tracking-widest mb-1">13:00 – 15:00</p>
                            <h4 class="font-bold text-dark text-sm">自駕前往藍山 Katoomba</h4>
                            <p class="text-xs text-gray-500 mt-1">車程約 2 小時。</p>
                        </div>
                        <div class="timeline-item">
                            <p class="text-xs font-bold text-gray-400 tracking-widest mb-1">15:30 – 17:30</p>
                            <h4 class="font-bold text-dark text-sm">Scenic World 或 Echo Point</h4>
                            <p class="text-xs text-gray-500 mt-1">體驗纜車，或捕捉三姊妹岩夕陽。</p>
                        </div>
                        <div class="timeline-item">
                            <p class="text-xs font-bold text-gray-400 tracking-widest mb-1">18:00 – 19:00</p>
                            <h4 class="font-bold text-dark text-sm">Check-in 入住</h4>
                            <p class="text-xs text-gray-500 mt-1">登記入住 Kyah Boutique Hotel。</p>
                        </div>
                        <div class="timeline-item highlight">
                            <p class="text-xs font-bold text-primary tracking-widest mb-1">19:30 – 21:00</p>
                            <h4 class="font-bold text-dark text-sm">晚餐：Katoomba 小鎮餐廳</h4>
                            <p class="text-xs text-gray-500 mt-1">如 Station Bar & Bites。</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Day 3 Content -->
            <div id="day-3" class="day-content mt-4 hidden">
                <div class="mb-4 flex items-center">
                    <div class="bg-indigo-100 text-indigo-600 p-2.5 rounded-xl mr-3 shadow-sm">
                        <i class="fa-solid fa-bug text-xl"></i>
                    </div>
                    <div>
                        <h2 class="text-lg font-bold text-dark">螢火蟲洞探秘 ➔ 蘿拉小鎮 ➔ 夜宿 Auburn</h2>
                        <p class="text-xs text-gray-500">Day 3: 9/29 (一)</p>
                    </div>
                </div>
                <div class="grid grid-cols-2 gap-3 mb-5">
                    <div class="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center">
                        <span class="text-[10px] text-gray-400 mb-0.5"><i class="fa-solid fa-bed mr-1"></i>住宿</span>
                        <span class="text-xs font-bold text-gray-700 leading-tight">Vicky 雪梨 Auburn 家</span>
                    </div>
                    <div class="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center">
                        <span class="text-[10px] text-gray-400 mb-0.5"><i class="fa-solid fa-wallet mr-1"></i>預算估計</span>
                        <span class="text-xs font-bold text-gray-700 leading-tight">依實際花費</span>
                    </div>
                </div>
                <div class="bg-white p-5 rounded-3xl shadow-sm border border-gray-100">
                    <div class="timeline-container">
                        <div class="timeline-item highlight">
                            <p class="text-xs font-bold text-primary tracking-widest mb-1">08:00 – 09:30</p>
                            <h4 class="font-bold text-dark text-sm">自駕前往 Glow Worm Tunnel</h4>
                            <p class="text-xs text-gray-500 mt-1">從 Katoomba 出發。</p>
                        </div>
                        <div class="timeline-item">
                            <p class="text-xs font-bold text-gray-400 tracking-widest mb-1">09:30 – 11:30</p>
                            <h4 class="font-bold text-dark text-sm">Glow Worm Tunnel 螢火蟲洞</h4>
                            <p class="text-xs text-gray-500 mt-1">徒步探訪舊鐵路隧道，天然藍光螢火蟲。</p>
                        </div>
                        <div class="timeline-item highlight">
                            <p class="text-xs font-bold text-primary tracking-widest mb-1">12:30 – 14:00</p>
                            <h4 class="font-bold text-dark text-sm">午餐：Wayzgoose Cafe (Leura)</h4>
                            <p class="text-xs text-gray-500 mt-1">司康與帕尼尼。</p>
                        </div>
                        <div class="timeline-item">
                            <p class="text-xs font-bold text-gray-400 tracking-widest mb-1">14:00 – 16:30</p>
                            <h4 class="font-bold text-dark text-sm">Leura (蘿拉小鎮) 散步</h4>
                            <p class="text-xs text-gray-500 mt-1">玩到下午 4-5 點。</p>
                        </div>
                        <div class="timeline-item highlight">
                            <p class="text-xs font-bold text-primary tracking-widest mb-1">16:30 – 18:30</p>
                            <h4 class="font-bold text-dark text-sm">自駕返回雪梨 Auburn</h4>
                            <p class="text-xs text-gray-500 mt-1">車程約 1.5 - 2 小時。</p>
                        </div>
                        <div class="timeline-item highlight">
                            <p class="text-xs font-bold text-primary tracking-widest mb-1">19:00 – 20:30</p>
                            <h4 class="font-bold text-dark text-sm">晚餐：Auburn 周邊美食</h4>
                            <p class="text-xs text-gray-500 mt-1"></p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Day 4 Content -->
            <div id="day-4" class="day-content mt-4 hidden">
                <div class="mb-4 flex items-center">
                    <div class="bg-red-100 text-red-500 p-2.5 rounded-xl mr-3 shadow-sm">
                        <i class="fa-solid fa-wine-glass text-xl"></i>
                    </div>
                    <div>
                        <h2 class="text-lg font-bold text-dark">直衝獵人谷 ➔ 三大酒莊巡禮</h2>
                        <p class="text-xs text-gray-500">Day 4: 9/30 (二)</p>
                    </div>
                </div>
                <div class="grid grid-cols-2 gap-3 mb-5">
                    <div class="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center">
                        <span class="text-[10px] text-gray-400 mb-0.5"><i class="fa-solid fa-bed mr-1"></i>住宿</span>
                        <span class="text-xs font-bold text-gray-700 leading-tight">Bellevue House (獵人谷)</span>
                    </div>
                    <div class="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center">
                        <span class="text-[10px] text-gray-400 mb-0.5"><i class="fa-solid fa-wallet mr-1"></i>預算估計</span>
                        <span class="text-xs font-bold text-gray-700 leading-tight">依實際花費</span>
                    </div>
                </div>
                <div class="bg-white p-5 rounded-3xl shadow-sm border border-gray-100">
                    <div class="timeline-container">
                        <div class="timeline-item highlight">
                            <p class="text-xs font-bold text-primary tracking-widest mb-1">09:00 – 11:30</p>
                            <h4 class="font-bold text-dark text-sm">自駕前往獵人谷 (Hunter Valley)</h4>
                            <p class="text-xs text-gray-500 mt-1">從 Auburn 出發，車程約 2 小時。</p>
                        </div>
                        <div class="timeline-item highlight">
                            <p class="text-xs font-bold text-primary tracking-widest mb-1">11:30 – 13:00</p>
                            <h4 class="font-bold text-dark text-sm">午餐：獵人谷周邊莊園餐廳</h4>
                            <p class="text-xs text-gray-500 mt-1"></p>
                        </div>
                        <div class="timeline-item">
                            <p class="text-xs font-bold text-gray-400 tracking-widest mb-1">13:30 – 14:45</p>
                            <h4 class="font-bold text-dark text-sm">酒莊 1：Saltire Estate</h4>
                            <p class="text-xs text-gray-500 mt-1">品嚐優雅 Semillon 白酒。</p>
                        </div>
                        <div class="timeline-item">
                            <p class="text-xs font-bold text-gray-400 tracking-widest mb-1">15:00 – 16:15</p>
                            <h4 class="font-bold text-dark text-sm">酒莊 2：Ernest Hill Wines</h4>
                            <p class="text-xs text-gray-500 mt-1">必嚐甜白酒與 Shiraz。</p>
                        </div>
                        <div class="timeline-item">
                            <p class="text-xs font-bold text-gray-400 tracking-widest mb-1">16:30 – 17:30</p>
                            <h4 class="font-bold text-dark text-sm">酒莊 3：Brokenwood Wines</h4>
                            <p class="text-xs text-gray-500 mt-1">旗艦大酒莊。</p>
                        </div>
                        <div class="timeline-item">
                            <p class="text-xs font-bold text-gray-400 tracking-widest mb-1">18:00 – 18:30</p>
                            <h4 class="font-bold text-dark text-sm">Check-in 入住</h4>
                            <p class="text-xs text-gray-500 mt-1">登記入住 Bellevue House。</p>
                        </div>
                        <div class="timeline-item highlight">
                            <p class="text-xs font-bold text-primary tracking-widest mb-1">19:00 – 21:00</p>
                            <h4 class="font-bold text-dark text-sm">晚餐：Bimbadgen Esca</h4>
                            <p class="text-xs text-gray-500 mt-1">頂級酒莊餐廳（⚠️ 需預約）。</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Day 5 Content -->
            <div id="day-5" class="day-content mt-4 hidden">
                <div class="mb-4 flex items-center">
                    <div class="bg-orange-100 text-orange-600 p-2.5 rounded-xl mr-3 shadow-sm">
                        <i class="fa-solid fa-hot-tub-person text-xl"></i>
                    </div>
                    <div>
                        <h2 class="text-lg font-bold text-dark">夢幻日出熱氣球 ➔ 獵人谷花園 ➔ 夜宿 Auburn</h2>
                        <p class="text-xs text-gray-500">Day 5: 10/1 (三)</p>
                    </div>
                </div>
                <div class="grid grid-cols-2 gap-3 mb-5">
                    <div class="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center">
                        <span class="text-[10px] text-gray-400 mb-0.5"><i class="fa-solid fa-bed mr-1"></i>住宿</span>
                        <span class="text-xs font-bold text-gray-700 leading-tight">Vicky 雪梨 Auburn 家</span>
                    </div>
                    <div class="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center">
                        <span class="text-[10px] text-gray-400 mb-0.5"><i class="fa-solid fa-wallet mr-1"></i>預算估計</span>
                        <span class="text-xs font-bold text-gray-700 leading-tight">依實際花費</span>
                    </div>
                </div>
                <div class="bg-white p-5 rounded-3xl shadow-sm border border-gray-100">
                    <div class="timeline-container">
                        <div class="timeline-item highlight">
                            <p class="text-xs font-bold text-primary tracking-widest mb-1">04:00 – 08:30</p>
                            <h4 class="font-bold text-dark text-sm">體驗：獵人谷日出熱氣球</h4>
                            <p class="text-xs text-gray-500 mt-1">Balloon Aloft ⚠️ 必須預約。升空迎日出，07:30 享用香檳早餐。</p>
                        </div>
                        <div class="timeline-item">
                            <p class="text-xs font-bold text-gray-400 tracking-widest mb-1">09:30 – 11:30</p>
                            <h4 class="font-bold text-dark text-sm">Hunter Valley Gardens (獵人谷花園)</h4>
                            <p class="text-xs text-gray-500 mt-1"></p>
                        </div>
                        <div class="timeline-item highlight">
                            <p class="text-xs font-bold text-primary tracking-widest mb-1">12:00 – 13:30</p>
                            <h4 class="font-bold text-dark text-sm">午餐：The Farm Shop / Elements</h4>
                            <p class="text-xs text-gray-500 mt-1"></p>
                        </div>
                        <div class="timeline-item highlight">
                            <p class="text-xs font-bold text-primary tracking-widest mb-1">14:00 – 16:30</p>
                            <h4 class="font-bold text-dark text-sm">自駕返回雪梨 Auburn</h4>
                            <p class="text-xs text-gray-500 mt-1">車程約 2 小時。</p>
                        </div>
                        <div class="timeline-item highlight">
                            <p class="text-xs font-bold text-primary tracking-widest mb-1">18:00 – 20:00</p>
                            <h4 class="font-bold text-dark text-sm">晚餐：雪梨市區或 Auburn 周邊餐廳</h4>
                            <p class="text-xs text-gray-500 mt-1"></p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Day 6 Content -->
            <div id="day-6" class="day-content mt-4 hidden">
                <div class="mb-4 flex items-center">
                    <div class="bg-cyan-100 text-cyan-600 p-2.5 rounded-xl mr-3 shadow-sm">
                        <i class="fa-solid fa-water text-xl"></i>
                    </div>
                    <div>
                        <h2 class="text-lg font-bold text-dark">南下 Kiama ➔ 牧場休閒與海岸風光</h2>
                        <p class="text-xs text-gray-500">Day 6: 10/2 (四)</p>
                    </div>
                </div>
                <div class="grid grid-cols-2 gap-3 mb-5">
                    <div class="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center">
                        <span class="text-[10px] text-gray-400 mb-0.5"><i class="fa-solid fa-bed mr-1"></i>住宿</span>
                        <span class="text-xs font-bold text-gray-700 leading-tight">Swell Kiama</span>
                    </div>
                    <div class="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center">
                        <span class="text-[10px] text-gray-400 mb-0.5"><i class="fa-solid fa-wallet mr-1"></i>預算估計</span>
                        <span class="text-xs font-bold text-gray-700 leading-tight">依實際花費</span>
                    </div>
                </div>
                <div class="bg-white p-5 rounded-3xl shadow-sm border border-gray-100">
                    <div class="timeline-container">
                        <div class="timeline-item highlight">
                            <p class="text-xs font-bold text-primary tracking-widest mb-1">09:00 – 10:00</p>
                            <h4 class="font-bold text-dark text-sm">自駕南下前往 Camden Valley Farm</h4>
                            <p class="text-xs text-gray-500 mt-1">從 Auburn 出發。</p>
                        </div>
                        <div class="timeline-item">
                            <p class="text-xs font-bold text-gray-400 tracking-widest mb-1">10:00 – 11:30</p>
                            <h4 class="font-bold text-dark text-sm">中途停靠：Camden Valley Farm</h4>
                            <p class="text-xs text-gray-500 mt-1">喝新鮮牛乳、休息拍照。</p>
                        </div>
                        <div class="timeline-item highlight">
                            <p class="text-xs font-bold text-primary tracking-widest mb-1">11:30 – 12:30</p>
                            <h4 class="font-bold text-dark text-sm">繼續前往 Kiama</h4>
                            <p class="text-xs text-gray-500 mt-1"></p>
                        </div>
                        <div class="timeline-item highlight">
                            <p class="text-xs font-bold text-primary tracking-widest mb-1">13:00 – 14:30</p>
                            <h4 class="font-bold text-dark text-sm">午餐：The Hungry Monkey Kiama</h4>
                            <p class="text-xs text-gray-500 mt-1">或周邊餐廳。</p>
                        </div>
                        <div class="timeline-item">
                            <p class="text-xs font-bold text-gray-400 tracking-widest mb-1">15:00 – 17:00</p>
                            <h4 class="font-bold text-dark text-sm">Kiama Blowhole 與海岸步道</h4>
                            <p class="text-xs text-gray-500 mt-1">觀賞海水噴出數十公尺水柱。</p>
                        </div>
                        <div class="timeline-item">
                            <p class="text-xs font-bold text-gray-400 tracking-widest mb-1">17:30 – 18:30</p>
                            <h4 class="font-bold text-dark text-sm">Check-in 入住</h4>
                            <p class="text-xs text-gray-500 mt-1">登記入住 Swell Kiama。</p>
                        </div>
                        <div class="timeline-item highlight">
                            <p class="text-xs font-bold text-primary tracking-widest mb-1">19:00 – 20:30</p>
                            <h4 class="font-bold text-dark text-sm">晚餐：Cargo Millmann Kiama</h4>
                            <p class="text-xs text-gray-500 mt-1">炸魚薯條、蒜味奶油烤蝦。</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Day 7 Content -->
            <div id="day-7" class="day-content mt-4 hidden">
                <div class="mb-4 flex items-center">
                    <div class="bg-cyan-100 text-cyan-600 p-2.5 rounded-xl mr-3 shadow-sm">
                        <i class="fa-solid fa-umbrella-beach text-xl"></i>
                    </div>
                    <div>
                        <h2 class="text-lg font-bold text-dark">Kiama 周邊秘境 ➔ 下午返回雪梨</h2>
                        <p class="text-xs text-gray-500">Day 7: 10/3 (五)</p>
                    </div>
                </div>
                <div class="grid grid-cols-2 gap-3 mb-5">
                    <div class="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center">
                        <span class="text-[10px] text-gray-400 mb-0.5"><i class="fa-solid fa-bed mr-1"></i>住宿</span>
                        <span class="text-xs font-bold text-gray-700 leading-tight">Vicky 雪梨 Auburn 家</span>
                    </div>
                    <div class="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center">
                        <span class="text-[10px] text-gray-400 mb-0.5"><i class="fa-solid fa-wallet mr-1"></i>預算估計</span>
                        <span class="text-xs font-bold text-gray-700 leading-tight">依實際花費</span>
                    </div>
                </div>
                <div class="bg-white p-5 rounded-3xl shadow-sm border border-gray-100">
                    <div class="timeline-container">
                        <div class="timeline-item highlight">
                            <p class="text-xs font-bold text-primary tracking-widest mb-1">09:00 – 10:30</p>
                            <h4 class="font-bold text-dark text-sm">早餐：Kiama 在地咖啡廳</h4>
                            <p class="text-xs text-gray-500 mt-1"></p>
                        </div>
                        <div class="timeline-item">
                            <p class="text-xs font-bold text-gray-400 tracking-widest mb-1">10:30 – 12:30</p>
                            <h4 class="font-bold text-dark text-sm">Little Blowhole & Cathedral Rocks</h4>
                            <p class="text-xs text-gray-500 mt-1">小噴水洞與教堂岩。</p>
                        </div>
                        <div class="timeline-item highlight">
                            <p class="text-xs font-bold text-primary tracking-widest mb-1">13:00 – 15:00</p>
                            <h4 class="font-bold text-dark text-sm">午餐&酒莊：Crooked River Wines</h4>
                            <p class="text-xs text-gray-500 mt-1">⚠️ 建議預約。濱海酒莊。</p>
                        </div>
                        <div class="timeline-item highlight">
                            <p class="text-xs font-bold text-primary tracking-widest mb-1">15:00 – 17:00</p>
                            <h4 class="font-bold text-dark text-sm">自駕返回雪梨 Auburn</h4>
                            <p class="text-xs text-gray-500 mt-1">車程約 2 小時，約下午 5 點前抵達。</p>
                        </div>
                        <div class="timeline-item highlight">
                            <p class="text-xs font-bold text-primary tracking-widest mb-1">18:00 – 20:00</p>
                            <h4 class="font-bold text-dark text-sm">晚餐：雪梨市區平價海鮮燒烤或周邊</h4>
                            <p class="text-xs text-gray-500 mt-1"></p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Day 8 Content -->"""
content = re.sub(pattern, new_days, content)

with open('d:\\Gemini科研\\2026-雪梨\\index.html', 'w', encoding='utf-8') as f:
    f.write(content)
print("Done!")
