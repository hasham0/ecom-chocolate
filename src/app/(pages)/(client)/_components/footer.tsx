import React from "react";

type Props = {};

function Footer({}: Props) {
  return (
    <>
      <footer className="bg-brown-900 flex items-center justify-center py-3 text-white">
        <span className="font-medium">© 2023 Choco. All rights reserved.</span>
      </footer>
    </>
  );
}

export default Footer;
