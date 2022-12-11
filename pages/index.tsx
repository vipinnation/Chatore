import Link from "next/link";
import Image from "next/image";
import HomeImage from "../assets/images/home.svg";

export default function Home() {
  return (
    <>
      <div className="header w-full h-screen flex flex-col justify-center">
        <div className="flex flex-col justify-center h-full ">
          <div className="self-center items-center flex flex-col sm:flex-row w-full md:w-5/6 xl:w-2/3 px-4 sm:px-0">
            <div className="w-full text-center sm:text-left sm:w-1/2 sm:px-8">
              <h1 className="tracking-wide text-pink-600 text-2xl mb-6">
                Start messaging or
                <span className="text-gray-800 font-bold tracking tracking-widest">
                  {" "}
                </span>
              </h1>
              <h2 className="font-bold tracking-widest text-4xl">dm your...</h2>
              <span className="content__container block font-light text-browngray text-2xl my-6">
                <ul className="content__container__list">
                  <li className="content__container__list__item xl:pl-3">
                    friend
                  </li>
                  <li className="content__container__list__item xl:pl-3">
                    bestie
                  </li>
                  <li className="content__container__list__item xl:pl-3">
                    realtives
                  </li>
                </ul>
              </span>
              <p className="font-bold tracking-widest text-4xl">
                ...poke them!
              </p>

              <div className="flex flex-row w-full sm:justify-start py-4 justify-center">
                <Link href="/login">
                  <span className="px-10 py-2 text-gray-200 btn-primary rounded-full shadow-md text-lg  hover:border-red">
                    Get Started
                  </span>
                </Link>
              </div>
            </div>
            <div className="w-full sm:w-1/2">
              <Image
                src={HomeImage}
                alt="Picture of the author"
                width={500}
                height={500}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
