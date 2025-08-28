import axios from "axios";

export async function generateMetadata(
  { params, searchParams }: any, // Use 'any' to temporarily bypass type issues
  parent: any
) {
  const {id} = await params;
  try{
    const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/projects/${id}`)
    
    return {
      title :   `Edit - ${data.name} | Unitech Holdings Ltd.`
    }
  }
  catch(e){
    console.error(e)
  }
  
  console.log(id)
  return {
      title: "uni tech holding",
  };
}

  export default function Layout({ children }) {
    return <>{children}</>;  
}