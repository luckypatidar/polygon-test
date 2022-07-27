import React, { useContext,useEffect } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";

import { TransactionContext } from "../context/TransactionContext";
import { shortenAddress } from "../utils/shortenAddress";
import { Loader } from ".";

const companyCommonStyles = "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";

const Input = ({ placeholder, name, type, value, handleChange }) => (
  <input
    placeholder={placeholder}
    type={type}
    step="0.0001"
    value={value}
    onChange={(e) => handleChange(e, name)}
    className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
  />
);

const Welcome = () => {
  const { currentAccount, connectWallet, handleChange, sendTransaction, formData, isLoading,userDetails,setformData } = useContext(TransactionContext);

  useEffect(() => {
    console.log(!!userDetails);
   if(!!userDetails?.name){
    setformData({...formData,name: userDetails?.name, dateOfBirth: userDetails?.dateOfBirth});
   }
  }, [userDetails?.name])
  

  const handleSubmit = (e) => {
    const { name, dateOfBirth, movieName, movieId, director, period } = formData;
    // if(userDetails?.name){
    //   setformData({...formData,name: userDetails?.name,dateOfBirth: userDetails?.dateOfBirth});
    // }
    e.preventDefault();

    if (!name || !dateOfBirth || !movieName || !movieId || !director || !period) return;

    sendTransaction();
  };

  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
        <div className="flex flex-1 justify-start items-start flex-col mf:mr-10">
          {/* <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
            Send Crypto <br /> across the world
          </h1>
          <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
            Explore the crypto world. Buy and sell cryptocurrencies easily on Krypto.
          </p> */}
          
          {!currentAccount && (
            <button
              type="button"
              onClick={connectWallet}
              className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
            >
              <AiFillPlayCircle className="text-white mr-2" />
              <p className="text-white text-base font-semibold">
                Connect Wallet
              </p>
            </button>
          )}

          {
            currentAccount && (
              <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
              {currentAccount}
            </p>
            )
          }

        </div>

        <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
          <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
            <Input placeholder="Your name" name="name" type="text" handleChange={handleChange} value = {formData?.name} />
            <Input placeholder="Date of Birth" name="dateOfBirth" type="text" handleChange={handleChange} value={formData?.dateOfBirth} />
            <Input placeholder="Movie Name" name="movieName" type="text" handleChange={handleChange} />
            <Input placeholder="Movie Id" name="movieId" type="text" handleChange={handleChange} />
            <Input placeholder="Director" name="director" type="text" handleChange={handleChange} />
            <Input placeholder="Period of movie" name="period" type="text" handleChange={handleChange} />


            <div className="h-[1px] w-full bg-gray-400 my-2" />

            {isLoading
              ? <Loader />
              : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
                >
                  Send now
                </button>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
