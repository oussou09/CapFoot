function Footer(props) {
  return (
    <footer className="flex items-center justify-between px-5 h-20 bg-white flex-shrink-0 mt-auto">
      <span className="text-gray-700 text-opacity-50">
        Copyright CapFoot © Website {new Date().getFullYear()}
      </span>
      <a
        href="!#"
        onClick={props.onScrollTop}
        className="text-black-500 font-medium"
      >
        Back to top
      </a>
    </footer>
  );
}

export default Footer;
