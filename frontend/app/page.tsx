'use client';
import { useRef, useEffect, useState } from 'react';
import images from '@/utils/images.utils';
import Image from 'next/image';
import Link from 'next/link';
import home_1 from '@/assets/images/home_1.png';
import home_2 from '@/assets/images/home_2.png';
import home_3 from '@/assets/images/home_3.png';
import home_4 from '@/assets/images/home_4.png';
import home_5 from '@/assets/images/home_5.png';
import { motion } from 'framer-motion';
import ImageTransition from '@/components/animation/image.animation';

export default function Home() {
  const imgRef = useRef<any>(null);
  const intervalRef = useRef<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  var imageSources = [home_2, home_3, home_4, home_1, home_5];

  useEffect(() => {
    changeImages();

    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  const changeImages = () => {
    try {
      var index = 0;
      intervalRef.current = setInterval(function () {
        if (index === imageSources.length) {
          index = 0;
        }
        setCurrentIndex((prevIndex) => (prevIndex + 1) % imageSources.length);
        index++;
      }, 2000);
    } catch (error) {}
  };
  return (
    <div className="header w-full h-screen flex flex-col justify-center">
      <div className="flex flex-col justify-center h-full pt-32 sm:mt-0 ">
        <div className="self-center items-center flex flex-col sm:flex-row w-full md:w-5/6 xl:w-2/3 px-4 sm:px-0">
          <div className="w-full text-center sm:text-left sm:w-1/2 sm:px-8">
            <h1 className="tracking-wide text-pink-600 text-2xl mb-6">
              Start messaging or
              <span className="text-gray-800 font-bold tracking tracking-widest"></span>
            </h1>
            <h2 className="font-bold tracking-widest text-4xl">dm your...</h2>
            <span className="content__container block font-light text-browngray text-2xl my-6">
              <ul className="content__container__list">
                <li className="content__container__list__item xl:pl-3">friend</li>
                <li className="content__container__list__item xl:pl-3">bestie</li>
                <li className="content__container__list__item xl:pl-3">realtives</li>
              </ul>
            </span>
            <p className="font-bold tracking-widest text-4xl">...poke them!</p>

            <div className="flex flex-row w-full sm:justify-start py-8 md:py-4 justify-center">
              <Link href="/login">
                <span className="px-10 py-2 text-gray-200 bg-primary hover:bg-secondary rounded-full shadow-md text-lg  hover:border-red">
                  Get Started
                </span>
              </Link>
            </div>
          </div>
          <div className="w-full sm:w-1/2">
            <ImageTransition src={imageSources[currentIndex].src as any} alt="Picture of the author" />
          </div>
        </div>
      </div>
    </div>
  );
}
