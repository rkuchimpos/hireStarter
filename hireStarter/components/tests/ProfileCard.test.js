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
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
