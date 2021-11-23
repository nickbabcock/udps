export const Welcome: React.FC<{}> = () => {
  return (
    <>
      <h1>UDPS: Umich Incident Reports</h1>
      <p>
        The{" "}
        <a href="http://clerycenter.org/summary-jeanne-clery-act">Clery Act</a>{" "}
        dictates that all federally funded universities share information about
        crimes that occur on campus. The{" "}
        <a href="https://www.dpss.umich.edu/content/crime-safety-data/crime-alerts/">
          crime log
        </a>{" "}
        for the University of Michigan leaves some wanting, so this website is
        an alternative take on the data
      </p>
    </>
  );
};
