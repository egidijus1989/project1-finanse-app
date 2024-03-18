import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import { BsFacebook, BsGithub, BsLinkedin } from "react-icons/bs";

export default function FooterReal() {
  return (
    <Footer className="border-t-2  py-4 bg-white text-slate-900 dark:text-white dark:bg-slate-950">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
          <div className="mt-5">
            <Link
              to="/"
              className="self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white"
            >
              <span className="px-2 py-1 bg-gradient-to-r from-amber-500 via-purple-500 to-lime-500 rounded-lg">
                Expense & Income
              </span>
              Tracker
            </Link>
          </div>
          <div className="grid grid-cols-1 mt-4 justify-end">
            <div className="">
              <Footer.Title title="About" />
              <Footer.LinkGroup>
                <Footer.Link href="#" target="_blank" rel="noopener noreferrer">
                  2 project
                </Footer.Link>
                <Footer.Link href="#" target="_blank" rel="noopener noreferrer">
                  3 project
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm: justify-between ">
          <Footer.Copyright
            href="#"
            by=" Egidijus Navickas"
            year={new Date().getFullYear()}
          />
          <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center ">
            <Footer.Icon href="#" icon={BsFacebook} />
            <Footer.Icon href="#" icon={BsLinkedin} />
            <Footer.Icon href="#" icon={BsGithub} />
          </div>
        </div>
      </div>
    </Footer>
  );
}
