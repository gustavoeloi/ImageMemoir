import { Link } from "react-router-dom";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const technologies = [
  {
    id: 1,
    name: "React",
    description:
      "React is the library for web and native user interfaces. Build user interfaces out of individual pieces called components written in JavaScript.",
    img: "https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png",
  },
  {
    id: 2,
    name: "TypeScript",
    description:
      "TypeScript extends JavaScript by adding types to the language",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/2048px-Typescript_logo_2020.svg.png",
  },
  {
    id: 3,
    name: "Tailwind",
    description:
      "Tailwind CSS is a utility-first CSS framework for rapidly building modern websites without ever leaving your HTML.",
    img: "https://w7.pngwing.com/pngs/293/485/png-transparent-tailwind-css-hd-logo-thumbnail.png",
  },
  {
    id: 4,
    name: "Shadcn/ui",
    description:
      "Beautifully designed components that you can copy and paste into your apps. Accessible. Customizable. Open Source.",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQ7SbKo4OhMZqri6NtK7BXdPD1mCgOvQdweRQNgFw3kA&s",
  },
  {
    id: 5,
    name: "React Router Dom",
    description:
      "The react-router-dom package contains bindings for using React Router in web applications. ",
    img: "https://www.driven.com.br/wp-content/uploads/2023/02/react-router-dom-01.png",
  },
  {
    id: 6,
    name: "Firestore",
    description:
      "Cloud Firestore is a NoSQL document database that lets you easily store, sync, and query data for your mobile and web apps.",
    img: "https://miro.medium.com/v2/resize:fit:860/1*v9-gNMRpgrYvR6QXESYAxg.png",
  },
  {
    id: 7,
    name: "Firebase Authentication",
    description:
      "Firebase Authentication aims to make building secure authentication systems easy, while improving the sign-in and onboarding experience for end users.",
    img: "https://cdn.icon-icons.com/icons2/2699/PNG/512/firebase_logo_icon_171157.png",
  },
];

const About = () => {
  return (
    <>
      <div className="bg-perfil-github min-h-[400px] bg-cover bg-center bg-no-repeat flex items-center justify-center flex-col">
        <h1 className="text-white text-6xl font-medium">ImageMemoir</h1>
        <p className="text-white mt-2">
          Developed by{" "}
          <Link
            to="https://www.linkedin.com/in/gustavooeloi/"
            className="underline hover:text-blue-300"
            target="_blank"
          >
            Gustavo Eloi
          </Link>
        </p>
      </div>
      <div className="container mx-auto my-16">
        <Tabs defaultValue="project">
          <TabsList className="grid w-full grid-cols-2 mb-16">
            <TabsTrigger value="project" className="">
              Project
            </TabsTrigger>
            <TabsTrigger value="developer">Developer</TabsTrigger>
          </TabsList>
          <TabsContent
            value="project"
            className="grid grid-cols-1 md:grid-cols-2 w-full gap-8"
          >
            <div className="flex flex-col gap-8">
              <h2 className="text-2xl font-medium text-center md:text-left">
                About the project
              </h2>
              <p className="mb-2 text-gray-900 text-justify md:text-left text-lg leading-8">
                This project was inspired by one of the React course sessions on
                the Udemy platform. I put into practice fundamentals learned so
                far such as: useState, useEffect, React Router Dom, etc.{" "}
                <span className="font-semibold flex items-center gap-2 text-slate-600 justify-center md:justify-start">
                  Check out the technologies used
                </span>
              </p>
            </div>
            <ul className="max-w-md space-y-1 list-dic list-inside">
              {technologies.map((tec) => (
                <li key={tec.id}>
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <Button
                        variant="link"
                        className="text-gray-500 w-full md:w-auto"
                      >
                        {tec.name}
                      </Button>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                      <div className="flex justify-between space-x-4">
                        <Avatar>
                          <AvatarImage src={tec.img} />
                          <AvatarFallback>{tec.name}</AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                          <h4 className="text-sm font-semibold">{tec.name}</h4>
                          <p className="text-sm text-gray-500 ">
                            {tec.description}
                          </p>
                        </div>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                </li>
              ))}
            </ul>
          </TabsContent>
          <TabsContent
            value="developer"
            className="flex flex-col gap-8 md:flex-row"
          >
            <div className="md:w-1/2">
              <h1 className="font-semibold text-2xl">About me</h1>
              <p className="text-lg mt-6 text-justify md:text-left">
                I'm currently studying Systems Analysis and Development and full
                stack web development. I am interning at the Ministry of the
                Environment in Brazil, helping with the development and
                maintenance of GEPROD.
              </p>
            </div>

            <div className="md:w-1/2 mb-4">
              <h3 className="text-center font-medium mb-4">
                My current stack that I'm studying
              </h3>
              <ul className="grid grid-cols-4 gap-4">
                <li>
                  <img
                    alt="React"
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg"
                    className="w-20"
                  />
                </li>
                <li>
                  <img
                    alt="Angular"
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angular/angular-original.svg"
                    className="w-20"
                  />
                </li>
                <li>
                  <img
                    alt="Spring Boot"
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg"
                    className="w-20"
                  />
                </li>
                <li>
                  <img
                    alt="NodeJS"
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg"
                    className="w-20"
                  />
                </li>
                <li>
                  <img
                    alt="Tailwindcss"
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg"
                    className="w-20"
                  />
                </li>
                <li>
                  <img
                    alt="Git"
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg"
                    className="w-20"
                  />
                </li>
                <li>
                  <img
                    alt="Firebase"
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg"
                    className="w-20"
                  />
                </li>
                <li>
                  <img
                    alt="PostgreSQL"
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg"
                    className="w-20"
                  />
                </li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default About;
