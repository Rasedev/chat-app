const Button = ({ tit, ...btnInfo }) => {
    return (
      <>
        <button
          type="button"
          className="font-nuni font-semibold text-white text-[20px] py-[20px] inline-block"
          {...btnInfo}
        >
          {tit}
        </button>
      </>
    );
  };
  
  export default Button;