import Container from "@/components/container";
import PortfolioCard from "@/components/portfolio";
import goldenSite from "../../public/media/works/golden-site.png";
import partisipasiku from "../../public/media/works/partisipasiku.png";
import geol from "../../public/media/works/geol.png";
import emonev from "../../public/media/works/e-monev.png";

export default function Home() {
  return (
    <>
      <Container className="px-8 py-0">
        <Masthead />
        <HeroVideo />
        <Intro />
      </Container>
      <div className="bg-black">
        <PortfolioItems />
        <CTA />
      </div>
    </>
  );
}

const Masthead = () => {
  return (
    <section className="h-[70vh] flex flex-col justify-end">
      <h1 className="mt-28 mb-10 font-[500] font-body leading-tight tracking-normal text-5xl md:text-7xl lg:text-8xl text-transparent bg-clip-text bg-gradient-to-br from-[#FCAA43] from-5% via-[#943C30] via-20% to-[#5941A9] to-75%">
        Empowering Innovation and Efficiency through Code.
      </h1>
    </section>
  );
};

const HeroVideo = () => {
  return (
    <section className="relative flex flex-col items-start justify-start object-cover w-full px-10 border h-[40vh] overflow-clip rounded-xl">
      <video className="absolute top-0 left-0" autoPlay muted loop playsInline>
        <source
          src={
            "https://res.cloudinary.com/dhtk5fgay/video/upload/v1687966667/pexels-rostislav-uzunov-9150545_720p_mfbhhc.mp4"
          }
          type="video/mp4"
        />
      </video>
    </section>
  );
};

const Intro = () => {
  return (
    <div className="flex flex-col justify-center items-center h-[100vh]">
      <p className="block mx-auto my-20 text-3xl md:text-4xl lg:text-5xl font-[400] text-black font-body w-full md:w-[600px] lg:w-[778px]">
        I’m a versatile and experienced full-stack developer, having worked for
        both government and private companies over the course of my eight-year
        career.
      </p>
    </div>
  );
};

const PortfolioItems = () => {
  return (
    <section className="bg-[#FFE66D] px-10 py-24 rounded-b-xl min-h-[100vh]">
      <Container className="flex flex-row">
        <div className="flex flex-col">
          <h3 className="text-6xl font-extrabold font-body">Featured Works.</h3>
          <h4 className="font-body font-[300] text-xl">
            Selected projects and experiments
          </h4>
        </div>
      </Container>
      <Container className="grid grid-flow-row grid-cols-1 gap-4 my-8 md:grid-cols-2">
        <PortfolioCard
          coverUrl={goldenSite}
          year={2015}
          url={"#"}
          name="Golden Site Monitoring"
          description={
            "A web application that collect, display, and visualize alarm data from 'golden' of BTS. Used by Telco Company in Denmark."
          }
          type="Telecommunication"
        />
        <PortfolioCard
          coverUrl={geol}
          year={2015}
          url={"#"}
          name="Geographic Online Alarm (GeOL)"
          description={
            "A web application that collect, display, and visualize alarm data from all BTS from a big Telco Company in Indonesia. "
          }
          type="Telecommunication"
        />
        <PortfolioCard
          coverUrl={partisipasiku}
          year={2018}
          url={"https://partisipasiku.bphn.go.id"}
          name="Partisipasiku!"
          description={
            "A Platform to promote the substance of legislative drafting in Indonesia."
          }
          type="e-Government"
        />
        <PortfolioCard
          coverUrl={emonev}
          year={2020}
          url={"#"}
          type={"e-Government"}
          name="e-Monev Legislasi"
          description={
            "a comprehensive information system for reporting and evaluating the legislative drafting process in Indonesia. The system is integrated with Partisipasiku"
          }
        />
      </Container>
    </section>
  );
};

const CTA = () => {
  return (
    <Container className="px-10 py-10 bg-black">
      <p className="flex font-body flex-col text-4xl lg:text-9xl text-white font-[500] leading-tight">
        <span className="tracking-tight">✺LET’S COLLABORATE</span>
        <span className="my-2 text-2xl font-[600] uppercase font-heading text-[#FFE66D]">
          mail@fransfp.dev
        </span>
      </p>
    </Container>
  );
};
