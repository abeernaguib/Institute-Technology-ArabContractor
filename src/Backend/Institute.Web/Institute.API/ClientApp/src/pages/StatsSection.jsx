import React, { useEffect, useRef } from 'react';
import { Users, GraduationCap, Monitor, Globe } from 'lucide-react';
import { motion, useMotionValue, useSpring, useInView } from 'framer-motion';

// مكون الرقم المتحرك (نفس المنطق السابق)
const Counter = ({ value }) => {
  const ref = useRef(null);
  const numericValue = parseInt(value.replace(/,/g, ''), 10);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 30, stiffness: 100 });
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) motionValue.set(numericValue);
  }, [isInView, motionValue, numericValue]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Intl.NumberFormat("en-US").format(latest.toFixed(0));
      }
    });
  }, [springValue]);

  return <span ref={ref}>0</span>;
};

const StatsSection = () => {
  const stats = [
    {
      id: 1,
      label: 'دورة تدريبية',
      value: '498',
      icon: <Monitor size={24} />,
    },
    {
      id: 2,
      label: 'متدرب',
      value: '7,225',
      icon: <GraduationCap size={24} />,
    },
    {
      id: 3,
      label: 'الدورات التدريب عن بعد (ONLINE)',
      value: '35',
      icon: <Globe size={24} />,
    },
    
    {
      id: 4,
      label: 'المتدربين للدورات عن بعد (ONLINE)',
      value: '500',
      icon: <Users size={24} />,
    },
    
    
  ];

  return (
    <section style={{ 
      width: '100%', 
      padding: '100px 0', 
      backgroundImage: 'linear-gradient(#ffffff,#ffffff)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      textAlign: 'center',
      color: 'white'
    }}>        
        <div className="mb-12 text-center">
          <h2 className="text-2xl font-bold text-[#f57c00] md:text-4xl">
            لدينا خلال العام 2023 - 2024 أكثر من :
          </h2>
        </div>

                    {/* Professional Deep-Layered Container */}
          <div 
            className="rounded-3xl border border-gray-200 bg-white p-8 transition-all duration-300 md:p-12"
            style={{ 
              /* This creates a huge, deep professional shadow using layers */
              boxShadow: `
                0px 1px 2px rgba(0, 0, 0, 0.06), 
                0px 4px 8px rgba(0, 0, 0, 0.1), 
                0px 20px 40px rgba(0, 0, 0, 0.15), 
                0px 40px 80px rgba(0, 0, 0, 0.2)
              `
            }}
          >
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <motion.div 
                key={stat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: stat.id * 0.1 }}
                className="flex flex-col items-start space-y-4 md:items-center lg:items-start"
              >
                <div className="flex items-center gap-4">
                  {/* الأيقونة باللون البرتقالي المخصص وخلفية فاتحة جداً */}
                  <div 
                    className="flex items-center justify-center rounded-xl border p-3"
                    style={{ 
                      color: '#f57c00', 
                      backgroundColor: '#fff7ed', 
                      borderColor: '#ffedd5' 
                    }}
                  >
                    {stat.icon}
                  </div>
                  
                  {/* الرقم مع الزائد باللون البرتقالي */}
                  <div className="flex items-center text-3xl font-bold tracking-tight text-slate-800">
                    <Counter value={stat.value} />
                    <span style={{ color: '#f57c00' }} className="ml-1 text-2xl font-extrabold">+</span>
                  </div>
                </div>

                <div className="pr-2 text-sm font-bold leading-relaxed text-slate-500">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
    </section>
  );
};

export default StatsSection;