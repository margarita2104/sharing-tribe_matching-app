import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="mt-auto bg-violet px-7 pb-12 pt-2 text-tree-poppy">
      <Link className="mb-3 flex justify-center sm:justify-start" href="/">
        <Image
          src={"/logo.svg"}
          alt="Sharing Tribe logo"
          width="180"
          height="64"
        />
      </Link>
      <div className="flex justify-center text-center">
        <address className="not-italic">
          <p className="mb-3">Sharing Tribe GmbH</p>
          <p className="mb-3">
            Reppischtalstrasse 5B, 8903, Birmensdorf ZH, Switzerland
          </p>
          <div className="flex flex-col sm:flex-row">
            <p className="mb-3">
              Phone:&nbsp;<a href="tel:+41793842261">+41 793 842 261</a>
              &nbsp;|&nbsp;
            </p>
            <p className="mb-3">
              Email:&nbsp;
              <a href="mailto:contact@sharingtribe.tech">
                contact@sharingtribe.tech
              </a>
            </p>
          </div>
          <p>Copyright &copy;&nbsp;2024 Sharing Tribe</p>
        </address>
      </div>
    </footer>
  );
};

export default Footer;
