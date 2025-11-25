import React from 'react';
import { Inter } from 'next/font/google';
import { CryptoCard } from './components/crypto-card';
import { ChartWidget } from './components/chart-widget';
import { 
  Activity, 
  ArrowUpRight, 
  ArrowDownRight, 
  Wallet, 
  Zap, 
  Settings, 
  Bell, 
  Search,
  Menu,
  Cpu,
  Globe,
  Shield
} from 'lucide-react';

const inter = Inter({ subsets: ['latin'], weight: ['100', '200', '300', '400', '500', '600'] });

const data1 = [
  { name: 'Mon', value: 4000 },
  { name: 'Tue', value: 3000 },
  { name: 'Wed', value: 5000 },
  { name: 'Thu', value: 2780 },
  { name: 'Fri', value: 1890 },
  { name: 'Sat', value: 2390 },
  { name: 'Sun', value: 3490 },
];

const data2 = [
  { name: 'Mon', value: 2400 },
  { name: 'Tue', value: 1398 },
  { name: 'Wed', value: 9800 },
  { name: 'Thu', value: 3908 },
  { name: 'Fri', value: 4800 },
  { name: 'Sat', value: 3800 },
  { name: 'Sun', value: 4300 },
];

const data3 = [
  { name: 'Mon', value: 1000 },
  { name: 'Tue', value: 2000 },
  { name: 'Wed', value: 1500 },
  { name: 'Thu', value: 3000 },
  { name: 'Fri', value: 2500 },
  { name: 'Sat', value: 4000 },
  { name: 'Sun', value: 3500 },
];

export default function Dashboard2() {
  return (
    <div className={`min-h-screen bg-[#050505] text-white ${inter.className} selection:bg-cyan-500/30`}>
      {/* Background Ambient Glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-cyan-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 flex h-screen overflow-hidden">
        {/* Sidebar */}
        <aside className="w-20 lg:w-64 hidden md:flex flex-col border-r border-white/5 bg-black/20 backdrop-blur-xl">
          <div className="p-6 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.5)]">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-light tracking-widest hidden lg:block bg-clip-text text-transparent bg-gradient-to-r from-white to-white/50">NEXUS</span>
          </div>

          <nav className="flex-1 px-4 py-8 space-y-2">
            {[
              { icon: Activity, label: 'Dashboard', active: true },
              { icon: Wallet, label: 'Portfolio' },
              { icon: Globe, label: 'Market' },
              { icon: Cpu, label: 'Mining' },
              { icon: Shield, label: 'Security' },
            ].map((item, i) => (
              <button 
                key={i}
                className={`w-full flex items-center gap-4 p-3 rounded-lg transition-all duration-300 group ${
                  item.active 
                    ? 'bg-white/5 border border-white/5 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.1)]' 
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <item.icon className={`w-5 h-5 ${item.active ? 'drop-shadow-[0_0_5px_rgba(6,182,212,0.8)]' : ''}`} />
                <span className="hidden lg:block font-light text-sm">{item.label}</span>
                {item.active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_5px_#22d3ee] hidden lg:block" />}
              </button>
            ))}
          </nav>

          <div className="p-4 border-t border-white/5">
            <button className="w-full flex items-center gap-4 p-3 rounded-lg text-gray-400 hover:bg-white/5 hover:text-white transition-colors">
              <Settings className="w-5 h-5" />
              <span className="hidden lg:block font-light text-sm">Settings</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          {/* Header */}
          <header className="h-20 border-b border-white/5 bg-black/20 backdrop-blur-md sticky top-0 z-50 px-8 flex items-center justify-between">
            <div className="flex items-center gap-4 md:hidden">
              <Menu className="w-6 h-6 text-gray-400" />
              <span className="text-xl font-light tracking-widest">NEXUS</span>
            </div>

            <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/5 w-96 focus-within:border-cyan-500/50 focus-within:shadow-[0_0_15px_rgba(6,182,212,0.1)] transition-all">
              <Search className="w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search assets, transactions..." 
                className="bg-transparent border-none outline-none text-sm text-white placeholder-gray-500 w-full font-light"
              />
            </div>

            <div className="flex items-center gap-6">
              <button className="relative text-gray-400 hover:text-white transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full shadow-[0_0_8px_#ef4444]" />
              </button>
              <div className="flex items-center gap-3 pl-6 border-l border-white/5">
                <div className="text-right hidden md:block">
                  <div className="text-sm font-medium text-white">Mike Codeur</div>
                  <div className="text-xs text-cyan-400 font-light">Pro Trader</div>
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 border border-white/20 shadow-[0_0_10px_rgba(168,85,247,0.3)]" />
              </div>
            </div>
          </header>

          <div className="p-8 space-y-8">
            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Total Balance', value: '$124,592.00', change: '+12.5%', up: true, color: 'from-cyan-500 to-blue-500' },
                { label: '24h Volume', value: '$34,200.50', change: '-2.4%', up: false, color: 'from-purple-500 to-pink-500' },
                { label: 'Active Assets', value: '14', change: '+3', up: true, color: 'from-emerald-500 to-teal-500' },
                { label: 'Yield Earned', value: '$1,204.30', change: '+8.1%', up: true, color: 'from-orange-500 to-red-500' },
              ].map((stat, i) => (
                <CryptoCard key={i} gradientColor={stat.color} className="h-32">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-gray-400 text-xs font-light uppercase tracking-wider">{stat.label}</span>
                    <div className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full ${stat.up ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                      {stat.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                      {stat.change}
                    </div>
                  </div>
                  <div className="text-2xl font-light text-white tracking-tight mt-2">{stat.value}</div>
                </CryptoCard>
              ))}
            </div>

            {/* Main Charts Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[400px]">
              <CryptoCard className="lg:col-span-2 flex flex-col" gradientColor="from-blue-600 to-purple-600">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="text-lg font-light text-white">Portfolio Performance</h3>
                    <p className="text-xs text-gray-400 font-light mt-1">Live tracking of your asset distribution</p>
                  </div>
                  <div className="flex gap-2">
                    {['1H', '1D', '1W', '1M', '1Y'].map((period) => (
                      <button 
                        key={period}
                        className={`px-3 py-1 rounded text-xs font-light transition-all ${
                          period === '1W' 
                            ? 'bg-white/10 text-white shadow-[0_0_10px_rgba(255,255,255,0.1)]' 
                            : 'text-gray-500 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        {period}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex-1 w-full">
                  <ChartWidget data={data1} color="#8b5cf6" />
                </div>
              </CryptoCard>

              <CryptoCard className="flex flex-col" gradientColor="from-cyan-500 to-teal-500">
                <div className="mb-4">
                  <h3 className="text-lg font-light text-white">Market Trends</h3>
                  <p className="text-xs text-gray-400 font-light mt-1">Top movers in your watchlist</p>
                </div>
                <div className="space-y-4 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                  {[
                    { name: 'Bitcoin', symbol: 'BTC', price: '$64,230', change: '+2.4%', color: 'text-orange-400' },
                    { name: 'Ethereum', symbol: 'ETH', price: '$3,450', change: '+1.8%', color: 'text-blue-400' },
                    { name: 'Solana', symbol: 'SOL', price: '$145', change: '-0.5%', color: 'text-purple-400' },
                    { name: 'Cardano', symbol: 'ADA', price: '$0.45', change: '+5.2%', color: 'text-blue-300' },
                    { name: 'Polkadot', symbol: 'DOT', price: '$7.20', change: '-1.2%', color: 'text-pink-400' },
                  ].map((coin, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-xs font-bold ${coin.color}`}>
                          {coin.symbol[0]}
                        </div>
                        <div>
                          <div className="text-sm text-white font-light">{coin.name}</div>
                          <div className="text-xs text-gray-500">{coin.symbol}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-white font-medium">{coin.price}</div>
                        <div className={`text-xs ${coin.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                          {coin.change}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CryptoCard>
            </div>

            {/* Secondary Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CryptoCard gradientColor="from-pink-500 to-rose-500">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-md font-light text-white">Network Activity</h3>
                  <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_5px_#22c55e] animate-pulse" />
                </div>
                <ChartWidget data={data2} color="#ec4899" />
              </CryptoCard>
              
              <CryptoCard gradientColor="from-amber-500 to-orange-500">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-md font-light text-white">Mining Hashrate</h3>
                  <div className="text-xs text-orange-400 font-mono">145.2 TH/s</div>
                </div>
                <ChartWidget data={data3} color="#f59e0b" />
              </CryptoCard>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
