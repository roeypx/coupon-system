import { useEffect, useState } from "react";
import "./Footer.css";

function Footer(): JSX.Element {
  const [year, setYear] = useState<number>();
  useEffect(() => {
    const d = new Date();
    setYear(d.getFullYear())
  }, [])
  return (
    <div className="Footer">
      <p>All rights Reserved &copy; {year}</p>
    </div>
  );
}

export default Footer;
