import { Project } from "./Project"


type PageProps = {
  params: Promise<{ id: string }>
}

const Page = async ({ params }: PageProps) => {
  const { id } = await params;

  return <Project id={Number(id)} />
};


export default Page;
