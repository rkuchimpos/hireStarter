import React from "react";
import renderer from "react-test-renderer";
import ProfileCard from "../ProfileCard";

it("ProfileCard renders correctly", () => {
  const tree = renderer
    .create(
      <ProfileCard
        name={"Joe Bruin"}
        location={"Los Angeles"}
        description={"I am a software engineer"}
        skills={["Java", "C++"]}
        photos={[
          "https://i.imgur.com/cMFc42W.png",
          "https://i.imgur.com/6B55OIA.png"
        ]}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
