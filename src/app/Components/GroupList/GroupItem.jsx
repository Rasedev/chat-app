//import Button from "../Button/Button";



const GroupItem = ({ img, title, desc, tit }) => {
  return (
    <>

      {/* <div className="flex justify-between pl-[20px] pb-[17px] pt-[8px] mt-[35px] sticky">
            <h1 className="text-[20px] font-popi font-semibold text-[#000]">{title}</h1>
            <div className='text-[25px] mr-[10px] text-primary'>{icon}</div>
         </div> */}
        <div className="mx-[20px]">
           <div className="flex justify-between items-center pb-[28px] mb-[17px] border-b border-gray-400">           
              <img src={img} loading="lazy" alt={img}  className="w-[80px] h-[80px] "/>            
               <div className="">
               <h3 className="text-[18px] font-popi font-semibold text-[#000]">{title}</h3>
               <p className="text-[14px] font-popi font-medium text-[#4D4D4D]">{desc}</p>
              </div>
              <button className="text-[20px] font-popi font-semibold py-1 px-[25px] bg-primary
          text-[#fff] rounded-lg" type="button">{tit}</button>
               {/* <Button 
                tit="Join"
                  />           */}
          </div>      
        </div>
      
    </>
  );
};

export default GroupItem;
