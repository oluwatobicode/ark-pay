type ButtonProps = {
  children: React.ReactNode;
  type: string;
};

const Button = ({ children, type }: ButtonProps) => {
  const styles: { [key: string]: string } = {
    ButtonOne:
      "lg:w-[150px] lg:h-[50px] w-[100px] h-[50px] text-[15px] font-semibold rounded-xl lg:text-[1rem] bg-[#020267] text-[#ffff]",
    ButtonTwo:
      "lg:w-[150px] lg:h-[50px] w-[130px] h-[50px] text-[15px] font-semibold  rounded-xl lg:text-[1rem] text-textColor border-2 border-textColor",
    ButtonThree:
      "md:w-[35px] md:h-[35px] w-[50px] h-[50px] rounded-full bg-transparent border border-[2px] border-textColorSec flex items-center justify-center border-opacity-[10%]",
    navButtonOne:
      "lg:w-[120px] lg:h-[39px] w-[150px] h-[50px] rounded-[5px] lg:text-[1rem] bg-textColor text-textColorSec",
    navButtonTwo:
      "lg:w-[120px] lg:h-[39px] w-[150px] h-[50px] rounded-[5px] lg:text-[0.9rem] text-textColor border-2 border-textColor",
  };

  return <button className={styles[type]}>{children}</button>;
};

export default Button;
