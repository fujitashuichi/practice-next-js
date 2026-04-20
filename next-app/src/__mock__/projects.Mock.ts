import { Project } from "@/schemas/project";
import { userMock } from "./userMock";

const user = userMock;

export const projectsMock: Project[] = [
  {
    id: 1,
    userId: user.id,
    title: "DummyTitle",
    description: "DummyDescription",
    status: "done",
    createdAt: new Date("2011-11-11"),
    updatedAt: new Date("2022-02-22")
  },
];
