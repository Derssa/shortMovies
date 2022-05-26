function HeaderItem({ title, Icon, selected }) {
  return (
    <div
      className={`flex flex-col items-center ${selected && "text-red-800"}
      cursor-pointer group w-14 sm:w-20 hover:text-red-800`}
    >
      <Icon className="h-8 mb-1 group-hover:animate-bounce" />
      <p
        className="opacity-100 text-xs sm:text-base font-bold 
        tracking-widest"
      >
        {title}
      </p>
    </div>
  );
}

export default HeaderItem;
