import { json, useLoaderData } from "@remix-run/react";
import { buildUrl } from "~/api/config";

export const meta = () => {
  return [{ title: "Goran Group" }];
};


/**
 * @type {import("react-router").LoaderFunction}
 */
export const loader = async ({ request }) => {
  const url = buildUrl(request, "/data/specialization.json")

  const specializationsResponse = await fetch(url)
  const { specializations } = await specializationsResponse.json()

  return json(specializations)
}

const Index = () => {
  const loaderData = useLoaderData() 

  console.log(loaderData)
  return (
    <article className="home">
      <section className="home__hero-section">
        <div className="home__hero-background">
          <div className="home__hero-background-mask" />
          <img src="" alt="" />
        </div>
      </section>
    </article>
  );
}

export default Index 