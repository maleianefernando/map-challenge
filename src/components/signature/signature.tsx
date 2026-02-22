export const Signature = () => {
  return (
    <div className="border border-sky-200 mt-10 p-4 rounded-md">
      <p className="text-sm text-slate-500">
        Desenvolvido por: <span className="font-bold">Fernando Maleiane</span>
      </p>
      <div className="flex flex-col md:flex-row justify-between text-sky-500 px-4" >
        <a href="https://github.com/maleianefernando/" target="_blank">Github</a>
        <a href="https://www.linkedin.com/in/fernando-maleiane-bb2078296/" target="_blank">
          Linkedin
        </a>
        <a href="mailto:maleianefernando3@gmail.com" target="_blank">
          maleianefernando3@gmail.com
        </a>
        <div className="flex flex-col">
          <p>+258 845 220 593</p>
          <p>+258 833 825 474</p>
        </div>
      </div>
    </div>
  );
};
