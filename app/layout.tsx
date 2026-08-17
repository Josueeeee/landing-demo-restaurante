import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata():Promise<Metadata>{
  const requestHeaders=await headers();
  const host=requestHeaders.get("host")||"localhost:3000";
  const protocol=host.includes("localhost")?"http":"https";
  const image=`${protocol}://${host}/og.png`;
  const title="Brasa Nómada | Cocina latina al fuego";
  const description="Producto local, fuego encendido y platos hechos para pasar de mano en mano en Tegucigalpa.";
  return {title,description,icons:{icon:"/favicon.svg"},openGraph:{title,description,images:[{url:image,width:1200,height:630}],locale:"es_HN",type:"website"},twitter:{card:"summary_large_image",title,description,images:[image]}};
}

export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="es"><body>{children}</body></html>}
