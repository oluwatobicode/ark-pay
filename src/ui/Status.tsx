interface StatusProps {
  children: React.ReactNode;
  types: string;
}

const Status = ({ children, types }: StatusProps) => {
  const styles: { [key: string]: string } = {
    Completed:
      "bg-[#EAECFF] w-[120px] p-[10px] rounded-[19.58px] flex flex-row items-center justify-center gap-[5px] text-[14.05px]",
    Pending:
      "bg-[#EB4E4E] w-[120px] p-[10px] rounded-[19.58px] text-white flex flex-row items-center justify-center gap-[5px] text-[14.05px]",
  };

  return (
    <div className={styles[types]}>
      <div
        className={
          types === "Pending"
            ? "w-[15px] h-[15px] rounded-full bg-[#990f02]"
            : "w-[15px] h-[15px] rounded-full bg-[#4D14DF]"
        }
      ></div>
      <p className="font-medium">{children}</p>
    </div>
  );
};

export default Status;
