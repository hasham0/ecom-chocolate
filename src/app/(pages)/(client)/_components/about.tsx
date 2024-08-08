import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

type Props = {};

const About = ({}: Props) => {
  return (
    <>
      <section className="mx-auto max-w-6xl px-5 py-14 md:py-20">
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-center rounded-t-[3rem] bg-gradient-to-b from-gray-200 to-transparent px-10 py-14">
          <div className="flex items-center justify-center gap-5">
            <Separator className="bg-brown-900 h-0.5 w-20" />
            <h2 className="text-brown-900 text-3xl font-bold tracking-tight">
              Special Products
            </h2>
            <Separator className="bg-brown-900 h-0.5 w-20" />
          </div>
          <p className="mt-10 w-10/12 text-center">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa,
            veritatis vero dolorem accusantium ea voluptatum libero accusamus
            doloremque debitis, voluptatibus ad incidunt dolore, iste sunt.
            Cumque repellat est dignissimos. Voluptatem eaque veniam deserunt
            quo. Molestiae at maxime nobis rerum eligendi.
          </p>
          <Button className="bg-brown-900 hover:bg-brown-800 active:bg-brown-700 mt-10 px-8">
            Shop Now
          </Button>
        </div>
      </section>
    </>
  );
};

export default About;
