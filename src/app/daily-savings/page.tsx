'use client'
import {
  motion,
  useInView,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { CalendarFold } from 'lucide-react';
import Image from "next/image";
import { useRef, useState } from 'react';
import { LuIndianRupee } from "react-icons/lu";
import Footer from '../components/ui/Footer';
import Header from '../components/ui/Header';

const page = () => {
  const [getamount,setgetamount]=useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.2 1"],
  });

  const scaleProgress = useSpring(
    useTransform(scrollYProgress, [0, 1], [0.8, 1]),
    {
      stiffness: 100,
      damping: 30,
      restDelta: 0.001,
    },
  );
  const opacityProgress = useSpring(
    useTransform(scrollYProgress, [0, 1], [0.3, 1]),
    {
      stiffness: 100,
      damping: 30,
      restDelta: 0.001,
    },
  );

  const containerVariants = {
    hidden: { opacity: 1, scale: 1.1 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  return (
    <>

      <div className="flex min-h-screen flex-col bg-amber-50 font-lora">
        <Header />
        <main>
          <section className='relative overflow-hidden '>
            <motion.div className="container lg:w-5/6 w-full relative z-10  mx-auto px-4 py-2 text-center" initial="hidden" animate="visible" variants={containerVariants}>
              <motion.div className="container  relative z-10 md:w-4/5 w-full mx-auto px-4 py-2 text-center" initial="hidden" animate="visible" variants={containerVariants}>
                <motion.p variants={itemVariants} className="mb-2 md:text-xl text-lg flex md:justify-center justify-start tracking-wider text-amber-800 font-bold">
                  <CalendarFold className='md:mx-1' />&nbsp;Effortless Daily Savings
                </motion.p>
                <motion.p variants={itemVariants} className="mb-2 xl:mx-40 font-medium md:text-lg text-md flex justify-center tracking-normal ">
                  Secure your future with a small deposit every day, without lifting a finger.
                  Let it grow, day by day. Automatically.
                </motion.p>
                {/* <div>
                  <img src="Animation.gif" alt="Description of GIF" width={50} height={50} className='mx-auto' />
                  <img src="/bank.png" width={100} height={100} alt="" className='mx-auto' />
                </div> */}
              </motion.div>
              <motion.div className='bg-yellow-100 mx-auto xl:w-1/3 lg:w-1/2 md:w-2/3 overflow-hidden md:p-12 p-8 rounded-3xl'  initial="hidden" animate="visible" variants={containerVariants}>
                <motion.div  initial="hidden" animate="visible" variants={containerVariants}  className='flex justify-between '>
                  <motion.div  className='text-start w-1/2'>
                    <p className=''><span className='text-gray-600 md:text-lg text-sm'>Effortless Daily Savings:</span> <span className='text-amber-800 md:text-lg text-sm font-medium'>Secure Your Future Today</span></p>
                  </motion.div>
                  <motion.div className='text-center w-1/2'>
                    <img src={"/payment.png"} width={200} height={200} alt="" className='mx-auto' />
                  </motion.div>
                  
                </motion.div>
                <motion.div initial="hidden" animate="visible" variants={containerVariants} >
                  <div className="flex items-center border border-gray-400 p-3 rounded-lg bg-white">
                    <LuIndianRupee/>
                    <input type="number"  placeholder='Enter Your Amount' value={getamount} className='w-full   outline-none text-sm' />
                    </div>
                    <div className='flex mt-2'>
                      <button className='w-1/5 mx-1 border border-gray-400 text-sm rounded-sm flex justify-center md:py-1 items-center' onClick={() => setgetamount(10)}><LuIndianRupee className="text-sm"/>10</button>
                      <button className='w-1/5 mx-1 border border-gray-400 text-sm rounded-sm flex justify-center md:py-1 items-center' onClick={() => setgetamount(20)}><LuIndianRupee className="text-sm"/>20</button>
                      <button className='w-1/5 mx-1 border border-gray-400 text-sm rounded-sm flex justify-center md:py-1 items-center' onClick={() => setgetamount(50)}><LuIndianRupee className="text-sm"/>50</button>
                      <button className='w-1/5 mx-1 border border-gray-400 text-sm rounded-sm flex justify-center md:py-1 items-center' onClick={() => setgetamount(100)}><LuIndianRupee className="text-sm"/>100</button>
                      <button className='w-1/5 mx-1 border border-gray-400 text-sm rounded-sm flex justify-center md:py-1 items-center' onClick={() => setgetamount(500)}><LuIndianRupee className="text-sm"/>500</button>
                    </div>
                    <div className='mt-10'>
                      <button className="w-full py-2 rounded-md bg-yellow-500">
                        Set Up Daily Savings
                      </button>
                    </div>
                  </motion.div>
              </motion.div> 
              {/* secound section */}
              <motion.div className="container  bg-yellow-100 rounded-3xl my-10 relative z-10 xl:w-4/5 md:px-5 px-3 w-full mx-auto md:py-10 py-5 text-center" initial="hidden" animate="visible" variants={containerVariants}>
                <motion.p variants={itemVariants} className="mb-2 md:text-3xl text-xl text-center text-amber-800 font-bold ">
                  Before you know, your savings will grow.
                </motion.p>
                <motion.div  initial="hidden" animate="visible" variants={containerVariants}  className='md:flex justify-between '>
                  <motion.div  className='text-center md:w-1/3  md:px-1 md:py-8 p-5'>
                    <p className='mb-3'>
                      <Image src={"/cash-payment.png"} width={50} height={50} alt="" className='mx-auto' />
                    </p>
                    <p className='text-amber-700 text-md'>Automatically saves your money in 24k gold, every day.</p>
                  </motion.div>
                  <motion.div className='text-center md:w-1/3  md:px-1 md:py-8 p-5'>
                    <p  className='mb-3'>
                      <Image src={"/rocket.png"} width={50} height={50} alt="" className='mx-auto' />
                    </p>
                    <p className='text-amber-700 text-md'>Small daily steps lead to big rewards! Save ₹100 every day and watch it grow into ₹36,000 in just one year</p></motion.div>
                  <motion.div className='text-center md:w-1/3  md:px-1 md:py-8 p-5'>
                    <p className='mb-3'>
                      <Image src={"/diagram.png"} width={50} height={50} alt="" className='mx-auto' />
                    </p>
                    <p className='text-amber-700 text-md'>Start small and grow your contributions at your own pace.</p></motion.div>
                </motion.div>
              </motion.div>
              {/* third section */}
              
            </motion.div>
          </section>
        </main>
        <Footer />
      </div>
    </>

  )
}

export default page
