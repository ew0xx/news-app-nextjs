import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { getCategories } from "../services";
import { grpahCMSImageLoader } from "../util";

const Header = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((newCategories) => {
      setCategories(newCategories);
    });
  }, []);

  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="border-b w-full inline-block border-blue-400 py-8">
        <div className="md:float-left block">
          <Link href="/">
            <span className="cursor-pointer font-bold text-4xl text-white">
              <Image unoptimized loader={grpahCMSImageLoader}src={process.env.NEXT_PUBLIC_ENDPOINT+"/uploads/parasal_be1943870c.png?updated_at=2022-12-21T11:19:11.956Z"} height={24}
              width={64}className="object-fit h-24 w-64" />
            </span>
          </Link>
        </div>
        <div className="hidden md:float-left md:contents">
          {categories.map((category, index) => (
            <Link key={index} href={`/category/${category.attributes.slug}`}>
              <span className="md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer">
                {category.attributes.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;
