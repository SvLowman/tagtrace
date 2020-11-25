import React from "react";
import { Button } from "../components/Button";

const Page = () => (
  <article>
    <section>
      <h2>Hello World! 😁</h2>
    </section>
    <div>
      <Button
        primary
        size="medium"
        label="Button"
        onClick={() => {
          alert("It works!");
          console.log("Beat it!");
        }}
      />
    </div>
  </article>
);

export default Page;
