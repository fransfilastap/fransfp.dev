import Container from "@/components/container";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "About Frans Filasta Pratama",
};

export default function Home() {
  return (
    <Container className="p-10 my-20">
      <h3 className="my-10 font-[600] text-xl uppercase font-heading">About</h3>
      <h1 className="text-4xl text-transparent bg-clip-text bg-gradient-to-br from-[#FCAA43] from-5% via-[#943C30] via-20% to-[#5941A9] to-75% lg:text-6xl mb-10 tracking-normal font-body font-[500] text-black">
        Passionate for innovation and commited to excellence.
      </h1>
      <article className="prose prose-lg font-body">
        <p>
          Hello there! Welcome to my personal website. My name is Frans Filasta
          Pratama, and I am an experienced professional with a diverse
          background in both the public and private sectors. With eight years of
          experience under my belt, I have spent five years working as a
          government employee and three years in the private sector.
        </p>
        <p>
          As a skilled SOA and microservice engineer, I have extensive
          experience developing complex systems that require a high level of
          expertise. My background in Information Systems, which I studied at
          Sriwijaya University, has equipped me with a deep understanding of
          software engineering principles.
        </p>

        <p>
          Aside from my professional pursuits, I have a passion for photography,
          which has been a hobby of mine for many years. Lately, I have been
          drawn to the world of UI/UX design and am excited to explore this
          field further.
        </p>

        <p>
          Thank you for visiting my website, and please feel free to reach out
          to me if you have any questions or would like to connect.
        </p>
        <h3>Disclaimer</h3>
        <p>
          All post is personal. My opinion doesn't represent my organization.{" "}
        </p>
      </article>
    </Container>
  );
}
