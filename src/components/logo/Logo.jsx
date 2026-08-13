import { Link } from "react-router-dom";
import logoImg from "../../assets/logo/logo.png";


const Logo = () => {
  return (
    <Link to="/" aria-label="ALFA Appliances home" className="shrink-0">
      <img
        src={logoImg}
        alt="ALFA Appliances"
        width={143}
        height={66}
        className="h-[66px] w-[143px] object-contain"
      />
    </Link>
  );
};

export default Logo;