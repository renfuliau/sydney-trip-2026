import React, { useState, useEffect, useMemo } from 'react';

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem('travel_expenses');
    return saved ? JSON.parse(saved) : [];
  });

  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('食');
  const [isSplit, setIsSplit] = useState(true);

  const categories = ['食', '衣', '住', '行', '育', '樂', '其他'];

  useEffect(() => {
    localStorage.setItem('travel_expenses', JSON.stringify(expenses));
  }, [expenses]);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!name || !amount) return;

    const newExpense = {
      id: crypto.randomUUID(),
      name,
      amount: parseFloat(amount),
      category,
      isSplit,
      timestamp: Date.now(),
    };

    setExpenses([newExpense, ...expenses]);
    setName('');
    setAmount('');
  };

  const handleDelete = (id) => {
    setExpenses(expenses.filter(exp => exp.id !== id));
  };

  const stats = useMemo(() => {
    let totalJPY = 0;
    let personalJPY = 0;

    expenses.forEach(exp => {
      totalJPY += exp.amount;
      personalJPY += exp.isSplit ? exp.amount / 4 : exp.amount;
    });

    return {
      totalJPY,
      personalJPY,
      totalTWD: Math.round(totalJPY * 0.21),
      personalTWD: Math.round(personalJPY * 0.21),
    };
  }, [expenses]);

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 bg-white/30 backdrop-blur-md rounded-3xl shadow-2xl border border-white/40">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center tracking-wide">記帳本</h2>
      
      {/* 統計看板 */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-white/50 p-5 rounded-2xl shadow-sm border border-white/60 backdrop-blur-sm">
          <p className="text-sm font-medium text-gray-500 mb-1">總支出</p>
          <p className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1">¥ {stats.totalJPY.toLocaleString()}</p>
          <p className="text-sm text-gray-500 font-medium">≈ NT$ {stats.totalTWD.toLocaleString()}</p>
        </div>
        <div className="bg-blue-50/50 p-5 rounded-2xl shadow-sm border border-blue-100/60 backdrop-blur-sm">
          <p className="text-sm font-medium text-blue-500 mb-1">個人應付 (1/4)</p>
          <p className="text-2xl sm:text-3xl font-bold text-blue-600 mb-1">¥ {stats.personalJPY.toLocaleString()}</p>
          <p className="text-sm text-blue-500 font-medium">≈ NT$ {stats.personalTWD.toLocaleString()}</p>
        </div>
      </div>

      {/* 輸入表單 */}
      <form onSubmit={handleAdd} className="space-y-5 mb-8 bg-white/40 p-5 sm:p-6 rounded-2xl border border-white/50 shadow-sm backdrop-blur-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">項目名稱</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-white/70 border-none shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all placeholder:text-gray-400"
              placeholder="例如: 晚餐"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">金額 (日圓)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-white/70 border-none shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all placeholder:text-gray-400"
              placeholder="¥ 0"
              min="0"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">類別</label>
          <div className="flex flex-wrap gap-2">
            {categories.map(c => (
              <button
                type="button"
                key={c}
                onClick={() => setCategory(c)}
                className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all duration-200 ${
                  category === c 
                    ? 'bg-blue-500 text-white shadow-md shadow-blue-500/30 scale-105' 
                    : 'bg-white/60 text-gray-500 hover:bg-white/80 hover:text-gray-700'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-3 gap-4">
          <label className="flex items-center space-x-3 cursor-pointer group">
            <div className="relative flex items-center">
                <input
                  type="checkbox"
                  checked={isSplit}
                  onChange={(e) => setIsSplit(e.target.checked)}
                  className="w-5 h-5 text-blue-500 rounded focus:ring-blue-400/50 bg-white/80 border-none shadow-inner transition-all duration-200 cursor-pointer"
                />
            </div>
            <span className="text-sm font-semibold text-gray-700 group-hover:text-blue-600 transition-colors">平分 (除以 4 人)</span>
          </label>
          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-600/30 transition-all active:scale-95"
          >
            新增紀錄
          </button>
        </div>
      </form>

      {/* 歷史清單 */}
      <div className="space-y-3">
        <h3 className="text-lg font-bold text-gray-800 mb-4 px-2">歷史明細</h3>
        {expenses.length === 0 ? (
          <p className="text-center text-gray-400 py-6 font-medium">尚無支出紀錄</p>
        ) : (
          <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            {expenses.map(exp => (
              <div key={exp.id} className="flex items-center justify-between p-4 bg-white/60 rounded-2xl border border-white/80 shadow-sm hover:shadow-md transition-all group backdrop-blur-sm">
                <div className="flex items-center space-x-4">
                  <span className="w-11 h-11 flex items-center justify-center bg-blue-100/80 text-blue-600 rounded-2xl font-bold shadow-sm">
                    {exp.category}
                  </span>
                  <div>
                    <p className="font-bold text-gray-800">{exp.name}</p>
                    <div className="flex items-center mt-1 space-x-2">
                      <span className="text-xs font-medium text-gray-400">{new Date(exp.timestamp).toLocaleDateString()}</span>
                      {exp.isSplit ? (
                        <span className="bg-emerald-100/80 text-emerald-700 px-2.5 py-0.5 rounded-md text-[10px] font-bold">已平分</span>
                      ) : (
                        <span className="bg-amber-100/80 text-amber-700 px-2.5 py-0.5 rounded-md text-[10px] font-bold">個人付</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="font-extrabold text-gray-800">¥ {exp.amount.toLocaleString()}</p>
                    <p className="text-xs font-medium text-gray-400">NT$ {Math.round(exp.amount * 0.21).toLocaleString()}</p>
                  </div>
                  <button
                    onClick={() => handleDelete(exp.id)}
                    className="text-gray-300 hover:text-red-500 hover:bg-red-50 p-2 rounded-xl transition-all"
                    title="刪除"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenseTracker;
