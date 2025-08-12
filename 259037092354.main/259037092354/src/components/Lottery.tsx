import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

// 奖品类型定义
interface Prize {
  id: number;
  name: string;
  description: string;
  image: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
}

// 奖品数据
const prizes: Prize[] = [
  {
    id: 1,
    name: '凝光之驻',
    description: '愿它如凝固的星光，守护你所在的一方天地',
  image: 'https://lf-code-agent.coze.cn/obj/x-ai-cn/259037092354/attachment/1111_20250812143332.jpg',
    rarity: 'common'
  },
  {
    id: 2,
    name: '隙间辰砂',
    description: '钥匙开启门隙，愿其中藏有星辰般的机遇',
  image: 'https://lf-code-agent.coze.cn/obj/x-ai-cn/259037092354/attachment/1111_20250812143332.jpg',
    rarity: 'common'
  },
  {
    id: 3,
    name: '甜梦摇篮',
    description: '晃动间坠入柔软梦境，愿琐碎烦恼皆被摇散',
  image: 'https://lf-code-agent.coze.cn/obj/x-ai-cn/259037092354/attachment/1111_20250812143332.jpg',
    rarity: 'common'
  },
  {
    id: 4,
    name: '心绪拓片',
    description: '将此刻心情拓印留存，愿斑斓痕迹拼出未来图景',
  image: 'https://lf-code-agent.coze.cn/obj/x-ai-cn/259037092354/attachment/1111_20250812143332.jpg',
    rarity: 'common'
  },
  {
    id: 5,
    name: '时光行囊',
    description: '背负轻风与故事前行，愿沿途皆可盛放自由',
  image: 'https://lf-code-agent.coze.cn/obj/x-ai-cn/259037092354/attachment/1111_20250812143332.jpg',
    rarity: 'uncommon'
  },
  {
    id: 6,
    name: '远驿诗笺',
    description: '方寸纸页载满未言之意，愿思念终抵繁星彼端',
  image: 'https://lf-code-agent.coze.cn/obj/x-ai-cn/259037092354/attachment/1111_20250812143332.jpg',
    rarity: 'uncommon'
  },
  {
    id: 7,
    name: '星屑标本',
    description: '将生活微光磁吸珍藏，愿烟火日常亦有银河',
  image: 'https://lf-code-agent.coze.cn/obj/x-ai-cn/259037092354/attachment/1111_20250812143332.jpg',
    rarity: 'rare'
  },
  {
    id: 8,
    name: '灵痕引信',
    description: '按启思绪的星火，愿每一笔皆点燃灵感',
  image: 'https://lf-code-agent.coze.cn/obj/x-ai-cn/259037092354/attachment/1111_20250812143332.jpg',
    rarity: 'rare'
  },
  {
    id: 9,
    name: '浮世织幕',
    description: '垂落成墙上的温柔幕布，愿喧嚣在此静默成画',
  image: 'https://lf-code-agent.coze.cn/obj/x-ai-cn/259037092354/attachment/1111_20250812143332.jpg',
    rarity: 'epic'
  },
  {
    id: 10,
    name: '流光蝶翼',
    description: '轻夹住易逝的流光，愿重要瞬间如蝶栖落掌心',
  image: 'https://lf-code-agent.coze.cn/obj/x-ai-cn/259037092354/attachment/1111_20250812143332.jpg',
    rarity: 'epic'
  }
];

// 根据稀有度获取颜色
const getRarityColor = (rarity: string): string => {
  switch (rarity) {
    case 'common': return 'bg-[#e84393]/20 text-[#e84393]';
    case 'uncommon': return 'bg-[#2ecc71]/20 text-[#2ecc71]';
    case 'rare': return 'bg-[#3498db]/20 text-[#3498db]';
    case 'epic': return 'bg-[#9b59b6]/20 text-[#9b59b6]';
    case 'legendary': return 'bg-[#f1c40f]/20 text-[#f1c40f]';
    default: return 'bg-gray-200 text-gray-800';
  }
};

export default function Lottery() {
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [selectedPrize, setSelectedPrize] = useState<Prize | null>(null);
  const [wonPrizes, setWonPrizes] = useState<Prize[]>([]);
  const [showPrize, setShowPrize] = useState<boolean>(false);
  const [confetti, setConfetti] = useState<{x: number, y: number, size: number, color: string, rotation: number}[]>([]);

  // 创建庆祝彩屑效果
  useEffect(() => {
    if (showPrize) {
      const newConfetti = Array.from({length: 50}, () => ({
        x: Math.random() * 100,
        y: -10,
        size: Math.random() * 10 + 5,
        color: `hsl(${Math.random() * 360}, 100%, 50%)`,
        rotation: Math.random() * 360
      }));
      setConfetti(newConfetti);
      
      // 动画彩屑下落
      const interval = setInterval(() => {
        setConfetti(prev => prev.map(piece => ({
          ...piece,
          y: piece.y + 2,
          rotation: piece.rotation + 5
        })).filter(piece => piece.y < 110));
      }, 30);
      
      return () => clearInterval(interval);
    }
  }, [showPrize]);

  // 抽奖逻辑
  const spinWheel = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    setShowPrize(false);
    setSelectedPrize(null);
    
    // 模拟抽奖过程
    setTimeout(() => {
      // 获取未抽中的奖品
      const remainingPrizes = prizes.filter(prize => 
        !wonPrizes.some(won => won.id === prize.id)
      );
      
      // 如果所有奖品都已抽中
      if (remainingPrizes.length === 0) {
        toast.info('恭喜你获得了所有礼物！', { duration: 3000 });
        setIsSpinning(false);
        return;
      }
      
      // 随机选择奖品，稀有奖品概率较低
      const weightedPrizes = remainingPrizes.flatMap(prize => {
        const weight = {
          common: 40,
          uncommon: 30,
          rare: 18,
          epic: 10,
          legendary: 2
        }[prize.rarity] || 1;
        
        return Array(weight).fill(prize);
      });
      
      const randomPrize = weightedPrizes[Math.floor(Math.random() * weightedPrizes.length)];
      setSelectedPrize(randomPrize);
      
      // 显示结果
      setTimeout(() => {
        setShowPrize(true);
        setIsSpinning(false);
        setWonPrizes(prev => [...prev, randomPrize]);
        toast.success(`恭喜获得: ${randomPrize.name}!`, { duration: 3000 });
      }, 1500);
    }, 2000);
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      {/* 生日标题 */}
      <div className="text-center mb-8">
         <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-bold text-[#f1c40f] drop-shadow-md mb-2">
          生日快乐!
        </h1>
         <p className="text-[#2c3e50] dark:text-gray-200 text-lg">点击下方按钮抽取你的生日惊喜</p>
      </div>
      
      {/* 彩屑效果 */}
      {showPrize && confetti.map((piece, index) => (
        <div
          key={index}
          className="fixed pointer-events-none"
          style={{
            left: `${piece.x}%`,
            top: `${piece.y}%`,
            width: `${piece.size}px`,
            height: `${piece.size}px`,
            backgroundColor: piece.color,
            transform: `rotate(${piece.rotation}deg)`,
            borderRadius: Math.random() > 0.5 ? '50%' : '0',
            opacity: 0.7
          }}
        />
      ))}
      
      {/* 抽奖区域 */}
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-8 overflow-hidden border border-pink-100 dark:border-purple-900">
        {/* 装饰元素 */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-pink-200 dark:bg-purple-900/30 rounded-full blur-2xl opacity-50"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-200 dark:bg-blue-900/30 rounded-full blur-2xl opacity-50"></div>
        
        {/* 抽奖结果显示 */}
        <div className="relative z-10">
          {!showPrize ? (
            <div className="text-center py-12">
              <div className="w-40 h-40 mx-auto mb-6 relative">
                <div className={`w-full h-full rounded-full border-8 border-dashed ${isSpinning ? 'border-pink-500 animate-spin' : 'border-gray-300 dark:border-gray-600'}`}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-5xl">
                  <i class="fa-solid fa-gift"></i>
                </div>
              </div>
              <p className="text-gray-500 dark:text-gray-400 mb-4">准备好抽取你的礼物了吗？</p>
            </div>
          ) : (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="text-center"
              >
                <div className="w-48 h-48 mx-auto mb-4 rounded-xl overflow-hidden border-4 border-white shadow-lg">
                  <img 
                    src={selectedPrize?.image || ''} 
                    alt={selectedPrize?.name || 'Prize'} 
                    className="w-full h-full object-cover"
                  />
                </div>
                 <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">{selectedPrize?.name}</h3>
                 <p className="text-gray-600 dark:text-gray-300 italic mb-4">"{selectedPrize?.description}"</p>
              </motion.div>
            </AnimatePresence>
          )}
          
          {/* 抽奖按钮 */}
          <motion.button
            onClick={spinWheel}
            disabled={isSpinning}
            whileHover={!isSpinning ? { scale: 1.05 } : undefined}
            whileTap={!isSpinning ? { scale: 0.95 } : undefined}
            className={cn(
              "w-full py-4 mt-6 rounded-full text-white font-bold text-lg shadow-lg transition-all duration-300",
              isSpinning 
                ? "bg-gray-400 cursor-not-allowed" 
                 : "bg-gradient-to-r from-[#f1c40f] to-[#f39c12] hover:from-[#f39c12] hover:to-[#f1c40f]"
            )}
          >
            {isSpinning ? (
              <>
                <i class="fa-solid fa-spinner fa-spin mr-2"></i> 抽奖中...
              </>
            ) : showPrize ? (
              <>再抽一次 <i class="fa-solid fa-arrow-right ml-2"></i></>
            ) : (
              wonPrizes.length >= prizes.length ? (
                <>已获得所有礼物</>
              ) : (
                <>开始抽奖 <i class="fa-solid fa-gift ml-2"></i></>
              )
            )}
          </motion.button>
        </div>
      </div>
      
      {/* 已获得奖品列表 */}
      {wonPrizes.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
            <i class="fa-solid fa-list-check mr-2 text-pink-500"></i> 已获得的奖品
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {wonPrizes.map((prize, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 flex items-center">
                <div className="w-12 h-12 rounded-md overflow-hidden mr-2 flex-shrink-0">
                  <img src={prize.image} alt={prize.name} className="w-full h-full object-cover" />
                </div>
                <div>
                 <h4 className="font-medium text-sm text-gray-800 dark:text-white truncate">{prize.name}</h4>
                 <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">{prize.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}