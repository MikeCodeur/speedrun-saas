"use client";

import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ChartWidgetProps {
  data: any[];
  color?: string;
  dataKey?: string;
}

export function ChartWidget({ 
  data, 
  color = "#06b6d4", // cyan-500
  dataKey = "value"
}: ChartWidgetProps) {
  return (
    <div className="h-[200px] w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
              <stop offset="95%" stopColor={color} stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
          <XAxis 
            dataKey="name" 
            stroke="rgba(255,255,255,0.3)" 
            tick={{fontSize: 10, fontFamily: 'Inter, sans-serif'}} 
            tickLine={false}
            axisLine={false}
          />
          <YAxis 
            stroke="rgba(255,255,255,0.3)" 
            tick={{fontSize: 10, fontFamily: 'Inter, sans-serif'}} 
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(0,0,0,0.8)', 
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
              backdropFilter: 'blur(4px)',
              boxShadow: `0 0 10px ${color}40`
            }}
            itemStyle={{ color: '#fff', fontFamily: 'Inter, sans-serif', fontSize: '12px' }}
            labelStyle={{ display: 'none' }}
          />
          <Area 
            type="monotone" 
            dataKey={dataKey} 
            stroke={color} 
            strokeWidth={2}
            fillOpacity={1} 
            fill={`url(#gradient-${color})`} 
            className="drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
