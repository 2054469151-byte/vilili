import Lottery from '@/components/Lottery';
import { motion } from 'framer-motion';
import { toast } from 'sonner';


export default function Home() {
  return (
  <div className="min-h-screen bg-[#d6eaf8] dark:bg-[#1a2a3a] py-8 px-4">
      {/* 背景装饰 */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <motion.div 
           className="absolute top-10 left-10 w-40 h-40 bg-[#e84393]/30 dark:bg-[#e84393]/20 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.7, 0.5]
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity
          }}
        ></motion.div>
        <motion.div 
           className="absolute bottom-10 right-10 w-60 h-60 bg-[#3498db]/30 dark:bg-[#3498db]/20 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{ 
            duration: 12,
            repeat: Infinity,
            delay: 2
          }}
        ></motion.div>
        <motion.div 
           className="absolute top-1/3 right-1/4 w-32 h-32 bg-[#f39c12]/30 dark:bg-[#f39c12]/20 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.4, 0.6, 0.4]
          }}
          transition={{ 
            duration: 15,
            repeat: Infinity,
            delay: 5
          }}
        ></motion.div>
      </div>
      
      {/* 页面内容 */}
      <div className="relative z-10 max-w-4xl mx-auto">
        <Lottery />
        
        {/* 生日祝福 */}
         <div className="text-center mt-12 p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg border border-white/30 dark:border-gray-700/30">
           <h2 className="text-2xl font-bold text-[#f1c40f] drop-shadow-md mb-2">祝你生日快乐！</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-md mx-auto">
            希望这个特别的日子充满欢笑和惊喜，愿所有美好的祝福都围绕着你！
          </p>
          <div className="mt-4 flex justify-center space-x-2">
            <i class="fa-solid fa-birthday-cake text-pink-500 text-2xl"></i>
            <i class="fa-solid fa-gift text-purple-500 text-2xl"></i>
            <i class="fa-solid fa-confetti text-yellow-500 text-2xl"></i>
            <i class="fa-solid fa-balloon text-blue-500 text-2xl"></i>
            <i class="fa-solid fa-candle text-red-500 text-2xl"></i>
           </div>
            {/* 分享按钮 */}

        </div>
      </div>
    </div>
  );
}