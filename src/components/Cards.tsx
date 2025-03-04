import { useRouter } from "next/navigation";

interface CardsProps {
  id: string;
  title: string;
  details: string;
}

const Cards = ({ id, title, details }: CardsProps) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/details/${id}`)}
      className="flex flex-col p-2 h-20 w-auto items-center
       border-2 border-red-500 gap-2 rounded-lg cursor-pointer bg-slate-200 hover:bg-red-400"
    >
      <div className="text-lg font-bold"> {title}</div>
      <div className="flex flex-col">{details}</div>
    </div>
  );
};

export default Cards;
