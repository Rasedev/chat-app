const Button = ({ tit, ...btnInfo }) => {
    return (
      <>
        <button
          type="button"
          className="text-[20px] font-popi font-semibold py-1 px-[25px] bg-primary
          text-[#fff] rounded-lg ..."
          {...btnInfo}
        >
          {tit}
        </button>
      </>
    );
  };
  
  export default Button;
  