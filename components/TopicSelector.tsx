import React from 'react';
import { Topic } from '../types';
import Card from './Card';
import { Calculator, Sigma, Shapes, TrendingUp, BarChart3 } from 'lucide-react';

interface TopicSelectorProps {
  selectedTopic: Topic | null;
  onSelectTopic: (topic: Topic) => void;
}

const TopicSelector: React.FC<TopicSelectorProps> = ({ selectedTopic, onSelectTopic }) => {
  const topics = [
    { id: Topic.ARITHMETIC, icon: <Calculator className="w-8 h-8 text-teal-500" />, desc: "Cộng, trừ, nhân, chia cơ bản" },
    { id: Topic.ALGEBRA, icon: <Sigma className="w-8 h-8 text-purple-500" />, desc: "Phương trình và biểu thức" },
    { id: Topic.GEOMETRY, icon: <Shapes className="w-8 h-8 text-blue-500" />, desc: "Hình học và không gian" },
    { id: Topic.CALCULUS, icon: <TrendingUp className="w-8 h-8 text-red-500" />, desc: "Đạo hàm và tích phân" },
    { id: Topic.STATISTICS, icon: <BarChart3 className="w-8 h-8 text-orange-500" />, desc: "Dữ liệu và xác suất" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
      {topics.map((t) => (
        <Card 
          key={t.id} 
          title={t.id} 
          description={t.desc}
          active={selectedTopic === t.id}
          onClick={() => onSelectTopic(t.id)}
          className="flex flex-col items-center text-center hover:bg-teal-50"
        >
          <div className="mb-3 p-3 bg-slate-50 rounded-full">
            {t.icon}
          </div>
        </Card>
      ))}
    </div>
  );
};

export default TopicSelector;